# Image Optimization Guide for Klod Tattoo Studio

## 🎯 Optimization Targets

### File Size Targets:
- **Hero Images**: < 200KB (JPEG 80%, 1920×1080px max)
- **Portfolio Images**: < 150KB (JPEG 75%, 1200×800px max)  
- **Thumbnails**: < 50KB (JPEG 70%, 600×400px max)
- **Logo/Icons**: < 20KB (PNG optimized or SVG)

### Format Recommendations:
- **Photos/Tattoos**: JPEG + WebP
- **Logo/Graphics**: PNG + WebP (or SVG if possible)
- **Icons**: SVG (vector) preferred

---

## 🛠️ Tools for Optimization

### Online Tools (Recommended):
1. **TinyPNG** - https://tinypng.com/
   - Batch compress PNG and JPEG
   - Excellent quality/size ratio
   - Free for up to 20 images at once

2. **Squoosh** - https://squoosh.app/
   - Google's web app
   - Side-by-side comparison
   - Convert to WebP, AVIF
   - Advanced compression settings

3. **Compressor.io** - https://compressor.io/
   - Lossy and lossless compression
   - Up to 90% reduction

### Desktop Tools:
1. **ImageOptim** (Mac) - https://imageoptim.com/
2. **FileOptimizer** (Windows) - https://nikkhokkho.sourceforge.io/static.php?page=FileOptimizer

### Command Line:
```bash
# Convert to WebP (requires cwebp tool)
cwebp -q 80 input.jpg -o output.webp

# Optimize JPEG (requires jpegoptim)
jpegoptim --max=80 --strip-all *.jpg

# Optimize PNG (requires optipng)
optipng -o7 *.png
```

---

## 📐 Recommended Image Dimensions

### Homepage:
- **Hero Background**: 1920×1080px (Full HD)
- **Profile Image**: 800×800px (square)
- **Feature Icons**: 128×128px or SVG

### Portfolio:
- **Gallery Images**: 1200×800px (3:2 ratio)
- **Thumbnails**: 600×400px (3:2 ratio)
- **Detail View**: 1600×1200px

### General:
- **Open Graph Images**: 1200×630px (Facebook/Twitter)
- **PWA Icons**: 72, 96, 128, 144, 152, 192, 384, 512px (square)

---

## 🌐 WebP Conversion Strategy

### Why WebP?
- **25-35% smaller** than JPEG at same quality
- Supported by all modern browsers (Chrome, Edge, Firefox, Safari 14+)
- Perfect for tattoo photos (complex details, gradients)

### Batch Convert Script (PowerShell):
```powershell
# Install cwebp first: https://developers.google.com/speed/webp/download

# Convert all JPEGs to WebP
Get-ChildItem -Path ".\images" -Filter *.jpg | ForEach-Object {
    $outputFile = $_.FullName -replace '\.jpg$', '.webp'
    & cwebp -q 80 $_.FullName -o $outputFile
    Write-Host "Converted: $($_.Name) → $($outputFile)"
}
```

### Using OptimizedImage Component:
```razor
@* Before *@
<img src="/images/hero.jpg" alt="Hero" />

@* After *@
<OptimizedImage 
    Src="/images/hero.jpg"
    WebPSrc="/images/hero.webp"
    Alt="Klod Tattoo Studio"
    Width="1920"
    Height="1080" />
```

---

## 📊 PWA Icon Generation

### Required Sizes:
- 72×72px
- 96×96px
- 128×128px
- 144×144px
- 152×152px
- 192×192px (mandatory for Android)
- 384×384px
- 512×512px (mandatory for Android)

### Online Generator:
1. **Favicon.io** - https://favicon.io/
   - Upload logo
   - Auto-generates all sizes
   - Includes favicon.ico

2. **PWA Asset Generator** - https://www.pwabuilder.com/
   - Generates all PWA assets
   - Includes maskable icons

### Manual Creation (Photoshop/GIMP):
1. Start with high-res logo (2048×2048px min)
2. Create new document for each size
3. Resize with bicubic interpolation
4. Apply smart sharpening
5. Export as PNG-24
6. Run through TinyPNG

