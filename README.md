# ✦ ATELIER NOIR — Luxury Fashion Shopify OS 2.0 Storefront

[![Shopify Online Store 2.0](https://img.shields.io/badge/Shopify-Online%20Store%202.0-7AB55C?logo=shopify&logoColor=white)](https://shopify.dev/docs/themes)
[![Liquid Architecture](https://img.shields.io/badge/Liquid-Custom%20Sections-4b6cb7)](https://shopify.dev/docs/api/liquid)
[![Lighthouse Speed](https://img.shields.io/badge/Core%20Web%20Vitals-90%2B-008060)](https://pagespeed.web.dev/)
[![Third-Party App Bloat](https://img.shields.io/badge/App%20Dependency-0%20Apps%20(Pure%20Liquid)-black)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray.svg)](LICENSE.md)

> **Live Demo Store:** [https://atelier-noir-fashion.myshopify.com](https://atelier-noir-fashion.myshopify.com)  
> **Role:** Shopify Theme Developer & E-Commerce CRO Specialist  
> **Industry:** High-End Contemporary Fashion & Luxury Apparel  
> **Tech Stack:** Shopify CLI 5.x, Liquid, Modern Vanilla JavaScript (ES6+), CSS Grid/Flexbox, Shopify AJAX Cart API  

---

## 🌟 Executive Summary

**Atelier Noir** is a production-ready, custom-engineered Shopify storefront built to emulate the caliber of elite fashion houses (*Fear of God, Acne Studios, Totême, Jacquemus*). 

The primary architectural objective was **Zero App Bloat**: delivering advanced e-commerce functionality (*dynamic free shipping goal meters, visual color swatches, interactive size measurement modals, editorial ensemble showcases, and sticky mobile conversion bars*) natively in **clean Liquid and vanilla JavaScript**, eliminating recurring app monthly fees ($200+/month) while securing near-perfect **Google Core Web Vitals** scores.

---

## ⚡ Core Technical Features & CRO Highlights

### 1. High-AOV AJAX Cart Drawer
* **Dynamic Free Shipping Meter (`snippets/cart-free-shipping-bar.liquid`):** Calculates remaining checkout value in real-time. Unlocks an animated celebration banner when the threshold ($150.00) is reached.
* **Instant AJAX Controls:** Fluid quantity adjustments and line-item removals powered by Shopify Section Rendering API with zero page reload.
* **Configurable Threshold:** Merchant-editable directly within Shopify Theme Settings (`Settings -> Cart`).

### 2. Enhanced High-Fashion Product Detail Page (PDP)
* **Uniform 3:4 Portrait Media Gallery:** Custom stacked layout with subtle hover zoom (`scale(1.03)`), eliminating awkward stretching or mismatched image heights.
* **Interactive Size Guide Modal (`snippets/size-guide-modal.liquid`):**
  * Auto-portaled to `document.body` to guarantee 100% viewport centering across all mobile and desktop devices.
  * Instant **Centimeters (CM) vs. Inches (IN)** unit converter toggle.
  * Click-outside backdrop dismissal with background blur.
* **Variant Color Swatches:** Dynamic color selection with selected state indicators.
* **Luxury Accordion Disclosures:** Tabbed specifications for *Fabric & Material Architecture* (520GSM Italian Wool), *Fit & Proportions*, and *Complimentary Global Shipping*.
* **Sticky Mobile Add-to-Cart Bar (`snippets/sticky-add-to-cart.liquid`):** Slides into view via IntersectionObserver as the shopper scrolls past the primary CTA, driving mobile conversion rate (CRO).

### 3. Curated Homepage Sections (Online Store 2.0)
* **Cinematic Fashion Hero Banner (`sections/fashion-hero.liquid`):** Full-bleed responsive visual with `fetchpriority="high"`, editorial typography, collection drop metadata, and dual CTAs.
* **Curated Wardrobe Showcase (`sections/fashion-product-grid.liquid`):** 4-column luxury grid featuring secondary image hover transitions, color dot previews, and 1-click Quick Add.
* **Editorial Spotlight Ensemble (`sections/editorial-spotlight.liquid`):** Magazine-style split showcase connecting a runway campaign visual with a detailed breakdown of the 3 pieces worn by the model.
* **Brand Philosophy & Craftsmanship Pillars (`sections/fashion-ethos.liquid`):** Editorial storytelling on custom-milled Japanese cotton and 150-piece micro-batch discipline.
* **Infinite Marquee Announcement Ticker (`sections/announcement-marquee.liquid`):** Hardware-accelerated CSS scrolling ticker with pause-on-hover and speed controls.
* **Editorial Acclaim (`sections/fashion-press.liquid`):** Clean press endorsement cards citing *VOGUE, GQ, and HIGHSNOBIETY*.

### 4. Comprehensive Multi-Page Store Experience
* **Client Concierge Page (`templates/page.contact.json` & `sections/fashion-contact.liquid`):** 2-column layout showcasing Paris flagship & Tokyo showroom locations, direct departmental emails, operating hours, and a native Shopify form with inquiry classification.
* **Brand Manifesto Page (`templates/page.about.json` & `sections/fashion-about.liquid`):** Brand storytelling archive highlighting workshop craftsmanship and sustainable manufacturing.
* **Multi-Tier Navigation (`snippets/header-dropdown-menu.liquid` & `snippets/header-drawer.liquid`):** Rich dropdown navigation for desktop and responsive slide-out drawer for mobile.

---

## 📊 Performance & Core Web Vitals Optimization

| Optimization Metric | Implementation | Business Impact |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `<link rel="preconnect">` for CDN assets + `fetchpriority="high"` on Hero banner | Cuts initial rendering delay by ~250ms+ |
| **CLS (Cumulative Layout Shift)** | Strict `aspect-ratio: 3/4` on all product cards and media galleries | Zero visual jumps during image load (**CLS: 0.00**) |
| **Zero Render-Blocking JS** | Native ES6 modules, zero jQuery, deferred scripts | Eliminates main thread execution bottlenecks |
| **SEO & Social Metadata** | Custom Open Graph (`og:image`) fallback tags in `snippets/meta-tags.liquid` | High-fidelity rich cards when shared on socials |

---

## 📁 Repository Directory Structure

```text
├── assets/
│   ├── component-card.css         # Uniform 3:4 portrait card styling & hover scaling
│   ├── section-main-product.css   # Stacked PDP gallery & luxury typography
│   └── cart-drawer.js             # AJAX cart rendering & drawer management
├── config/
│   ├── settings_data.json         # Architectural theme presets & typography
│   └── settings_schema.json       # Added free shipping threshold setting
├── layout/
│   └── theme.liquid               # Core HTML shell with preconnect resource hints
├── sections/
│   ├── announcement-marquee.liquid # Infinite hardware-accelerated ticker
│   ├── editorial-spotlight.liquid  # Split-screen Runway Ensemble lookbook
│   ├── fashion-about.liquid        # Brand story & craftsmanship pillars
│   ├── fashion-contact.liquid      # 2-column showroom concierge & inquiry form
│   ├── fashion-ethos.liquid        # Material purity & textile manifesto
│   ├── fashion-hero.liquid         # High-fashion cinematic hero banner
│   ├── fashion-press.liquid        # Press review quotes (Vogue, GQ)
│   └── fashion-product-grid.liquid # 4-column luxury garment showcase
├── snippets/
│   ├── buy-buttons.liquid          # Active AJAX Add to Bag button
│   ├── card-product.liquid         # AW26 collection badges & hover transitions
│   ├── cart-free-shipping-bar.liquid # Animated free shipping goal meter
│   ├── header-dropdown-menu.liquid # Boutique navigation with dropdowns
│   ├── header-drawer.liquid        # Mobile drawer navigation
│   ├── size-guide-modal.liquid     # CM/Inches unit converter (dead-centered)
│   └── sticky-add-to-cart.liquid   # Mobile floating bottom CTA bar
├── templates/
│   ├── index.json                  # Dynamic homepage sections sequence
│   ├── product.json                # PDP template with accordion specification tabs
│   ├── collection.json             # 3-column portrait product grid
│   ├── page.about.json             # Brand manifesto template
│   └── page.contact.json           # Client concierge template
└── atelier_noir_products.csv       # Pre-seeded luxury fashion catalog CSV
```

---

## 🛠️ Local Development & Deployment

This project uses the official **Shopify CLI 5.x**:

```bash
# 1. Install dependencies
npm install

# 2. Start local development server with Live Reload
npm run dev -- --store your-store.myshopify.com

# 3. Validate theme code quality
npm run check

# 4. Push updates to live theme
npm run push -- --store your-store.myshopify.com --theme <THEME_ID> --allow-live
```

---

## 👤 Author & Inquiries

**Shopify Theme Developer & Technical Liquid Specialist**  
Available for custom Shopify Plus theme development, headless architectures, and e-commerce CRO audits.
