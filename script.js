// ALLIANZ SALAM FITNESS CLUB — script commun à toutes les pages
const WHATSAPP_NUMBER = "221773690652"; // numéro WhatsApp officiel, format international sans +
// ---- INFOS DU CLUB : à modifier ici ----
const CLUB = {phone:"+221 77 369 06 52", tel:"+221773690652", address:"Mbour 1, Thiès, Sénégal", mapQuery:"Allianz Salam Fitness Club, Mbour 1, Thiès, Sénégal"};
const HOURS = [[10,14],[6,22],[6,22],[6,22],[6,22],[6,22],[6,22]]; // [ouverture, fermeture] de Dimanche(0) à Samedi(6) ; null = fermé
const DAYS = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
function clubState(){ const n = new Date(new Date().toLocaleString("en-US", {timeZone:"Africa/Dakar"})), t = HOURS[n.getDay()], h = n.getHours() + n.getMinutes() / 60; return {open: !!(t && h >= t[0] && h < t[1])}; }
const U = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const $ = (s, r = document) => r.querySelector(s);
const fmt = n => n.toLocaleString("fr-FR") + " FCFA";
const wa = t => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t)}`;

const PAGES = [["index.html","Accueil"],["classes.html","Cours"],["boutique.html","Boutique"],["tarifs.html","Abonnements"],["contact.html","Contact"]];
const SLIDES = [
  {img:U("1534438327276-14e5300c3a48"), eye:"L'EXCELLENCE À CHAQUE ENTRAÎNEMENT", h:"FORGE TON CORPS.<br><span>DÉPASSE TES LIMITES.</span>", p:"Un espace premium pour progresser, gagner en confiance et atteindre tes objectifs.", cta:["Voir les abonnements","tarifs.html"]},
  {img:U("1517836357463-d25dfeac3438"), eye:"COURS COLLECTIFS", h:"ÉNERGIE DE GROUPE.<br><span>RÉSULTATS RÉELS.</span>", p:"Cross-training, boxe, yoga et cardio avec des coachs passionnés.", cta:["Découvrir les cours","classes.html"]},
  {img:U("1571019613454-1cb2f99b2d8b"), eye:"COACHING PERSONNEL", h:"UN PLAN FAIT<br><span>POUR TOI.</span>", p:"Un accompagnement individuel pour une progression durable.", cta:["Réserver un essai","contact.html"]},
  {img:U("1540497077202-7c8a3999166f"), eye:"LA BOUTIQUE ALLIANZ SALAM", h:"ÉQUIPE-TOI<br><span>COMME UN PRO.</span>", p:"Tenues, accessoires, nutrition et récupération.", cta:["Visiter la boutique","boutique.html"]}
];
const CLASSES = [
  {n:"Musculation", d:"Développe ta force.", img:U("1583454110551-21f2fa2afe61")},
  {n:"Cardio Training", d:"Endurance et énergie.", img:U("1576678927484-cc907957088c")},
  {n:"Yoga Flow", d:"Souplesse et calme.", img:U("1544367567-0f2fcb009e0b")},
  {n:"Boxe Fitness", d:"Explosivité et cardio.", img:U("1549576490-b0b4831ef60a")},
  {n:"Cross-Training", d:"Séances intenses en groupe.", img:U("1518611012118-696072aa579a")},
  {n:"HIIT", d:"Brûle un maximum en 30 min.", img:U("1599058917212-d750089bc07e")}
];
const SCHEDULE = {
  "Lundi":[["06:30","Cardio Training","Coach Moussa"],["12:30","HIIT","Coach Awa"],["18:30","Musculation guidée","Coach Ibou"]],
  "Mardi":[["07:00","Yoga Flow","Coach Fatou"],["17:30","Boxe Fitness","Coach Moussa"],["19:00","Cross-Training","Coach Ibou"]],
  "Mercredi":[["06:30","HIIT","Coach Awa"],["12:30","Cardio Training","Coach Moussa"],["18:30","Yoga Flow","Coach Fatou"]],
  "Jeudi":[["07:00","Musculation guidée","Coach Ibou"],["17:30","Cross-Training","Coach Awa"],["19:00","Boxe Fitness","Coach Moussa"]],
  "Vendredi":[["06:30","Cardio Training","Coach Moussa"],["12:30","Yoga Flow","Coach Fatou"],["18:30","HIIT","Coach Awa"]],
  "Samedi":[["09:00","Cross-Training","Coach Ibou"],["10:30","Boxe Fitness","Coach Moussa"],["12:00","Yoga Flow","Coach Fatou"]],
  "Dimanche":[["10:00","Étirements & récupération","Coach Fatou"]]
};
const PRODUCTS = [
  {id:"p1",cat:"Vêtements",name:"T-shirt Salam Performance",desc:"Tissu respirant, séchage rapide.",price:12000,icon:"👕",tag:"NOUVEAU"},
  {id:"p2",cat:"Vêtements",name:"Short d'entraînement",desc:"Léger et extensible.",price:10000,icon:"🩳"},
  {id:"p3",cat:"Vêtements",name:"Legging Salam Femme",desc:"Taille haute, maintien optimal.",price:15000,icon:"🧘",tag:"POPULAIRE"},
  {id:"p4",cat:"Vêtements",name:"Sweat à capuche Salam",desc:"Idéal échauffement et récupération.",price:22000,icon:"🧥"},
  {id:"p5",cat:"Accessoires",name:"Gourde isotherme 750 ml",desc:"Garde ton eau fraîche des heures.",price:8000,icon:"🥤"},
  {id:"p6",cat:"Accessoires",name:"Gants de musculation",desc:"Protègent les paumes, meilleure prise.",price:7000,icon:"🧤"},
  {id:"p7",cat:"Accessoires",name:"Sac de sport Salam",desc:"Compartiment chaussures inclus.",price:18000,icon:"🎒",tag:"POPULAIRE"},
  {id:"p8",cat:"Accessoires",name:"Serviette microfibre",desc:"Compacte et très absorbante.",price:5000,icon:"🧺"},
  {id:"p9",cat:"Nutrition",name:"Whey protéine 900 g",desc:"Soutient la récupération musculaire.",price:28000,icon:"💪"},
  {id:"p10",cat:"Nutrition",name:"Shaker Salam 700 ml",desc:"Mélange parfait, sans grumeaux.",price:4000,icon:"🥛"},
  {id:"p11",cat:"Récupération",name:"Rouleau de massage",desc:"Détends tes muscles après l'effort.",price:9000,icon:"🌀"},
  {id:"p12",cat:"Récupération",name:"Bandes élastiques (x3)",desc:"Trois niveaux de résistance.",price:6000,icon:"🎗️"}
];
const QUOTES = [["Une ambiance motivante et des coachs à l'écoute. J'ai gagné en force en 3 mois.","Aminata D."],["Les cours collectifs sont top, j'ai retrouvé le plaisir de m'entraîner.","Cheikh T."],["Salle propre, équipements récents, équipe au top. Je recommande !","Fatou S."]];

// ---------- En-tête, pied de page, panier ----------
const here = location.pathname.split("/").pop() || "index.html";
const BRAND = `<a class="brand" href="index.html" aria-label="Allianz Salam Fitness Club"><img class="brand-mark" src="images/logo-192.png" alt=""><span class="brand-text">ALLIANZ <span>SALAM</span><small>FITNESS CLUB</small></span></a>`;
const hd = $("#siteHeader");
if (hd) hd.innerHTML = `${BRAND}
<nav id="mainNav">${PAGES.map(([u,t]) => `<a href="${u}"${u===here?' class="active"':''}>${t}</a>`).join("")}<a class="nav-login" href="tarifs.html#inscription">Rejoindre</a><div class="lang"><button data-l="fr">FR</button><button data-l="en">EN</button><button data-l="wo">WO</button></div></nav>
<div class="header-actions"><button class="cart-btn" id="cartBtn" aria-label="Panier">🛍 <span id="cartCount">0</span></button><button class="menu-toggle" id="menuToggle" aria-label="Menu">☰</button></div>`;
const ft = $("#siteFooter");
if (ft) ft.innerHTML = `<div>${BRAND}<p>La discipline construit les résultats.</p></div>
<div><h4>NAVIGATION</h4>${PAGES.map(([u,t]) => `<a href="${u}">${t}</a><br>`).join("")}</div>
<div><h4>ADMINISTRATION</h4><a href="admin.html">Demandes reçues (démo)</a></div>
<div><h4>CONTACT</h4><p>${CLUB.address}<br><a href="tel:${CLUB.tel}">${CLUB.phone}</a></p><a href="${wa("Bonjour, je souhaite des informations.")}" target="_blank" rel="noopener">Écrire sur WhatsApp ↗</a><br><a href="#" class="open-map">Voir la carte ↗</a></div>
<p class="copyright">© 2026 Allianz Salam Fitness Club — Tous droits réservés.</p>`;
document.body.insertAdjacentHTML("beforeend", `<div class="cart-overlay" id="cartOverlay"></div><aside class="cart-drawer" id="cartDrawer" aria-hidden="true"><div class="cart-head"><h3>MON PANIER</h3><button id="cartClose" aria-label="Fermer">✕</button></div><div class="cart-items" id="cartItems"></div><div class="cart-foot"><div class="cart-total"><span>Total</span><strong id="cartTotal">0 FCFA</strong></div><button class="btn btn-gold" id="checkoutBtn">Commander sur WhatsApp</button><button class="btn btn-outline" id="clearCart">Vider le panier</button></div></aside>
<a class="wa-float" href="${wa("Bonjour, je souhaite des informations.")}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>`);
$("#menuToggle")?.addEventListener("click", e => { e.stopPropagation(); $("#mainNav").classList.toggle("open"); });
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => $("#mainNav").classList.remove("open")));
document.addEventListener("click", e => { if (!e.target.closest("#mainNav")) $("#mainNav")?.classList.remove("open"); });
addEventListener("scroll", () => hd?.classList.toggle("scrolled", scrollY > 30));

