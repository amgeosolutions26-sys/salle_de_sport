-- ELITE FITNESS : schéma complet Supabase (à coller dans SQL Editor puis Run). Peut être relancé sans danger.
create table if not exists clients(
  id text primary key, nom text not null, prenom text not null, adresse text default '', tel text default '', email text default '',
  date date not null default current_date,
  state text not null default 'actif' check (state in ('actif','suspendu','désactivé')),
  photo text default '', qr text not null unique, lk text unique);
create table if not exists subscriptions(
  id text primary key, cid text not null references clients(id) on delete cascade,
  plan text not null check (plan in ('m','t','a')), start date not null, "end" date not null);
create table if not exists payments(
  id text primary key, cid text not null references clients(id) on delete cascade,
  date date not null default current_date, "time" text,
  kind text not null check (kind in ('new','renewal','session')), plan text,
  due integer not null default 0, paid integer not null default 0, ref text,
  mode text check (mode in ('Espèces','Wave','Orange Money')));
create table if not exists visits(
  id text primary key, cid text not null references clients(id) on delete cascade,
  date date not null, t text, ts bigint);
create table if not exists courses(
  id text primary key, n text not null, j text[] not null default '{}', d text, f text, co text,
  cap integer default 20, "on" boolean default true);
create table if not exists products(
  id text primary key, name text not null, cat text, price integer not null default 0,
  "desc" text, tag text, "on" boolean default true, image text);
create table if not exists renewal_requests(
  id text primary key, cid text not null references clients(id) on delete cascade,
  plan text check (plan in ('m','t','a')), date date default current_date, s text default 'en attente');
alter table payments add column if not exists txref text;
create table if not exists orders(
  id text primary key, created timestamptz not null default now(), name text not null, phone text not null, address text, note text,
  items jsonb not null default '[]', total integer not null default 0,
  status text not null default 'nouvelle' check (status in ('nouvelle','contactée','confirmée','livrée','annulée')));
create table if not exists join_requests(
  id text primary key, created timestamptz not null default now(), kind text not null default 'inscription' check (kind in ('inscription','contact')),
  name text not null, phone text not null, plan text, address text, message text,
  status text not null default 'nouvelle' check (status in ('nouvelle','contactée','traitée')));
create table if not exists settings(id text primary key, v text);
create table if not exists payment_claims(
  id text primary key, cid text not null references clients(id) on delete cascade, plan text check (plan in ('m','t','a')),
  mode text check (mode in ('Wave','Orange Money')), amount integer, txref text, date date default current_date, s text default 'en attente');
create index if not exists i_sub_cid on subscriptions(cid);
create index if not exists i_pay_cid on payments(cid);
create index if not exists i_vis_cid on visits(cid, date);

-- Contrôle QR public : ne renvoie que le nom, la photo et le résultat d'accès.
create or replace function public.verify_member_qr(p_qr text) returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  c clients%rowtype;
  s subscriptions%rowtype;
  days_left integer;
  visit_time text;
  already_recorded boolean;
begin
  if coalesce(length(p_qr), 0) not between 1 and 64 then
    return jsonb_build_object('result', 'denied', 'reason', 'unknown');
  end if;

  select * into c from clients where qr = p_qr limit 1;
  if not found then
    return jsonb_build_object('result', 'denied', 'reason', 'unknown');
  end if;

  if c.state <> 'actif' then
    return jsonb_build_object('result', 'denied', 'reason', 'inactive', 'name', c.prenom || ' ' || c.nom, 'photo', coalesce(c.photo, ''));
  end if;

  select * into s from subscriptions where cid = c.id order by "end" desc limit 1;
  if not found then
    return jsonb_build_object('result', 'denied', 'reason', 'no_subscription', 'name', c.prenom || ' ' || c.nom, 'photo', coalesce(c.photo, ''));
  end if;

  days_left := s."end" - current_date;
  if days_left < 0 then
    return jsonb_build_object('result', 'denied', 'reason', 'expired', 'name', c.prenom || ' ' || c.nom, 'photo', coalesce(c.photo, ''));
  end if;

  visit_time := to_char(localtime, 'HH24:MI');
  select exists (
    select 1 from visits
    where cid = c.id
      and ts >= (extract(epoch from clock_timestamp() - interval '2 hours') * 1000)::bigint
  ) into already_recorded;

  if not already_recorded then
    insert into visits(id, cid, date, t, ts)
    values (
      'V' || md5(random()::text || clock_timestamp()::text),
      c.id,
      current_date,
      visit_time,
      (extract(epoch from clock_timestamp()) * 1000)::bigint
    );
  end if;

  return jsonb_build_object(
    'result', case when days_left <= 7 then 'warning' else 'authorized' end,
    'reason', case when days_left <= 7 then 'soon_expired' else 'valid' end,
    'name', c.prenom || ' ' || c.nom,
    'photo', coalesce(c.photo, ''),
    'presence', case when already_recorded then 'duplicate' else 'recorded' end,
    'time', visit_time
  );