---

## 🚀 Lazy Loading Implementation

### Standard Images:
```html
<!-- Old way -->
<img src="/images/large-image.jpg" alt="..." />

<!-- New way with lazy loading -->
<img src="/images/placeholder-tiny.jpg" 
     data-src="/images/large-image.jpg" 
     alt="..." 
     class="lazy"
     loading="lazy"
     decoding="async" />
```

### Using OptimizedImage Component:
```razor
<OptimizedImage 
    Src="/images/portfolio/tattoo1.jpg"
    WebPSrc="/images/portfolio/tattoo1.webp"
    PlaceholderSrc="/images/portfolio/tattoo1-tiny.jpg"
    Alt="Realistic portrait tattoo"
    Width="1200"
    Height="800"
    CssClass="portfolio-img shadow" />
```

---

## 📝 Checklist for Each Image

Before adding an image to the site:

- [ ] Resize to appropriate dimensions (see guide above)
- [ ] Compress JPEG to 70-80% quality
- [ ] Create WebP version (80% quality)
- [ ] Generate tiny placeholder (< 5KB, 20px wide, blurred)
- [ ] Optimize with TinyPNG or Squoosh
- [ ] Add descriptive alt text
- [ ] Use OptimizedImage component or lazy class
- [ ] Test loading in browser DevTools (Network tab)

---

## 🎨 Creating Blur Placeholders

### Method 1: ImageMagick
```bash
convert input.jpg -resize 20x -quality 70 -blur 0x2 placeholder.jpg
```

### Method 2: Online Tool
- Upload to https://blurha.sh/
- Copy data URL
- Use inline in placeholder

### Method 3: LQIP (Low Quality Image Placeholder)
```bash
# Install lqip-cli
npm install -g lqip-cli

# Generate placeholder
lqip input.jpg
```

---

## 📈 Expected Results

### Before Optimization:
- Hero image: ~800KB
- Portfolio (10 images): ~5MB
- Total page weight: ~6-7MB
- LCP: ~4.5s

### After Optimization:
- Hero image: ~150KB (WebP), ~200KB (JPEG fallback)
- Portfolio (10 images): ~1.2MB (WebP), ~1.5MB (JPEG fallback)
- Total page weight: ~1.5-2MB
- LCP: ~2.0s
- **Improvement: ~70% smaller, 55% faster LCP**

---

## 🔧 Automated Workflow (Advanced)

### Using GitHub Actions:
Create `.github/workflows/optimize-images.yml`:

```yaml
name: Optimize Images
on:
  push:
    paths:
      - 'wwwroot/images/**'

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Optimize Images
        uses: calibreapp/image-actions@main
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
          jpegQuality: 80
          pngQuality: 80
          webpQuality: 80
```

---

## 💡 Pro Tips

1. **Use srcset for responsive images**:
   ```html
   <img srcset="image-320w.jpg 320w,
                image-640w.jpg 640w,
                image-1280w.jpg 1280w"
        sizes="(max-width: 640px) 100vw, 640px"
        src="image-640w.jpg"
        alt="..." />
   ```

2. **Lazy load offscreen images only**:
   - Hero image: Load immediately (no lazy class)
   - Below fold images: Use lazy loading

3. **Preload critical images**:
   ```html
   <link rel="preload" as="image" href="/images/hero.webp" type="image/webp">
   ```

4. **Use aspect ratio boxes to prevent layout shift**:
   ```css
   .img-wrapper {
       aspect-ratio: 16 / 9;
       overflow: hidden;
   }
   ```

5. **Consider AVIF for cutting-edge optimization**:
   - Even smaller than WebP (~50% reduction)
   - Limited browser support (Chrome, Firefox)
   - Use as third option: AVIF → WebP → JPEG

---

## 📞 Questions?

Check Lighthouse audit after implementing:
- Run: `F12 → Lighthouse → Performance`
- Look for "Properly size images" warnings
- Check "Serve images in next-gen formats"
- Aim for 90+ Performance score

Good luck! 🚀
