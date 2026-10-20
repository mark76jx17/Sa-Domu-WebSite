# Sa Domu Sarda — Sito web

Sito vetrina del ristorante **Sa Domu Sarda**, cucina tradizionale sarda a Cagliari e Pula.

🌐 **Sito online:** https://ristorantesadomusarda.it (hosting IONOS)

L'indirizzo GitHub Pages (`mark76jx17.github.io/Sa-Domu-WebSite`) pubblica solo una pagina che rimanda al nuovo dominio.

## Struttura del progetto

```
.
├── index.html          # struttura della pagina (+ dati strutturati per Google)
├── .htaccess           # configurazione server IONOS: HTTPS, header di sicurezza, cache
├── robots.txt          # indicazioni ai motori di ricerca
├── sitemap.xml         # elenco pagine per Google
├── css/style.css       # stili (palette, layout, responsive)
├── js/
│   ├── i18n.js         # traduzioni dell'interfaccia (5 lingue)
│   └── main.js         # logica (schede, lingua, galleria, prenota, video)
├── assets/
│   ├── img/            # foto ottimizzate (versioni -800 per i telefoni) + logo
│   └── video/          # video delle sale (720p / 1080p) + copertina
└── github-pages/       # pagina di rimando pubblicata su GitHub Pages
```

## Pubblicare un aggiornamento su IONOS

1. Pannello IONOS → Hosting → **Webspace** → cartella `sadomusarda`.
2. Caricare i file modificati (o l'intero contenuto del sito), sovrascrivendo quelli esistenti.
3. Non caricare: `.git/`, `.github/`, `github-pages/`, `_originali/`, `README.md`, video sorgente.
