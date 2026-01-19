# 📸 Portfolio Images - Setup Guide

## ⚠️ IMPORTANTE: Aggiungi Le Tue Immagini

Le cartelle del portfolio sono state create, ma **devi aggiungere le immagini reali**.

---

## 📁 Struttura Creata

```
wwwroot/images/portfolio/
├── realistic/           ✅ Creata (vuota)
│   ├── portrait-1.jpg   ⚠️ DA AGGIUNGERE
│   ├── portrait-2.jpg   ⚠️ DA AGGIUNGERE
│   └── animal-1.jpg     ⚠️ DA AGGIUNGERE
├── traditional/         ✅ Creata (vuota)
│   ├── anchor-1.jpg     ⚠️ DA AGGIUNGERE
│   ├── rose-1.jpg       ⚠️ DA AGGIUNGERE
│   └── skull-1.jpg      ⚠️ DA AGGIUNGERE
└── blackwork/           ✅ Creata (vuota)
    ├── geometric-1.jpg  ⚠️ DA AGGIUNGERE
    ├── mandala-1.jpg    ⚠️ DA AGGIUNGERE
    └── tribal-1.jpg     ⚠️ DA AGGIUNGERE
```

---

## 🎯 Specifiche Immagini

### Dimensioni & Qualità:
- **Formato**: JPEG
- **Dimensioni**: 1200×1200px (quadrato)
- **Qualità**: 80% (bilanciamento qualità/dimensione)
- **Peso target**: < 150KB per immagine

### Ottimizzazione:
1. Ridimensiona a 1200×1200px
2. Comprimi con [TinyPNG](https://tinypng.com/)
3. Verifica che sia < 150KB

---

## 🌐 Opzioni Per Le Immagini

### Opzione 1: Usa Foto Reali del Tuo Lavoro ⭐ CONSIGLIATO
```
✅ Più autentico
✅ Migliore per SEO e credibilità
✅ Mostra il tuo stile unico

Fonti:
- Tatuaggi che hai già fatto
- Foto dal tuo Instagram
- Sessioni foto professionali
```

### Opzione 2: Immagini Placeholder Temporanee
Se non hai ancora foto pronte, usa placeholder temporanei:

**Free Stock Photos** (con licenza commerciale):
- [Unsplash Tattoos](https://unsplash.com/s/photos/tattoo)
- [Pexels Tattoos](https://www.pexels.com/search/tattoo/)
- [Pixabay Tattoos](https://pixabay.com/images/search/tattoo/)

### Opzione 3: Genera Placeholder con AI
Puoi generare immagini temporanee con:
- [Midjourney](https://www.midjourney.com/)
- [DALL-E](https://openai.com/dall-e-2)
- [Stable Diffusion](https://stablediffusionweb.com/)

**Prompt esempi**:
```
- "Hyper-realistic portrait tattoo, black and gray, professional photography"
- "Traditional anchor tattoo, bold lines, American traditional style"
- "Geometric blackwork sleeve tattoo, intricate mandala pattern"
```

⚠️ **Importante**: Watermark le immagini placeholder e sostituiscile con foto reali appena possibile.

---

## 📤 Come Aggiungere Le Immagini

### Metodo 1: Trascina e Rilascia
1. Apri Esplora File
2. Vai a `wwwroot/images/portfolio/[categoria]/`
3. Trascina le tue immagini ottimizzate
4. Rinominale secondo lo schema (es: `portrait-1.jpg`)

### Metodo 2: PowerShell
```powershell
# Esempio: copia immagine nella cartella realistic
Copy-Item "C:\path\to\your\image.jpg" -Destination "wwwroot\images\portfolio\realistic\portrait-1.jpg"
```

---

## ✅ Checklist Completamento

### Per Ogni Categoria:

#### Realistic (3 immagini):
- [ ] portrait-1.jpg (ritratto iper-realistico)
- [ ] portrait-2.jpg (ritratto bianco e nero)
- [ ] animal-1.jpg (lupo/animale realistico)

#### Traditional (3 immagini):
- [ ] anchor-1.jpg (ancora tradizionale)
- [ ] rose-1.jpg (rosa classica)
- [ ] skull-1.jpg (teschio con banner)

#### Blackwork (3 immagini):
- [ ] geometric-1.jpg (geometrico)
- [ ] mandala-1.jpg (mandala)
- [ ] tribal-1.jpg (tribale moderno)

### Ottimizzazione:
- [ ] Tutte le immagini ridimensionate a 1200×1200px
- [ ] Tutte compresse con TinyPNG
- [ ] Tutte sotto 150KB
- [ ] Nomi file corretti (lowercase, no spazi)

---

## 🚀 Test Dopo Aver Aggiunto Le Immagini

```bash
# 1. Avvia il server
dotnet run

# 2. Apri browser
http://localhost:5000/portfolio

# 3. Verifica:
✅ Immagini visibili
✅ Filtri funzionanti (Realistic, Traditional, Blackwork)
✅ GLightbox lightbox funziona al click
✅ Responsive su mobile
```

---

## 💡 Tips Professionali

### Fotografia Tatuaggi:
- Usa luce naturale o softbox
- Sfondo neutro (bianco/grigio)
- Messa a fuoco nitida sul tatuaggio
- Angolazione che mostra il lavoro al meglio

### Editing:
- Correzione colore leggera
- Contrasto e nitidezza moderati
- NO filtri pesanti
- Mantieni le tonalità naturali della pelle

### Organizzazione:
```
Photo Naming Convention:
realistic/portrait-1.jpg
realistic/portrait-2.jpg
traditional/anchor-1.jpg
etc.

✅ Lowercase
✅ No spazi
✅ Numerazione sequenziale
```

---

## 🆘 Aiuto Rapido

### Problema: Non ho foto pronte
**Soluzione**: Usa placeholder da Unsplash temporaneamente, sostituisci later

### Problema: Le immagini non si caricano
**Soluzione**: 
1. Verifica path esatto
2. Controlla nomi file (case-sensitive)
3. F5 per refresh browser

### Problema: Immagini troppo grandi
**Soluzione**: Comprimi con TinyPNG fino a < 150KB

---

## 📞 Prossimo Step

Dopo aver aggiunto le immagini:
1. ✅ Test portfolio page
2. ✅ Verifica lightbox
3. ✅ Test mobile responsive
4. ✅ Deploy!

**Buon lavoro! 🎨**