end;
$$;
revoke all on function public.verify_member_qr(text) from public, anon, authenticated;
grant execute on function public.verify_member_qr(text) to anon, authenticated;

-- Sécurité : seul l'administrateur connecté (Supabase Auth) lit et écrit tout.
do $$ declare t text; begin
  foreach t in array array['clients','subscriptions','payments','visits','courses','products','renewal_requests','orders','join_requests','settings','payment_claims'] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists admin_all on %I', t);
    execute format('create policy admin_all on %I for all to authenticated using (true) with check (true)', t);
  end loop; end $$;
-- La boutique du site public peut lire les produits visibles.
drop policy if exists public_read_products on products;
create policy public_read_products on products for select to anon using ("on");

-- Espace client sans connexion : accès par lien personnel (colonne lk), uniquement via ces fonctions.
create or replace function public.client_space(tok text) returns json language plpgsql security definer set search_path = public as $$
declare c clients%rowtype;
begin
  select * into c from clients where lk = tok and coalesce(tok,'') <> '' limit 1;
  if not found then return json_build_object('error','invalid'); end if;
  if c.state <> 'actif' then return json_build_object('error','state','state',c.state); end if;
  return json_build_object('client', to_json(c),
    'subs',   (select coalesce(json_agg(s),'[]'::json) from subscriptions s where s.cid = c.id),
    'pays',   (select coalesce(json_agg(p),'[]'::json) from payments p where p.cid = c.id),
    'visits', (select coalesce(json_agg(v),'[]'::json) from visits v where v.cid = c.id),
    'reqs',   (select coalesce(json_agg(r),'[]'::json) from renewal_requests r where r.cid = c.id),
    'settings',(select coalesce(json_agg(x),'[]'::json) from settings x where x.id in ('wave','om')),
    'claims', (select coalesce(json_agg(k),'[]'::json) from payment_claims k where k.cid = c.id));
end $$;
create or replace function public.client_update(tok text, p_adresse text, p_email text, p_photo text) returns void
language sql security definer set search_path = public as $$
  update clients set adresse = left(coalesce(p_adresse,''),200), email = left(coalesce(p_email,''),120),
    photo = case when coalesce(p_photo,'') <> '' and length(p_photo) < 200000 then p_photo else photo end
  where lk = tok and coalesce(tok,'') <> '' and state = 'actif'; $$;
create or replace function public.client_request(tok text, p_plan text) returns void language plpgsql security definer set search_path = public as $$
declare c clients%rowtype;
begin
  select * into c from clients where lk = tok and coalesce(tok,'') <> '' and state = 'actif';
  if not found or p_plan not in ('m','t','a') then return; end if;
  if exists (select 1 from renewal_requests where cid = c.id and s = 'en attente') then return; end if;
  insert into renewal_requests(id, cid, plan, date, s) values ('R'||(extract(epoch from clock_timestamp())*1000)::bigint, c.id, p_plan, current_date, 'en attente');
end $$;
revoke all on function public.client_space(text), public.client_update(text,text,text,text), public.client_request(text,text) from public;
grant execute on function public.client_space(text), public.client_update(text,text,text,text), public.client_request(text,text) to anon, authenticated;

-- Commandes de la boutique et demandes d'inscription / messages : le site public peut seulement AJOUTER (jamais lire).
drop policy if exists anon_insert_orders on orders;
create policy anon_insert_orders on orders for insert to anon with check (status = 'nouvelle' and length(name) between 2 and 100 and length(phone) between 6 and 30 and total >= 0 and jsonb_typeof(items) = 'array' and jsonb_array_length(items) between 1 and 50);
drop policy if exists anon_insert_join on join_requests;
create policy anon_insert_join on join_requests for insert to anon with check (status = 'nouvelle' and length(name) between 2 and 100 and length(phone) between 6 and 30 and coalesce(length(message),0) <= 1000);

-- Paiement Wave / Orange Money déclaré par le client (validé ensuite par l'admin). Montants = prix des formules.
create or replace function public.client_claim(tok text, p_plan text, p_mode text, p_ref text) returns void language plpgsql security definer set search_path = public as $$
declare c clients%rowtype;
begin
  select * into c from clients where lk = tok and coalesce(tok,'') <> '' and state = 'actif';
  if not found or p_plan not in ('m','t','a') or p_mode not in ('Wave','Orange Money') or length(coalesce(p_ref,'')) not between 4 and 60 then return; end if;
  if exists (select 1 from payment_claims where cid = c.id and s = 'en attente' and txref = p_ref) then return; end if;
  insert into payment_claims(id, cid, plan, mode, amount, txref) values ('PC'||(extract(epoch from clock_timestamp())*1000)::bigint, c.id, p_plan, p_mode, case p_plan when 'm' then 25000 when 't' then 65000 else 220000 end, p_ref);
end $$;
revoke all on function public.client_claim(text,text,text,text) from public;
grant execute on function public.client_claim(text,text,text,text) to anon, authenticated;
