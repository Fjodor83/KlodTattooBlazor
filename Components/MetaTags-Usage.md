# MetaTags Component - Usage Guide

## Overview
The `MetaTags.razor` component provides comprehensive SEO optimization for the Klod Tattoo Studio Blazor application.

## Improvements Implemented

### 1. ✅ Absolute URLs for Open Graph Images
- **Issue**: Social media platforms require absolute URLs for OG images
- **Solution**: `AbsoluteImageUrl` property automatically converts relative URLs to absolute
- **Example**: `/images/og-image.jpg` → `https://yourdomain.com/images/og-image.jpg`

### 2. ✅ Robust Locale Detection
- **Issue**: Previous logic using `path.Contains("de")` could match unintended paths
- **Solution**: Parse URL segments and check first segment explicitly
- **Example**: `/de/services` ✓ detected, `/order/delete` ✗ not falsely detected

### 3. ✅ Multilingual Alternate Links (hreflang)
- **Purpose**: Tells search engines about alternate language versions
- **Implementation**: `GetAlternateUrl()` generates proper URLs for en/de/it
- **SEO Benefit**: Prevents duplicate content penalties, improves international rankings

### 4. ✅ Schema.org with Absolute URLs
- The structured data now uses `AbsoluteImageUrl` for proper image references

---

## Usage Examples

### Basic Usage (Default Values)
```razor
@page "/services"
@using Components

<MetaTags />

<h1>Our Services</h1>
<!-- Your page content -->
```

### Custom Title & Description
```razor
@page "/portfolio"
@using Components

<MetaTags 
    Title="Tattoo Portfolio - Klod Tattoo Studio"
    Description="Browse our collection of realistic, traditional, and blackwork tattoos. Professional custom designs."
    Keywords="tattoo portfolio, tattoo gallery, realistic tattoo examples, custom tattoo designs" />

<h1>Portfolio</h1>
<!-- Your page content -->
```

### Custom Image for Specific Page
```razor
@page "/booking"
@using Components

<MetaTags 
    Title="Book Your Tattoo Appointment - Klod Tattoo Studio"
    Description="Schedule your custom tattoo session in Obernburg am Main. Expert artist specializing in realistic and traditional styles."
    ImageUrl="/images/booking-og.jpg" />

<h1>Booking</h1>
<!-- Your page content -->
```

### Using Absolute External Image
```razor
@page "/special-promotion"
@using Components

<MetaTags 
    Title="Special Promotion - Klod Tattoo Studio"
    Description="Limited time offer on custom tattoo designs!"
    ImageUrl="https://cdn.example.com/special-promo.jpg" />

<h1>Special Promotion</h1>
<!-- Your page content -->
```

---

## URL Structure for Language Routing

The component expects URLs structured as:

```
https://yourdomain.com/          → English (default)
https://yourdomain.com/en/       → English (explicit)
https://yourdomain.com/de/       → German
https://yourdomain.com/it/       → Italian

https://yourdomain.com/de/portfolio     → German portfolio
https://yourdomain.com/it/services      → Italian services
```

### Generated Alternate Links Example

For a page at `/de/services`, the component generates:
```html
<link rel="alternate" hreflang="en" href="https://yourdomain.com/services" />
<link rel="alternate" hreflang="de" href="https://yourdomain.com/de/services" />
<link rel="alternate" hreflang="it" href="https://yourdomain.com/it/services" />
<link rel="alternate" hreflang="x-default" href="https://yourdomain.com/services" />
```

---

## Integration Checklist

- [ ] Add `@using Components` to `_Imports.razor` (or use full namespace)
- [ ] Create `/wwwroot/images/og-image.jpg` (recommended size: 1200x630px)
- [ ] Add `<MetaTags />` to each page component
- [ ] Customize Title, Description, Keywords per page
- [ ] Set up language routing if using multilingual support
- [ ] Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Testing Your Meta Tags

### 1. View in Browser DevTools
```
F12 → Elements tab → <head> section
```

### 2. Facebook Open Graph Debugger
```
https://developers.facebook.com/tools/debug/
```
Enter your URL and click "Scrape Again" to refresh cache

### 3. Twitter Card Validator
```
https://cards-dev.twitter.com/validator
```

### 4. Google Rich Results Test
```
https://search.google.com/test/rich-results
```
Test the Schema.org structured data

---

## Parameters Reference

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `Title` | string | "Klod Tattoo Studio - Professional Tattoo Art in Obernburg" | Page title (browser tab, search results, social shares) |
| `Description` | string | See component | Meta description for SEO and social shares |
| `Keywords` | string | See component | SEO keywords (less important for modern search, but included) |
| `ImageUrl` | string | "/images/og-image.jpg" | Image for social sharing (auto-converts to absolute URL) |

---

## Next Steps

1. **Add to _Imports.razor** for global access:
   ```razor
   @using Components
   ```

2. **Update existing pages** to include the component

3. **Create page-specific OG images** for better social sharing

4. **Configure localization service** if implementing multi-language routing

5. **Verify deployment** with testing tools after going live
