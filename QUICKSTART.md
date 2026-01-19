# 🚀 QUICK START - Klod Tattoo Blazor

## ⚡ Avvio Veloce (30 secondi)

### Opzione 1: Double-Click (Consigliato)
1. Vai nella cartella: `c:\Users\Techservice02\Desktop\KlodTattooBlazor\`
2. Double-click su: **`RUN_DEBUG.bat`**
3. Attendi che appaia il browser
4. Accedi a: **http://localhost:5000**

### Opzione 2: Riga di Comando
```bash
cd c:\Users\Techservice02\Desktop\KlodTattooBlazor
RUN_DEBUG.bat
```

### Opzione 3: Manuale con PowerShell/CMD
```bash
cd c:\Users\Techservice02\Desktop\KlodTattooBlazor
dotnet watch run
# Poi accedi a http://localhost:5000
```

---

## ✅ Checklist Pre-Avvio (IMPORTANTE!)

Prima di avviare, assicurati di aver completato questi step:

- [ ] **EmailJS Configurato**  
  Apri `Configuration/AppConfiguration.cs` e aggiorna:
  - `ServiceId`
  - `TemplateIdBooking`
  - `TemplateIdContact`
  - `PublicKey`

- [ ] **Dati Portfolio Caricati**  
  Controlla che `wwwroot/data/portfolio.json` esista e abbia dati

- [ ] **Immagini Portfolio**  
  Verifica che le immagini siano in `wwwroot/images/portfolio/`

- [ ] **Localizzazione**  
  Controlla che i file siano in `wwwroot/localization/` (de-DE.json, en.json, it-IT.json)

---

## 🎯 Cosa Vedrai All'Avvio

```
✅ App compila
✅ Browser si apre automaticamente
✅ Page Home carica con hero section
✅ Menu navigazione funziona
✅ Footer visibile
✅ Tutti gli stili sono applicati
```

---

## 🎨 Struttura Cartelle (Finale)

```
KlodTattooBlazor/
├── Components/
│   ├── Layout/          ← Header, Footer, NavMenu
│   ├── Shared/          ← Componenti riutilizzabili
│   └── Pages/
├── Configuration/       ← AppConfiguration.cs ⭐
├── Pages/               ← Home, Portfolio, Booking, ecc.
├── Services/            ← PortfolioService, EmailJsService
├── Utilities/           ← AppUtilities.cs ⭐
├── wwwroot/
│   ├── css/             ← Stili
│   ├── js/              ← JavaScript
│   ├── images/          ← Immagini portfolio
│   ├── localization/    ← JSON multilingua
│   └── data/            ← portfolio.json
├── Program.cs           ← Configurazione DI
├── _Imports.razor       ← Import globali
└── RUN_DEBUG.bat        ← Avvia app ⭐⭐⭐
```

---

## 📞 Primo Avvio - Troubleshooting

### Problema: "File not found"
```bash
dotnet clean
dotnet restore
RUN_DEBUG.bat
```

### Problema: Porta 5000 già in uso
- Verifica se c'è già un'app in esecuzione
- Cambia porta in `Properties/launchSettings.json`

### Problema: .NET non trovato
- Scarica .NET 8.0 da: https://dotnet.microsoft.com/download
- Riavvia il computer dopo l'installazione

### Problema: Page non carica dati
- Verifica console browser (F12)
- Controlla che i file JSON siano validi

---

## 📝 Documentazione Disponibile

| File | Descrizione |
|------|-------------|
| **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** | Struttura completa del progetto |
| **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** | 10 passi di configurazione |
| **[ORGANIZATION_SUMMARY.md](ORGANIZATION_SUMMARY.md)** | Riepilogo modifiche effettuate |
| **[PERFORMANCE_README.md](PERFORMANCE_README.md)** | Ottimizzazioni performance |
| **[PORTFOLIO_IMPLEMENTATION.md](PORTFOLIO_IMPLEMENTATION.md)** | Implementazione portfolio |
| **[JAVASCRIPT_FEATURES.md](JAVASCRIPT_FEATURES.md)** | Funzionalità JavaScript |

---

## 🎯 Prossimi Step Dopo Avvio

1. **Testare le Funzionalità**
   - Clicca sui menu per navigare
   - Visita Portfolio page
   - Testa form Booking e Contacts

2. **Testare Localizzazione**
   - Clicca su bandiere per cambiare lingua
   - Verifica che i testi cambino

3. **Testare Form**
   - Compila form di prenotazione
   - Verifica che invii email (se configurato)

4. **Preparare per Produzione**
   - Quando tutto funziona: `BUILD_RELEASE.bat`
   - Deploy output in hosting

---

## ⚡ Comandi Utili

```bash
# Avviare in debug con hot-reload
dotnet watch run

# Build per produzione
dotnet publish -c Release

# Pulire build
dotnet clean

# Ripristinare dipendenze
dotnet restore

# Compilare senza avviare
dotnet build
```

---

## 🔐 Sicurezza & Performance

✅ **Implementati:**
- Input validation (email, telefono)
- Service Worker per offline
- Lazy loading immagini
- CSS/JS minificati
- Local Storage crittografato (Blazored)

---

## 📊 Info Sistema

- **Framework:** Blazor WebAssembly (.NET 8.0)
- **Lingue Supportate:** 🇩🇪 Deutsch, 🇬🇧 English, 🇮🇹 Italiano
- **Browser Richiesti:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Package Manager:** NuGet

---

## 🆘 Support

Se hai problemi:

1. 📖 Leggi **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** sezione Troubleshooting
2. 🔍 Apri Console Browser (F12) per errori
3. 📝 Controlla Application Output in VS Code
4. 🔧 Prova: `dotnet clean` + `dotnet restore` + `RUN_DEBUG.bat`

---

**🎉 Buon lavoro! Il progetto è pronto per essere avviato!**

```
         ╔═══════════════════════════════╗
         ║   KLOD TATTOO BLAZOR          ║
         ║   ✅ ORGANIZZATO E PRONTO    ║
         ║   🚀 Clicca RUN_DEBUG.bat    ║
         ╚═══════════════════════════════╝
```

---

*Struttura organizzata il: 19 Gennaio 2026*