// ---------- Panier ----------
let cart = []; try { cart = JSON.parse(localStorage.getItem("eliteCart") || "[]"); } catch (e) {}
const saveCart = () => { try { localStorage.setItem("eliteCart", JSON.stringify(cart)); } catch (e) {} renderCart(); };
function renderCart(){
  const box = $("#cartItems"); let total = 0, count = 0; box.innerHTML = "";
  cart = cart.filter(l => PRODUCTS.some(p => p.id === l.id));
  if (!cart.length) box.innerHTML = '<p class="cart-empty">Ton panier est vide.</p>';
  cart.forEach(l => {
    const p = PRODUCTS.find(x => x.id === l.id); total += p.price * l.qty; count += l.qty;
    const r = document.createElement("div"); r.className = "cart-line";
    r.innerHTML = '<div class="ico"></div><div><h4></h4><small></small><div class="qty"><button data-a="-">−</button><span></span><button data-a="+">+</button></div></div><button class="cart-remove">Retirer</button>';
    $(".ico", r).textContent = p.icon; $("h4", r).textContent = p.name; $("small", r).textContent = fmt(p.price); $(".qty span", r).textContent = l.qty;
    $('[data-a="-"]', r).onclick = () => { l.qty--; if (l.qty <= 0) cart = cart.filter(x => x !== l); saveCart(); };
    $('[data-a="+"]', r).onclick = () => { l.qty++; saveCart(); };
    $(".cart-remove", r).onclick = () => { cart = cart.filter(x => x !== l); saveCart(); };
    box.appendChild(r);
  });
  $("#cartTotal").textContent = fmt(total); $("#cartCount").textContent = count;
}
const toggleCart = o => { document.body.classList.toggle("lock", o); $("#cartDrawer").classList.toggle("open", o); $("#cartOverlay").classList.toggle("open", o); };
$("#cartBtn").onclick = () => toggleCart(true); $("#cartClose").onclick = () => toggleCart(false); $("#cartOverlay").onclick = () => toggleCart(false);
addEventListener("keydown", e => e.key === "Escape" && toggleCart(false));
$("#clearCart").onclick = () => { cart = []; saveCart(); };
$("#checkoutBtn").onclick = () => {
  if (!cart.length) return; let total = 0;
  const lines = cart.map(l => { const p = PRODUCTS.find(x => x.id === l.id); total += p.price * l.qty; return `• ${l.qty} x ${p.name} (${fmt(p.price * l.qty)})`; });
  window.open(wa(`Bonjour Allianz Salam Fitness, je souhaite commander :\n${lines.join("\n")}\n\nTotal : ${fmt(total)}\n\nMerci de confirmer la disponibilité et le mode de paiement/retrait.`), "_blank", "noopener");
};
renderCart();

