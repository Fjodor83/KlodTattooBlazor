# 📐 Klod Tattoo Blazor - Struttura Progetto Organizzata

## 🎯 Panoramica

Questa è un'applicazione **Blazor WebAssembly** per il Klod Tattoo Studio con architettura ben organizzata, localization multilingue (DE, EN, IT) e ottimizzazioni di performance.

---

## 📁 Struttura Cartelle

```
KlodTattooBlazor/
├── 🔧 Configuration/
│   └── AppConfiguration.cs          # Configurazione centralizzata app
├── 📄 Components/
│   ├── Layout/                      # Layout principali
│   │   ├── MainLayout.razor         # Layout principale
│   │   ├── NavMenu.razor            # Menu navigazione
│   │   ├── Footer.razor             # Footer
│   │   └── CookieConsent.razor      # Banner cookie consent
│   ├── Shared/                      # Componenti riutilizzabili
│   │   ├── MetaTags.razor           # Meta tags per SEO
│   │   └── OptimizedImage.razor     # Componente immagini ottimizzate
│   └── Pages/                       # Cartella riservata per pagine comuni
├── 📄 Pages/
│   ├── Home.razor                   # Home page
│   ├── Portfolio.razor              # Portfolio tatuaggi
│   ├── Services.razor               # Servizi
│   ├── Booking.razor                # Prenotazioni
│   ├── Contacts.razor               # Contatti
│   └── ...
├── 🎨 Models/
│   ├── BookingRequest.cs            # Modello prenotazione
│   ├── PortfolioItem.cs             # Modello portfolio
│   ├── TattooStyle.cs               # Modello stili tatuaggio
│   ├── EmailJsSettings.cs           # Configurazione EmailJS
│   └── PortfolioData.cs             # Dati portfolio
├── ⚙️ Services/
│   ├── PortfolioService.cs          # Gestione portfolio
│   ├── EmailJsService.cs            # Integrazione EmailJS
│   └── LocalizationService.cs       # Localizzazione multilingue
├── 🛠️ Utilities/
│   └── AppUtilities.cs              # Funzioni utility comuni
├── 🌐 wwwroot/
│   ├── index.html                   # HTML principale
│   ├── css/
│   │   ├── app.css
│   │   ├── site.min.css
│   │   └── bootstrap/
│   ├── js/
│   │   ├── site.js
│   │   ├── service-worker-register.js
│   │   └── i18n-cookie.js
│   ├── images/
│   │   ├── flags/                   # Bandiere lingue
│   │   └── portfolio/               # Immagini portfolio
│   └── localization/
│       ├── de-DE.json               # Tedesco
│       ├── en.json                  # Inglese
│       └── it-IT.json               # Italiano
├── 📋 App.razor                     # Componente radice
├── 🔌 _Imports.razor                # Import globali
├── 🚀 Program.cs                    # Configurazione DI
└── 📦 KlodTattooBlazor.csproj      # File progetto
```

---

## 🚀 Come Avviare il Progetto

### Prerequisiti
- .NET 8.0 SDK o superiore
- Visual Studio 2022 / VS Code

### Avvio Locale

```bash
# Navigare nella cartella del progetto
cd c:\Users\Techservice02\Desktop\KlodTattooBlazor

# Ripristinare dipendenze
dotnet restore

# Avviare l'app in debug
dotnet watch run

# Accedere a http://localhost:5000
```

### Build per Produzione

```bash
dotnet publish -c Release
```

---

## ⚙️ Configurazione Importante

### 1️⃣ EmailJS Configuration
**File:** `Configuration/AppConfiguration.cs`

Aggiornare con le credenziali di EmailJS:
```csharp
public const string ServiceId = "your_service_id";
public const string TemplateIdBooking = "your_template_id";
public const string TemplateIdContact = "your_contact_template_id";
public const string PublicKey = "your_public_key";
```

### 2️⃣ Variabili di Localizzazione
Aggiungere le variabili di localizzazione nei file JSON:
- `wwwroot/localization/de-DE.json`
- `wwwroot/localization/en.json`
- `wwwroot/localization/it-IT.json`

### 3️⃣ Dati Portfolio
I dati portfolio sono caricati da:
- **File JSON:** `wwwroot/data/portfolio.json`
- **Immagini:** `wwwroot/images/portfolio/{realistic|traditional|blackwork}/`

---

## 📦 Dipendenze Principali

```xml
<PackageReference Include="Blazored.LocalStorage" Version="4.5.0" />
<PackageReference Include="BuildBundlerMinifier" Version="3.2.449" />
<PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly" Version="8.0.23" />
<PackageReference Include="Microsoft.Extensions.Localization" Version="8.0.0" />
```

---

## 🌍 Lingue Supportate

| Codice | Lingua | Descrizione |
|--------|--------|------------|
| `de-DE` | Deutsch | Tedesco (Germania) |
| `en` | English | Inglese |
| `it-IT` | Italiano | Italiano (Italia) |

---

## 🔒 Sicurezza

- ✅ Validazione email/telefono in `Utilities/AppUtilities.cs`
- ✅ CORS configurato in `index.html`
- ✅ Meta tags SEO per prevenzione XSS
- ✅ Local Storage Blazored crittografato

---

## 📊 Performance

- ⚡ Service Worker per caching offline
- 🖼️ Lazy loading immagini con `OptimizedImage.razor`
- 🎨 CSS minificato e bundled
- 📦 JavaScript minificato per ridurre payload

---

## 🐛 Debugging

### Problemi Comuni

**App non avvia:**
```bash
# Pulire build precedenti
dotnet clean

# Ripristinare e riavviare
dotnet restore
dotnet watch run
```

**Localizzazione non funziona:**
- Controllare che i file JSON siano in `wwwroot/localization/`
- Verificare che i nomi file siano esatti: `de-DE.json`, `en.json`, `it-IT.json`

**EmailJS non invia email:**
- Verificare ServiceId, TemplateIds e PublicKey in `AppConfiguration.cs`
- Controllare la console browser per errori

---

## 📝 Note Sviluppatore

### Aggiungere Nuovi Componenti Condivisi
1. Creare il file `.razor` in `Components/Shared/`
2. Sarà automaticamente disponibile in tutta l'app tramite `_Imports.razor`

### Aggiungere Nuovi Servizi
1. Creare la classe in `Services/`
2. Registrare in `Program.cs`: `builder.Services.AddScoped<NuovoService>();`

### Aggiungere Nuove Lingue
1. Creare file `wwwroot/localization/xx-XX.json`
2. Aggiornare `LocalizationService.cs` per supportare il nuovo codice
3. Aggiungere bandiera in `wwwroot/images/flags/`

---

## 📞 Supporto

Per domande o problemi, consultare la documentazione:
- 📄 [PERFORMANCE_README.md](PERFORMANCE_README.md)
- 📄 [PORTFOLIO_IMPLEMENTATION.md](PORTFOLIO_IMPLEMENTATION.md)
- 📄 [JAVASCRIPT_FEATURES.md](JAVASCRIPT_FEATURES.md)
- 📄 [CSS_FIX_DOCUMENTATION.md](CSS_FIX_DOCUMENTATION.md)

---

**Ultimo aggiornamento:** 19 Gennaio 2026  
**Versione:** 1.0 - Struttura Organizzata
