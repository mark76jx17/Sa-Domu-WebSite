# Sa Domu Sarda — Sito web

Sito vetrina del ristorante **Sa Domu Sarda**, cucina sarda di terra nel cuore di Cagliari.

🌐 **Sito online:** https://mark76jx17.github.io/Sa-Domu-WebSite/

## Caratteristiche

- Design *"caldo sardo"* (crema, terracotta, oliva), completamente responsive
- Sezioni: Home · Menu · Galleria (con lightbox) · Recensioni & Premi · Chi siamo · Contatti
- Multilingua: **IT · EN · FR · DE · ES** (con memoria della lingua scelta)
- Mappa OpenStreetMap, finestra di prenotazione, menu mobile
- Pagina statica: nessuna dipendenza, nessun passaggio di build

## Struttura del progetto

```
.
├── index.html          # struttura della pagina
├── css/
│   └── style.css       # stili (palette, layout, responsive)
├── js/
│   ├── i18n.js         # traduzioni dell'interfaccia (5 lingue)
│   └── main.js         # logica (schede, lingua, galleria, prenota)
└── assets/
    └── img/            # immagini ottimizzate per il web + logo
```

> Le foto originali ad alta risoluzione sono conservate in locale nella cartella
> `_originali/` (esclusa dalla repo tramite `.gitignore`).

## Avvio in locale

Apri `index.html` nel browser con un doppio clic. Non serve alcun server.

## Pubblicazione (GitHub Pages)

Il sito è pubblicato gratuitamente con **GitHub Pages** dal branch `main` (cartella root):

`Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root)`

## Dati e crediti

Informazioni, valutazioni e recensioni raccolte da **TripAdvisor** e **RestaurantGuru**.
Fotografie dei piatti del ristorante. Mappe © OpenStreetMap.
