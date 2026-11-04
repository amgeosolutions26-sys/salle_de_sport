ALLIANZ SALAM FITNESS CLUB — KIT DE DÉPART

1. Ouvre le dossier et double-clique sur index.html, ou lance un serveur local avec VS Code (Live Server).
2. Modifie les textes, tarifs, coordonnées et images.
3. Dans script.js, remplace WHATSAPP_NUMBER par le vrai numéro WhatsApp (format international, sans +).
4. Les demandes du formulaire sont stockées dans localStorage : c'est une démonstration locale, pas une vraie base de données.
5. admin.html montre les demandes saisies sur le même navigateur.

IMPORTANT — POUR PASSER EN PRODUCTION
HTML/CSS/JavaScript seuls ne suffisent pas pour sécuriser les comptes, les rôles administrateur/membre, les données personnelles et les paiements.
Il faudra ajouter un backend et une base de données (par exemple PHP + MySQL, ou Node.js + PostgreSQL), une authentification sécurisée et une intégration de paiement adaptée au Sénégal (par exemple un prestataire compatible avec les moyens de paiement réellement disponibles).
Ne stocke jamais les numéros de carte bancaire ou secrets de paiement dans le navigateur.
Les tarifs affichés sont fictifs. Les photos distantes nécessitent une connexion Internet.


BOUTIQUE (NOUVEAU)
- Les produits se modifient dans script.js, tableau PRODUCTS (nom, prix, catégorie, description).
- Pour une vraie photo : ajoute  image:"images/gants.jpg"  au produit (sinon une icône est affichée).
- Le panier est gardé dans le navigateur ; le bouton "Commander sur WhatsApp" envoie la commande au numéro WHATSAPP_NUMBER.
- Pas de paiement en ligne pour l'instant : à ajouter plus tard avec un backend et un prestataire de paiement (Wave, Orange Money, carte...).


SITE MULTI-PAGES (VERSION 2)
Pages : index.html (accueil), classes.html (planning), boutique.html, tarifs.html (abonnements + inscription), contact.html.
Tout le contenu modifiable (diaporama, cours, planning, produits, citations) est en haut de script.js : SLIDES, CLASSES, SCHEDULE, PRODUCTS, QUOTES.
L'en-tête, le pied de page et le panier sont communs et générés par script.js : une seule modification s'applique à toutes les pages.
Les photos viennent d'Unsplash (Internet requis). Pour tes propres photos, mets-les dans un dossier images/ et remplace les liens.


VERSION ALLIANZ SALAM — INFOS À MODIFIER
- script.js (haut du fichier) : WHATSAPP_NUMBER, CLUB (téléphone, adresse, requête Google Maps), HOURS (horaires).
- Carte Google Maps : mets l'adresse exacte dans CLUB.mapQuery (ex: "Allianz Salam Fitness Club, Rue X, Quartier Y, Dakar").
- Langues : i18n.js (français / anglais / wolof). Le wolof est à faire relire par un locuteur natif.
- Logo : dossier images/ (logo-96.jpg en-tête, logo-192.png favicon, logo-600.jpg grand format).

VERSION 3
- Adresse : Mbour 1, Thiès (script.js > CLUB). Carte dans une fenêtre (bouton « Localisation » du menu) + page Contact.
- Galerie photo (script.js > GALLERY), lightbox, navbar qui se réduit/se cache au défilement, transitions entre pages.