// ---------- Produits ----------
function renderProducts(box, list){
  box.innerHTML = "";
  list.forEach(p => {
    const c = document.createElement("article"); c.className = "product-card reveal";
    c.innerHTML = `<div class="product-thumb">${p.image ? `<img src="${p.image}" alt="" loading="lazy">` : p.icon}${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}</div><div class="product-body"><span class="product-cat">${p.cat}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-price">${fmt(p.price)}</div><button class="btn btn-gold">Ajouter au panier</button></div>`;
    const b = $("button", c);
    b.onclick = () => { const l = cart.find(x => x.id === p.id); l ? l.qty++ : cart.push({id:p.id, qty:1}); saveCart(); b.textContent = "Ajouté ✓"; setTimeout(() => b.textContent = "Ajouter au panier", 1200); };
    box.appendChild(c);
  });
  observe();
}
const grid = $("#productGrid");
if (grid) {
  const cats = ["Tout", ...new Set(PRODUCTS.map(p => p.cat))], fb = $("#shopFilters"); let cat = "Tout";
  const show = () => { fb.innerHTML = ""; cats.forEach(c => { const b = document.createElement("button"); b.className = "filter-btn" + (c === cat ? " active" : ""); b.textContent = c.toUpperCase(); b.onclick = () => { cat = c; show(); }; fb.appendChild(b); });
    const q = ($("#shopSearch")?.value || "").toLowerCase().trim(), so = $("#shopSort")?.value;
    let l = PRODUCTS.filter(p => (cat === "Tout" || p.cat === cat) && (p.name + p.desc).toLowerCase().includes(q));
    if (so) l = [...l].sort((a, b) => so === "asc" ? a.price - b.price : b.price - a.price);
    renderProducts(grid, l); if (!l.length) grid.innerHTML = '<p class="cart-empty" style="grid-column:1/-1">Aucun produit trouvé.</p>'; };
  $("#shopSearch")?.addEventListener("input", show); $("#shopSort")?.addEventListener("change", show); show();
}
const teaser = $("#teaser"); if (teaser) renderProducts(teaser, PRODUCTS.filter(p => p.tag).concat(PRODUCTS.filter(p => !p.tag)).slice(0, 4));

