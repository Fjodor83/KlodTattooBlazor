# 🎨 JavaScript Features - Klod Tattoo

## ✅ Funzionalità Implementate

### 1. Dynamic Navbar (Transparent → Glass) 🎯
La navbar parte trasparente e diventa glass (con effetto blur) dopo 50px di scroll.

**Utilizzo**:
```razor
<!-- In MainLayout.razor -->
<nav class="navbar" data-dynamic-navbar="true">
    ...
</nav>
```

---

### 2. Back to Top Button ⬆️
Pulsante circolare dorato che appare dopo 300px di scroll per tornare all'inizio.

**Features**:
- Creato automaticamente
- Smooth scroll animation
- Responsive design
- Animazione hover

**Non richiede codice aggiuntivo** - si crea da solo!

---

### 3. Active Nav Link Highlighting 🔗
Evidenzia automaticamente la pagina corrente nella navbar.

**Utilizzo**:
```razor
<a class="nav-link-custom" href="/portfolio">Portfolio</a>
<a class="nav-link-custom" href="/services">Services</a>
```

---

### 4. GLightbox Initialization 🖼️
Lightbox per gallerie di immagini con zoom, drag e swipe.

**Utilizzo in Blazor**:
```razor
@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await JS.InvokeVoidAsync("initGLightbox");
        }
    }
}
```

**In HTML**:
```html
<a href="large-image.jpg" class="glightbox">
    <img src="thumbnail.jpg" alt="..." />
</a>
```

---

### 5. Flatpickr Date Picker 📅
Date picker con tema dark per form di prenotazione.

**Utilizzo in Blazor**:
```razor
@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await JS.InvokeVoidAsync("initFlatpickr", "dateInput", "de");
        }
    }
}
```

**In HTML**:
```html
<input type="text" id="dateInput" placeholder="Select date" />
```

---

### 6. Lazy Loading Images (Legacy Support) 🖼️
Supporto legacy per il lazy loading (il principale è in lazy-load.js).

**Note**: Evita duplicazioni con `data-lazy-handled` attribute.

---

### 7. Smooth Scroll for Anchor Links ⚓
Scroll smooth automatico per tutti i link con `href="#..."`.

**Utilizzo**:
```html
<a href="#about">Vai a About</a>
...
<div id="about">...</div>
```

---

### 8. Form Validation Enhancement ✅
Validazione real-time per tutti i form con classi `valid`/`invalid`.

**Features**:
- Validazione on blur
- Rimozione classi on input
- Compatibile con Bootstrap

**Funziona automaticamente** su tutti i `<form>` !

---

### 9. Performance Optimization 🚀
Preload automatico delle risorse critiche e defer per CSS non critici.

**Features**:
- Preload di site.min.css e site.min.js
- Defer loading per CSS con `data-defer` attribute

**Funziona automaticamente** al caricamento pagina!

---

### 10. Accessibility Improvements ♿
Migliora l'accessibilità con skip link e main landmark.

**Features**:
- Skip to main content link (per keyboard navigation)
- Auto-creazione ID "main" se mancante
- WCAG 2.1 compliant

**Funziona automaticamente** !

---

## 🔧 Funzioni Esportate Globalmente

### `window.scrollToTop()`
```javascript
// Scroll programmatico all'inizio
window.scrollToTop();
```

### `window.initGLightbox()`
```javascript
// Inizializza GLightbox manualmente
window.initGLightbox();
```

### `window.initFlatpickr(elementId, locale)`
```javascript
// Inizializza Flatpickr su un elemento
window.initFlatpickr('myDateInput', 'it');
```

### `window.klodTattoo.*`
```javascript
// Namespace con tutte le funzioni principali
window.klodTattoo.initDynamicNavbar();
window.klodTattoo.initBackToTop();
window.klodTattoo.highlightActiveNavLink();
```

---

## 🔄 Integrazione Blazor SPA

Il codice si ri-inizializza automaticamente dopo ogni navigazione Blazor:

```javascript
// Auto-reinit after Blazor navigation
Blazor.addEventListener('enhancedload', function() {
    setTimeout(initAll, 100);
});
```

**MutationObserver** monitora i cambiamenti DOM per re-inizializzare la navbar dinamica.

---

## 📱 Responsive Design

Tutte le funzionalità sono ottimizzate per mobile:
- Back to top: 45px su mobile vs 50px desktop
- Touch events per GLightbox
- Scroll ottimizzato con `passive: true`

---

## ⚡ Performance

**Ottimizzazioni**:
- Event listeners con `passive: true` (smooth scroll)
- Debounce automatico con `setTimeout`
- Preload risorse critiche
- Lazy initialization

---

## 🧪 Testing

```bash
# 1. Avvia server
dotnet run

# 2. Test manuale
- Scrolla pagina → Navbar diventa glass ✅
- Scrolla > 300px → Back to top appare ✅
- Click link nav → Si evidenzia ✅
- Click immagine → Lightbox si apre ✅
- Tab keyboard → Skip link appare ✅
```

---

## 📊 Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Dynamic Navbar | ✅ | ✅ | ✅ | ✅ |
| Smooth Scroll | ✅ | ✅ | ✅ | ✅ |
| IntersectionObserver | ✅ | ✅ | ✅ | ✅ |
| MutationObserver | ✅ | ✅ | ✅ | ✅ |
| Passive Events | ✅ | ✅ | ✅ | ✅ |

**Fallback**: Legacy browsers ricevono funzionalità base senza animazioni avanzate.

---

## 💡 Tips

### Disabilitare Dynamic Navbar
```html
<!-- Rimuovi l'attributo data-dynamic-navbar -->
<nav class="navbar">...</nav>
```

### Personalizzare Back to Top
```css
/* In app.css */
.btn-back-to-top {
    background: your-color;
    bottom: your-position;
}
```

### Debug
```javascript
// Apri console
// Dovresti vedere:
🎨 Klod Tattoo - All scripts initialized
GLightbox initialized successfully
```

---

## 🎯 Summary

**10 potenti funzionalità** per migliorare UX, performance e accessibilità:
1. ✅ Navbar dinamica
2. ✅ Back to top
3. ✅ Nav highlighting
4. ✅ GLightbox
5. ✅ Flatpickr
6. ✅ Lazy loading
7. ✅ Smooth scroll
8. ✅ Form validation
9. ✅ Performance boost
10. ✅ Accessibility

**Tutto automatico, zero configurazione richiesta!** 🚀
