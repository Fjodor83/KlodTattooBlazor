# ✅ Klod Tattoo Blazor - Checklist Configurazione Iniziale

## 🎯 Prima di Avviare l'Applicazione

### 1. ⚙️ Configurazione EmailJS
**File:** `Configuration/AppConfiguration.cs`

**Azioni:**
- [ ] Registrarsi su [EmailJS](https://www.emailjs.com/)
- [ ] Copiare il `Service ID` e aggiornare:
  ```csharp
  public const string ServiceId = "service_YOUR_SERVICE_ID";
  ```
- [ ] Creare un template per booking e copiare l'ID:
  ```csharp
  public const string TemplateIdBooking = "template_YOUR_BOOKING_TEMPLATE_ID";
  ```
- [ ] Creare un template per contatti e copiare l'ID:
  ```csharp
  public const string TemplateIdContact = "template_YOUR_CONTACT_TEMPLATE_ID";
  ```
- [ ] Copiare la `Public Key`:
  ```csharp
  public const string PublicKey = "YOUR_PUBLIC_KEY";
  ```

### 2. 🌍 Localizzazione (Multilingue)
**Cartella:** `wwwroot/localization/`

**File disponibili:**
- ✅ `de-DE.json` - Tedesco
- ✅ `en.json` - Inglese
- ✅ `it-IT.json` - Italiano

**Azioni:**
- [ ] Verificare che i file JSON siano presenti
- [ ] Controllare che abbiano la struttura corretta
- [ ] Aggiungere/aggiornare traduzioni secondo necessità

### 3. 📸 Immagini Portfolio
**Cartella:** `wwwroot/images/portfolio/`

**Sottocartelle:**
- [ ] `realistic/` - Immagini stile realistico
- [ ] `traditional/` - Immagini stile tradizionale
- [ ] `blackwork/` - Immagini stile blackwork

**Azioni:**
- [ ] Caricare le immagini nelle cartelle appropriate
- [ ] Assicurarsi che le immagini siano ottimizzate (max 200KB)
- [ ] Usare formati moderni: WebP, PNG, JPG

### 4. 📋 Dati Portfolio JSON
**File:** `wwwroot/data/portfolio.json`

**Struttura richiesta:**
```json
{
  "portfolioItems": [
    {
      "id": 1,
      "title": "Titolo Tatuaggio",
      "description": "Descrizione",
      "imageUrl": "/images/portfolio/realistic/image.jpg",
      "style": "realistic",
      "date": "2024-01-01"
    }
  ]
}
```

**Azioni:**
- [ ] Creare/aggiornare il file `portfolio.json`
- [ ] Aggiungere almeno 3 portfolio items
- [ ] Verificare che i percorsi delle immagini siano corretti

### 5. 🎨 Personalizzazioni CSS
**Cartella:** `wwwroot/css/`

**File disponibili:**
- [ ] `app.css` - Stili globali
- [ ] `site.min.css` - CSS minificato
- [ ] `bootstrap/` - Framework Bootstrap

**Azioni:**
- [ ] Aggiornare i colori tema (attualmente: #d4af37 - oro)
- [ ] Verificare che i responsive breakpoints funzionino
- [ ] Testare su mobile/tablet/desktop

### 6. 📞 Contatti e Link Sociali
**File:** `Components/Layout/Footer.razor`

**Azioni:**
- [ ] Aggiornare email di contatto
- [ ] Aggiornare numero di telefono
- [ ] Aggiornare link ai social media
- [ ] Verificare che gli URL siano corretti

### 7. 🔗 Meta Tags SEO
**File:** `wwwroot/index.html` e `Components/MetaTags.razor`

**Azioni:**
- [ ] Aggiornare `<title>`
- [ ] Aggiornare `<meta name="description">`
- [ ] Aggiornare `<meta name="keywords">`
- [ ] Aggiornare `<meta name="author">`
- [ ] Verificare Open Graph tags per social sharing

### 8. 🚀 Test di Avvio
**Prima di lanciare in produzione:**

```bash
# 1. Avviare in debug
RUN_DEBUG.bat

# O manualmente:
dotnet watch run

# 2. Accedere a http://localhost:5000
```

**Checklist di test:**
- [ ] Pagina home carica correttamente
- [ ] Menu navigazione funziona
- [ ] Localizzazione cambia lingua
- [ ] Portfolio mostra le immagini
- [ ] Form booking funziona
- [ ] Form contatti invia email
- [ ] Cookie consent appare
- [ ] Footer ha i link corretti
- [ ] Responsive design OK su mobile

### 9. 📦 Build Produzione

```bash
BUILD_RELEASE.bat

# O manualmente:
dotnet publish -c Release
```

**Output:** `bin/Release/net8.0/publish/`

- [ ] Build completata senza errori
- [ ] Verificare dimensione output
- [ ] Testare build in produzione localmente

### 10. 🌐 Deploy
**Opzioni di hosting:**
- [ ] Azure Static Web Apps
- [ ] GitHub Pages (gratis)
- [ ] Netlify (gratis)
- [ ] Server Apache/Nginx personalizzato

---

## 📝 Note Importanti

### EmailJS - Configurazione Template
I template EmailJS devono contenere questi parametri:

**Template Booking:**
- `from_name` - Nome cliente
- `from_email` - Email cliente
- `phone` - Telefono
- `preferred_date` - Data preferita
- `tattoo_style` - Stile desiderato
- `message` - Messaggio aggiuntivo

**Template Contatti:**
- `from_name` - Nome
- `from_email` - Email
- `subject` - Oggetto
- `message` - Messaggio

### Performance
- [ ] Immagini compresse e ottimizzate
- [ ] CSS/JS minificati
- [ ] Service Worker attivo per offline
- [ ] Lazy loading attivo

### Sicurezza
- [ ] Validazione form lato client attiva
- [ ] HTTPS abilitato in produzione
- [ ] Content Security Policy configurato
- [ ] Nessun dato sensibile in plain text

---

## 🔗 Link Utili

- 📚 [Documentazione Blazor](https://docs.microsoft.com/en-us/aspnet/core/blazor/)
- 📧 [EmailJS Documentation](https://www.emailjs.com/docs/)
- 🎨 [Bootstrap 5](https://getbootstrap.com/docs/5.0/)
- 🌍 [MDN Web Docs](https://developer.mozilla.org/)

---

## 📞 Troubleshooting

### App non carica
```bash
dotnet clean
dotnet restore
dotnet watch run
```

### Email non viene inviata
1. Verificare credenziali EmailJS in `AppConfiguration.cs`
2. Verificare che il template EmailJS esista
3. Controllare console browser (F12) per errori

### Localizzazione non funziona
1. Verificare che i file JSON siano in `wwwroot/localization/`
2. Verificare nomi file esatti
3. Controllare struttura JSON

### Immagini non caricate
1. Verificare percorsi in `portfolio.json`
2. Verificare che le immagini siano in `wwwroot/images/portfolio/`
3. Verificare permessi lettura file

---

**Stato:** ⏳ In Attesa di Configurazione  
**Ultimo Aggiornamento:** 19 Gennaio 2026