// ---------- Diaporama d'accueil ----------
const sl = $("#slider");
if (sl) {
  sl.innerHTML = SLIDES.map(s => `<div class="slide"><div class="bg" style="--img:url('${s.img}')"></div><div class="slide-in"><p class="eyebrow">${s.eye}</p><h1>${s.h}</h1><p class="hero-copy">${s.p}</p><a class="btn btn-gold" href="${s.cta[1]}">${s.cta[0]}</a></div></div>`).join("") +
    '<img class="hero-logo" src="images/logo-600.jpg" alt="Allianz Salam Fitness Club"><i class="bar"></i><button class="s-arrow prev" aria-label="Précédent">‹</button><button class="s-arrow next" aria-label="Suivant">›</button><div class="dots"></div>';
  const slides = sl.querySelectorAll(".slide"), dots = $(".dots", sl); let i = 0, t;
  slides.forEach((_, k) => { const d = document.createElement("button"); d.onclick = () => go(k); dots.appendChild(d); });
  const go = n => { const bar = $(".bar", sl); bar.classList.remove("run"); void bar.offsetWidth; bar.classList.add("run"); i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle("on", k === i)); [...dots.children].forEach((d, k) => d.classList.toggle("on", k === i)); clearInterval(t); t = setInterval(() => go(i + 1), 6000); };
  let sx = 0; sl.addEventListener("touchstart", e => sx = e.touches[0].clientX, {passive:true}); sl.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); }, {passive:true});
  $(".prev", sl).onclick = () => go(i - 1); $(".next", sl).onclick = () => go(i + 1); go(0);
}

