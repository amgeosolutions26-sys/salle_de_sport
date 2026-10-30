// ELITE FITNESS CLUB — script commun à toutes les pages
const WHATSAPP_NUMBER = "221770000000"; // numéro WhatsApp officiel, format international sans +
const U = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
const $ = (s, r = document) => r.querySelector(s);
const fmt = n => n.toLocaleString("fr-FR") + " FCFA";
const wa = t => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t)}`;

const PAGES = [["index.html","Accueil"],["classes.html","Cours"],["boutique.html","Boutique"],["tarifs.html","Abonnements"],["contact.html","Contact"]];
const SLIDES = [
  {img:U("1534438327276-14e5300c3a48"), eye:"L'EXCELLENCE À CHAQUE ENTRAÎNEMENT", h:"FORGE TON CORPS.<br><span>DÉPASSE TES LIMITES.</span>", p:"Un espace premium pour progresser, gagner en confiance et atteindre tes objectifs.", cta:["Voir les abonnements","tarifs.html"]},
  {img:U("1517836357463-d25dfeac3438"), eye:"COURS COLLECTIFS", h:"ÉNERGIE DE GROUPE.<br><span>RÉSULTATS RÉELS.</span>", p:"Cross-training, boxe, yoga et cardio avec des coachs passionnés.", cta:["Découvrir les cours","classes.html"]},
  {img:U("1571019613454-1cb2f99b2d8b"), eye:"COACHING PERSONNEL", h:"UN PLAN FAIT<br><span>POUR TOI.</span>", p:"Un accompagnement individuel pour une progression durable.", cta:["Réserver un essai","contact.html"]},
  {img:U("1540497077202-7c8a3999166f"), eye:"LA BOUTIQUE ELITE", h:"ÉQUIPE-TOI<br><span>COMME UN PRO.</span>", p:"Tenues, accessoires, nutrition et récupération.", cta:["Visiter la boutique","boutique.html"]}
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
  {id:"p1",cat:"Vêtements",name:"T-shirt Elite Performance",desc:"Tissu respirant, séchage rapide.",price:12000,icon:"👕",tag:"NOUVEAU"},
  {id:"p2",cat:"Vêtements",name:"Short d'entraînement",desc:"Léger et extensible.",price:10000,icon:"🩳"},
  {id:"p3",cat:"Vêtements",name:"Legging Elite Femme",desc:"Taille haute, maintien optimal.",price:15000,icon:"🧘",tag:"POPULAIRE"},
  {id:"p4",cat:"Vêtements",name:"Sweat à capuche Elite",desc:"Idéal échauffement et récupération.",price:22000,icon:"🧥"},
  {id:"p5",cat:"Accessoires",name:"Gourde isotherme 750 ml",desc:"Garde ton eau fraîche des heures.",price:8000,icon:"🥤"},
  {id:"p6",cat:"Accessoires",name:"Gants de musculation",desc:"Protègent les paumes, meilleure prise.",price:7000,icon:"🧤"},
  {id:"p7",cat:"Accessoires",name:"Sac de sport Elite",desc:"Compartiment chaussures inclus.",price:18000,icon:"🎒",tag:"POPULAIRE"},
  {id:"p8",cat:"Accessoires",name:"Serviette microfibre",desc:"Compacte et très absorbante.",price:5000,icon:"🧺"},
  {id:"p9",cat:"Nutrition",name:"Whey protéine 900 g",desc:"Soutient la récupération musculaire.",price:28000,icon:"💪"},
  {id:"p10",cat:"Nutrition",name:"Shaker Elite 700 ml",desc:"Mélange parfait, sans grumeaux.",price:4000,icon:"🥛"},
  {id:"p11",cat:"Récupération",name:"Rouleau de massage",desc:"Détends tes muscles après l'effort.",price:9000,icon:"🌀"},
  {id:"p12",cat:"Récupération",name:"Bandes élastiques (x3)",desc:"Trois niveaux de résistance.",price:6000,icon:"🎗️"}
];
const QUOTES = [["Une ambiance motivante et des coachs à l'écoute. J'ai gagné en force en 3 mois.","Aminata D."],["Les cours collectifs sont top, j'ai retrouvé le plaisir de m'entraîner.","Cheikh T."],["Salle propre, équipements récents, équipe au top. Je recommande !","Fatou S."]];

// ---------- En-tête, pied de page, panier ----------
const here = location.pathname.split("/").pop() || "index.html";
const hd = $("#siteHeader");
if (hd) hd.innerHTML = `<a class="brand" href="index.html">ELITE <span>FITNESS</span></a>
<nav id="mainNav">${PAGES.map(([u,t]) => `<a href="${u}"${u===here?' class="active"':''}>${t}</a>`).join("")}<a class="nav-login" href="tarifs.html#inscription">Rejoindre</a></nav>
<div class="header-actions"><button class="cart-btn" id="cartBtn" aria-label="Panier">🛍 <span id="cartCount">0</span></button><button class="menu-toggle" id="menuToggle" aria-label="Menu">☰</button></div>`;
const ft = $("#siteFooter");
if (ft) ft.innerHTML = `<div><a class="brand" href="index.html">ELITE <span>FITNESS</span></a><p>La discipline construit les résultats.</p></div>
<div><h4>NAVIGATION</h4>${PAGES.map(([u,t]) => `<a href="${u}">${t}</a><br>`).join("")}</div>
<div><h4>ADMINISTRATION</h4><a href="admin.html">Demandes reçues (démo)</a></div>
<div><h4>CONTACT</h4><p>Adresse : à compléter<br>Téléphone : à compléter</p><a href="${wa("Bonjour, je souhaite des informations.")}" target="_blank" rel="noopener">Écrire sur WhatsApp ↗</a></div>
<p class="copyright">© 2026 Elite Fitness Club — Tous droits réservés.</p>`;
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
  window.open(wa(`Bonjour Elite Fitness, je souhaite commander :\n${lines.join("\n")}\n\nTotal : ${fmt(total)}\n\nMerci de confirmer la disponibilité et le mode de paiement/retrait.`), "_blank", "noopener");
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
    '<button class="s-arrow prev" aria-label="Précédent">‹</button><button class="s-arrow next" aria-label="Suivant">›</button><div class="dots"></div>';
  const slides = sl.querySelectorAll(".slide"), dots = $(".dots", sl); let i = 0, t;
  slides.forEach((_, k) => { const d = document.createElement("button"); d.onclick = () => go(k); dots.appendChild(d); });
  const go = n => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle("on", k === i)); [...dots.children].forEach((d, k) => d.classList.toggle("on", k === i)); clearInterval(t); t = setInterval(() => go(i + 1), 6000); };
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
if (q) { let k = 0; const set = () => { q.classList.remove("in"); setTimeout(() => { q.innerHTML = `<p>« ${QUOTES[k][0]} »</p><span>— ${QUOTES[k][1]}</span>`; q.classList.add("in"); k = (k + 1) % QUOTES.length; }, 300); }; set(); setInterval(set, 5000); }

// ---------- Compteurs + apparition au défilement ----------
function observe(){
  if (!("IntersectionObserver" in window)) return document.querySelectorAll(".reveal").forEach(e => e.classList.add("in"));
  const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; e.target.classList.add("in"); io.unobserve(e.target);
    if (e.target.dataset.count) { const end = +e.target.dataset.count; let n = 0; const s = setInterval(() => { n += Math.ceil(end / 40); if (n >= end) { n = end; clearInterval(s); } e.target.textContent = n.toLocaleString("fr-FR") + (e.target.dataset.suf || ""); }, 30); } }), {threshold:.15});
  document.querySelectorAll(".reveal:not(.in),[data-count]").forEach(e => io.observe(e));
}
observe();

// ---------- Formulaires ----------
document.querySelectorAll(".choose-plan").forEach(b => b.onclick = () => { $("#planSelect").value = b.dataset.plan; $("#inscription").scrollIntoView({behavior:"smooth"}); });
const form = $("#registrationForm");
if (form) form.onsubmit = e => { e.preventDefault(); const m = Object.fromEntries(new FormData(form)); m.createdAt = new Date().toLocaleDateString("fr-FR");
  const ms = JSON.parse(localStorage.getItem("eliteMembers") || "[]"); ms.push(m); localStorage.setItem("eliteMembers", JSON.stringify(ms));
  $("#formMessage").textContent = "Demande enregistrée (mode démonstration). Branche un serveur pour recevoir les demandes réellement."; form.reset(); };
const cf = $("#contactForm");
if (cf) cf.onsubmit = e => { e.preventDefault(); const m = Object.fromEntries(new FormData(cf)); window.open(wa(`Bonjour, je suis ${m.name} (${m.phone}).\n${m.message}`), "_blank", "noopener"); };


// ---------- Thèmes de couleurs (choix du visiteur) ----------
const THEMES = {Orange:["#ff5a1f","#c93e0c","#ff7d4d","#3a1a0c"], Lime:["#b6ff00","#5f8a00","#caff3d","#26330a"], Cyan:["#00c2ff","#007fa8","#4dd6ff","#0a2a36"], Rose:["#ff2d78","#bf1556","#ff5c98","#3a0f22"], Or:["#c6a15b","#8b713e","#d8b875","#3b2f17"]};
function applyTheme(n){ const t = THEMES[n] || THEMES.Orange, r = document.documentElement.style; ["--gold","--goldd","--goldh","--tint"].forEach((v, i) => r.setProperty(v, t[i])); try { localStorage.setItem("eliteTheme", n); } catch (e) {} document.querySelectorAll(".theme-dot").forEach(d => d.classList.toggle("on", d.dataset.t === n)); }
document.body.insertAdjacentHTML("beforeend", `<div class="theme-box" id="themeBox"><button class="theme-toggle" aria-label="Changer les couleurs">🎨</button><div class="theme-panel">${Object.keys(THEMES).map(n => `<button class="theme-dot" data-t="${n}" title="${n}" style="background:${THEMES[n][0]}"></button>`).join("")}</div></div><div id="prog"></div><button id="toTop" aria-label="Haut de page">↑</button>`);
$(".theme-toggle").onclick = () => $("#themeBox").classList.toggle("open");
document.querySelectorAll(".theme-dot").forEach(d => d.onclick = () => applyTheme(d.dataset.t));
applyTheme((() => { try { return localStorage.getItem("eliteTheme"); } catch (e) { return null; } })() || "Orange");

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
