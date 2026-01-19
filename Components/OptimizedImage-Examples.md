# OptimizedImage Component - Quick Start Examples

## Basic Usage

### Simple Image with WebP:
```razor
<OptimizedImage 
    Src="/images/hero.jpg"
    WebPSrc="/images/hero.webp"
    Alt="Klod Tattoo Studio Interior"
    Width="1920"
    Height="1080" />
```

### With Placeholder (Blur-up Effect):
```razor
<OptimizedImage 
    Src="/images/portfolio/tattoo1.jpg"
    WebPSrc="/images/portfolio/tattoo1.webp"
    PlaceholderSrc="/images/portfolio/tattoo1-tiny.jpg"
    Alt="Realistic portrait tattoo"
    Width="1200"
    Height="800" />
```

### Responsive Image with Srcset:
```razor
<OptimizedImage 
    Src="/images/artist-640w.jpg"
    WebPSrc="/images/artist.webp"
    Srcset="artist-320w.jpg 320w, artist-640w.jpg 640w, artist-1280w.jpg 1280w"
    Alt="Klod - Tattoo Artist"
    CssClass="img-fluid rounded shadow" />
```

---

## Example: Update Home.razor Hero Image

### Before:
```razor
<div class="image-wrapper p-3 rounded shadow-lg">
    <img src="/images/profile.jpg" 
         class="img-fluid rounded shadow" 
         alt="Klod Tattoo Artist" />
</div>
```

### After:
```razor
<div class="image-wrapper p-3 rounded shadow-lg">
    <OptimizedImage 
        Src="/images/profile.jpg"
        WebPSrc="/images/profile.webp"
        PlaceholderSrc="/images/profile-tiny.jpg"
        Alt="Klod Tattoo Artist - Professional tattoo artist in Obernburg"
        CssClass="img-fluid rounded shadow"
        Width="800"
        Height="800" />
</div>
```

---

## Example: Portfolio Gallery

### Before:
```razor
@foreach (var image in portfolioImages)
{
    <div class="col-md-4 mb-4">
        <img src="@image.Url" alt="@image.Title" class="img-fluid" />
    </div>
}
```

### After:
```razor
@foreach (var image in portfolioImages)
{
    <div class="col-md-4 mb-4">
        <OptimizedImage 
            Src="@image.Url"
            WebPSrc="@image.WebPUrl"
            PlaceholderSrc="@image.TinyUrl"
            Alt="@image.Title"
            Width="600"
            Height="400"
            CssClass="img-fluid portfolio-img shadow-lg" />
    </div>
}
```

---

## Generated HTML Output

### Input:
```razor
<OptimizedImage 
    Src="/images/hero.jpg"
    WebPSrc="/images/hero.webp"
    Alt="Hero Image" />
```

### Output:
```html
<picture>
    <source srcset="/images/hero.webp" type="image/webp">
    <img 
        src="data:image/svg+xml,%3Csvg..." 
        data-src="/images/hero.jpg"
        alt="Hero Image"
        class="lazy"
        loading="lazy"
        decoding="async" />
</picture>
```

### How It Works:
1. Browser checks if WebP is supported
2. If yes → loads hero.webp
3. If no → loads hero.jpg (fallback)
4. Lazy loading delays until image enters viewport
5. Smooth fade-in transition on load

---

## Image Preparation Workflow

### 1. Original Image:
```
hero.jpg (2MB, 3000×2000px)
```

### 2. Optimize:
```bash
# Resize
convert hero.jpg -resize 1920x1080 hero-optimized.jpg

# Compress
jpegoptim --max=80 hero-optimized.jpg

# Create WebP
cwebp -q 80 hero-optimized.jpg -o hero.webp

# Create tiny placeholder
convert hero-optimized.jpg -resize 20x -quality 70 -blur 0x2 hero-tiny.jpg
```

### 3. Result:
```
hero-optimized.jpg  → 180KB (JPEG fallback)
hero.webp           → 120KB (modern browsers)
hero-tiny.jpg       → 2KB (placeholder)
```

### 4. Use in Component:
```razor
<OptimizedImage 
    Src="/images/hero-optimized.jpg"
    WebPSrc="/images/hero.webp"
    PlaceholderSrc="/images/hero-tiny.jpg"
    Alt="Klod Tattoo Studio"
    Width="1920"
    Height="1080" />
```

---

## Performance Impact

### Traditional Approach:
```html
<img src="/images/hero.jpg" alt="Hero">
```
- **File size**: 2MB
- **Loads**: Immediately (blocks rendering)
- **Format**: JPEG only
- **LCP**: ~5s

### OptimizedImage Component:
```razor
<OptimizedImage Src="/images/hero.jpg" WebPSrc="/images/hero.webp" />
```
- **File size**: 120KB (WebP) / 180KB (JPEG)
- **Loads**: When needed (lazy)
- **Format**: WebP + fallback
- **LCP**: ~1.5s

**Improvement**: 93% smaller, 70% faster! 🚀

---

## Tips & Best Practices

### ✅ DO:
- Always provide width/height to prevent layout shift
- Use descriptive alt text for SEO and accessibility
- Create WebP versions for all photos
- Use tiny placeholders for blur-up effect
- Test on slow 3G network

### ❌ DON'T:
- Don't lazy load hero/above-fold images
- Don't skip alt text (bad for SEO)
- Don't use massive original files
- Don't forget to optimize images first

---

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| WebP | ✅ | ✅ | ✅ 14+ | ✅ |
| Lazy Loading | ✅ | ✅ | ✅ 15.4+ | ✅ |
| IntersectionObserver | ✅ | ✅ | ✅ | ✅ |
| Picture Element | ✅ | ✅ | ✅ | ✅ |

**Fallback**: Older browsers get JPEG/PNG (still works!)

---

## Next Steps

1. **Optimize existing images** (use IMAGE_OPTIMIZATION_GUIDE.md)
2. **Replace all `<img>` tags** with `<OptimizedImage>`
3. **Test lazy loading** (DevTools → Network → Slow 3G)
4. **Run Lighthouse** to see improvements
5. **Celebrate** your 90+ performance score! 🎉