// ---------- Cours : carrousel + planning ----------
const track = $("#classTrack");
if (track) {
  track.innerHTML = CLASSES.map(c => `<a class="cls-card bg" href="classes.html" style="--img:url('${c.img}')"><div><h3>${c.n}</h3><p>${c.d}</p></div></a>`).join("");
  $("#clsPrev").onclick = () => track.scrollBy({left:-300, behavior:"smooth"});
  $("#clsNext").onclick = () => track.scrollBy({left:300, behavior:"smooth"});
}
const days = $("#dayTabs");
if (days) {
  const draw = d => { days.innerHTML = ""; Object.keys(SCHEDULE).forEach(k => { const b = document.createElement("button"); b.className = "filter-btn" + (k === d ? " active" : ""); b.textContent = k.toUpperCase(); b.onclick = () => draw(k); days.appendChild(b); });
    $("#schedule").innerHTML = SCHEDULE[d].map(r => `<div class="sch-row"><b>${r[0]}</b><div><h4>${r[1]}</h4><small>${r[2]}</small></div><a class="btn btn-outline" href="${wa(`Bonjour, je souhaite réserver : ${r[1]} le ${d} à ${r[0]}.`)}" target="_blank" rel="noopener">Réserver</a></div>`).join(""); };
  draw(["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"][new Date().getDay()]);
}

// ---------- Citations ----------
const q = $("#quote");
if (q) { let k = 0; const set = () => { q.classList.remove("in"); setTimeout(() => { q.innerHTML = `<p>${QUOTES[k][0]}</p><span>— ${QUOTES[k][1]}</span>`; q.classList.add("in"); k = (k + 1) % QUOTES.length; }, 300); }; set(); setInterval(set, 5000); }

// ---------- Compteurs + apparition au défilement ----------
function observe(){
  if (!("IntersectionObserver" in window)) return document.querySelectorAll(".reveal").forEach(e => e.classList.add("in"));
  const io = new IntersectionObserver(es => es.forEach((e, ix) => { if (!e.isIntersecting) return; e.target.style.transitionDelay = (ix % 4) * 90 + "ms"; setTimeout(() => e.target.style.transitionDelay = "", 1000); e.target.classList.add("in"); io.unobserve(e.target);
    if (e.target.dataset.count) { const end = +e.target.dataset.count; let n = 0; const s = setInterval(() => { n += Math.ceil(end / 40); if (n >= end) { n = end; clearInterval(s); } e.target.textContent = n.toLocaleString("fr-FR") + (e.target.dataset.suf || ""); }, 30); } }), {threshold:.15});
  document.querySelectorAll(".reveal:not(.in),[data-count]").forEach(e => io.observe(e));
}
observe();

// ---------- Formulaires ----------
document.querySelectorAll(".choose-plan").forEach(b => b.onclick = () => { $("#planSelect").value = b.dataset.plan; $("#inscription").scrollIntoView({behavior:"smooth"}); });
const form = $("#registrationForm");
if (form) form.onsubmit = e => { e.preventDefault(); const m = Object.fromEntries(new FormData(form)); m.createdAt = new Date().toLocaleDateString("fr-FR");
  const ms = JSON.parse(localStorage.getItem("eliteMembers") || "[]"); ms.push(m); localStorage.setItem("eliteMembers", JSON.stringify(ms));
  window.open(wa(`Bonjour, je souhaite m'inscrire.\nNom : ${m.name}\nTéléphone : ${m.phone}\nE-mail : ${m.email}\nFormule : ${m.plan}`), "_blank", "noopener"); $("#formMessage").textContent = "Merci ! WhatsApp s'ouvre pour confirmer ta demande."; form.reset(); };
const cf = $("#contactForm");
if (cf) cf.onsubmit = e => { e.preventDefault(); const m = Object.fromEntries(new FormData(cf)); window.open(wa(`Bonjour, je suis ${m.name} (${m.phone}).\n${m.message}`), "_blank", "noopener"); };


// ---------- Couleurs : doré et noir (couleurs du logo), définies dans style.css (--gold) ----------


document.body.insertAdjacentHTML("beforeend", `<div id="prog"></div><button id="toTop" aria-label="Haut de page">↑</button>`);




// ---------- Barre de progression + retour en haut ----------
addEventListener("scroll", () => { const h = document.documentElement; $("#prog").style.width = (scrollY / Math.max(1, h.scrollHeight - innerHeight) * 100) + "%"; $("#toTop").classList.toggle("show", scrollY > 600); });
$("#toTop").onclick = () => scrollTo({top:0, behavior:"smooth"});

// ---------- Effet 3D au survol des cartes ----------
const TS = ".product-card,.price-card,.cls-card,a.service-card";
document.addEventListener("mousemove", e => { if (matchMedia("(hover:none)").matches) return; const c = e.target.closest?.(TS); if (!c) return;
  const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  c.style.transition = "transform .12s"; c.style.transform = `perspective(800px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-5px)`; });
document.addEventListener("mouseout", e => { const c = e.target.closest?.(TS); if (c && !c.contains(e.relatedTarget)) { c.style.transform = ""; c.style.transition = ""; } });

// ---------- Calculateur IMC ----------
const bh = $("#bh");
if (bh) { const bw = $("#bw"), calc = () => { const m = bh.value / 100, v = bw.value / (m * m), cat = v < 18.5 ? "Maigreur" : v < 25 ? "Poids normal" : v < 30 ? "Surpoids" : "Obésité";
  $("#hv").textContent = bh.value; $("#wv").textContent = bw.value; $("#bmiVal").textContent = v.toFixed(1); $("#bmiCat").textContent = cat; $("#bmiPin").style.left = Math.min(100, Math.max(0, (v - 15) / 25 * 100)) + "%"; };
  bh.oninput = bw.oninput = calc; calc(); }


// ---------- Horaires + carte Google Maps ----------
function renderFind(el){
  const now = new Date(new Date().toLocaleString("en-US", {timeZone:"Africa/Dakar"})), d = now.getDay(), h = now.getHours() + now.getMinutes() / 60, t = HOURS[d];
  const open = t && h >= t[0] && h < t[1], p2 = n => String(n).padStart(2, "0") + ":00";
  el.innerHTML = `<div class="find-info"><p class="eyebrow">NOUS TROUVER</p><h2>VIENS NOUS <span>VOIR.</span></h2><span class="badge${open ? " on" : ""}">${open ? "Ouvert maintenant" : "Fermé actuellement"}</span>
<h4>Adresse</h4><p>${CLUB.address}</p><h4>Horaires d'ouverture</h4><ul class="hours">${[1,2,3,4,5,6,0].map(i => `<li${i === d ? ' class="today"' : ""}><span>${DAYS[i]}</span><b>${HOURS[i] ? p2(HOURS[i][0]) + " – " + p2(HOURS[i][1]) : "Fermé"}</b></li>`).join("")}</ul>
<div class="find-btns"><a class="btn btn-gold" href="tel:${CLUB.tel}">Appeler</a><a class="btn btn-outline" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CLUB.mapQuery)}">Itinéraire</a></div></div>
<div class="map-wrap"><iframe title="Carte Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen src="https://www.google.com/maps?q=${encodeURIComponent(CLUB.mapQuery)}&output=embed"></iframe></div>`;
}
const fd = $("#findUs"); if (fd) renderFind(fd);


// ---------- Fenêtre carte (ne gêne pas la page) ----------
document.body.insertAdjacentHTML("beforeend", `<div class="modal" id="mapModal" aria-hidden="true"><div class="modal-card"><button class="modal-x" aria-label="Fermer">✕</button><div class="find" id="mapBody"></div></div></div>
<div class="lightbox" id="lb"><button class="lb-x" aria-label="Fermer">✕</button><button class="lb-p" aria-label="Précédent">‹</button><img alt=""><button class="lb-n" aria-label="Suivant">›</button></div>`);
const mapModal = $("#mapModal");
function openMap(){ renderFind($("#mapBody")); mapModal.classList.add("open"); document.body.classList.add("lock"); }
function closeMap(){ mapModal.classList.remove("open"); document.body.classList.remove("lock"); }
$(".modal-x").onclick = closeMap; mapModal.addEventListener("click", e => { if (e.target === mapModal) closeMap(); });
document.addEventListener("click", e => { if (e.target.closest(".open-map")) { e.preventDefault(); $("#mainNav").classList.remove("open"); openMap(); } });
if (location.hash === "#localisation") openMap();

// ---------- Galerie + lightbox ----------
const GALLERY = ["1534438327276-14e5300c3a48","1517836357463-d25dfeac3438","1571019613454-1cb2f99b2d8b","1540497077202-7c8a3999166f","1583454110551-21f2fa2afe61","1576678927484-cc907957088c","1544367567-0f2fcb009e0b","1549576490-b0b4831ef60a"];
const gl = $("#gallery"), lb = $("#lb"); let gi = 0;
if (gl) { gl.innerHTML = GALLERY.map((g, k) => `<button class="g-item bg reveal" data-k="${k}" aria-label="Photo ${k + 1}" style="--img:url('${U(g, 700)}')"></button>`).join(""); observe(); gl.onclick = e => { const b = e.target.closest(".g-item"); if (b) showLb(+b.dataset.k); }; }
function showLb(k){ gi = (k + GALLERY.length) % GALLERY.length; $("img", lb).src = U(GALLERY[gi], 1600); lb.classList.add("open"); document.body.classList.add("lock"); }
function hideLb(){ lb.classList.remove("open"); document.body.classList.remove("lock"); }
$(".lb-x").onclick = hideLb; $(".lb-p").onclick = () => showLb(gi - 1); $(".lb-n").onclick = () => showLb(gi + 1); lb.addEventListener("click", e => { if (e.target === lb) hideLb(); });
let lx = 0; lb.addEventListener("touchstart", e => lx = e.touches[0].clientX, {passive:true}); lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - lx; if (Math.abs(d) > 50) showLb(gi + (d < 0 ? 1 : -1)); }, {passive:true});
addEventListener("keydown", e => { if (e.key === "Escape") { closeMap(); hideLb(); } if (lb.classList.contains("open")) { if (e.key === "ArrowRight") showLb(gi + 1); if (e.key === "ArrowLeft") showLb(gi - 1); } });

// ---------- Barre de navigation dynamique, parallaxe, boutons magnétiques, transitions ----------
let ly = 0;
addEventListener("scroll", () => { const y = scrollY; hd.classList.toggle("shrink", y > 60); hd.classList.toggle("hide", y > ly && y > 320 && !$("#mainNav").classList.contains("open")); ly = y;
  const s = $("#slider"); if (s && y < 900) s.style.setProperty("--py", y * .18 + "px"); }, {passive:true});
document.addEventListener("mousemove", e => { if (matchMedia("(hover:none)").matches) return; const b = e.target.closest?.(".btn-gold,.nav-login"); if (!b) return; const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .28}px)`; });
document.addEventListener("mouseout", e => { const b = e.target.closest?.(".btn-gold,.nav-login"); if (b && !b.contains(e.relatedTarget)) b.style.transform = ""; });
document.addEventListener("click", e => { const a = e.target.closest("a[href]"); if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; const u = new URL(a.href, location.href);
  if (u.host !== location.host || !/\.html$/.test(u.pathname) || u.pathname === location.pathname) return; e.preventDefault(); document.body.classList.add("leaving"); setTimeout(() => location.href = a.href, 260); });
addEventListener("pageshow", () => document.body.classList.remove("leaving"));
