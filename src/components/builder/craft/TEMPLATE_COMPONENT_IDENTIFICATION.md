# Component Identification Guide for Template Developers

This document describes the strict rules for identifying components in Craft.js JSON templates. Following these rules ensures that the editor's toolbar, indicators, and behavior work correctly.

## ⚠️ CRITICAL: isSection Flag

**ALL sections MUST have `custom.isSection: true`**
**ALL elements MUST have `custom.isSection: false`**

This is the most reliable way to identify components. Without this flag, the editor may not correctly identify your components.

## Overview

The editor distinguishes between two main component categories:
1. **Sections** - Full-width layout blocks (header, hero, features, footer, etc.)
2. **Elements** - Individual UI components (text, button, image, container, etc.)

Each category has different toolbar behavior and capabilities.

---

## Section Identification

A component is identified as a **SECTION** if ANY of the following conditions are true (checked in order):

### 1. ✅ Explicit Section Flag (RECOMMENDED - MOST RELIABLE)
```json
{
  "custom": {
    "isSection": true
  }
}
```
**This is the preferred method.** Always set this for sections.

If `isSection: false` is set, the component will NEVER be treated as a section.

### 2. Type Resolution
```json
{
  "type": { "resolvedName": "Section" }
}
```
or
```json
{
  "type": { "resolvedName": "Root" }
}
```

### 3. Component Type Identifier (Exact Match Only)
```json
{
  "custom": {
    "componentType": "section" | "header" | "footer" | "navbar" | "hero" | "cta" | "features" | "navigation" | "banner"
  }
}
```
**Note:** This must be an EXACT match, not a substring.

### ❌ Display Name is NOT Used
We do NOT check displayName for section keywords because it's error-prone.
For example, "CTA Button" contains "cta" but is NOT a section.

**Always use `isSection: true/false` to be explicit.**

---

## Section Type Examples

### Basic Section
```json
{
  "hero-section": {
    "type": { "resolvedName": "Section" },
    "isCanvas": true,
    "props": {
      "background": "#ffffff",
      "padding": "60px 20px"
    },
    "displayName": "Section",
    "custom": {
      "displayName": "Hero Section",
      "componentType": "hero",
      "isSection": true
    },
    "parent": "ROOT",
    "nodes": ["hero-title", "hero-button"]
  }
}
```

### Navbar Section (with settings icon)
```json
{
  "navbar": {
    "type": { "resolvedName": "Section" },
    "isCanvas": true,
    "props": {
      "background": "#1e293b"
    },
    "displayName": "Section",
    "custom": {
      "displayName": "Navbar",
      "componentType": "navbar",
      "isSection": true
    },
    "parent": "ROOT",
    "nodes": ["logo", "nav-links"]
  }
}
```

### Footer Section (with settings icon)
```json
{
  "footer": {
    "type": { "resolvedName": "Section" },
    "isCanvas": true,
    "props": {
      "background": "#0f172a"
    },
    "displayName": "Section",
    "custom": {
      "displayName": "Footer",
      "componentType": "footer",
      "isSection": true
    },
    "parent": "ROOT",
    "nodes": ["footer-content"]
  }
}
```

---

## Special Section Types (Show Settings Icon)

The following section types will display a **Settings** icon in the toolbar:

| componentType | Description |
|---------------|-------------|
| `navbar` | Navigation bar |
| `navigation` | Navigation section |
| `header` | Page header |
| `footer` | Page footer |
| `product` | Product listing/details |
| `contact` | Contact form section |
| `carousel` | Image/content carousel |

### Example with Settings
```json
{
  "contact-section": {
    "type": { "resolvedName": "Section" },
    "custom": {
      "displayName": "Contact Form",
      "componentType": "contact",
      "isSection": true
    },
    "parent": "ROOT",
    "nodes": ["form"]
  }
}
```

---

## Element Identification

A component is identified as an **ELEMENT** if:
1. It does NOT match any section identification rules
2. Its `type.resolvedName` is one of: `Text`, `Button`, `Image`, `Container`, `Card`, etc.

### Element Examples

#### Text Element
```json
{
  "heading": {
    "type": { "resolvedName": "Text" },
    "isCanvas": false,
    "props": {
      "text": "Welcome",
      "fontSize": 48,
      "fontWeight": 700
    },
    "displayName": "Text",
    "custom": {
      "displayName": "Hero Title"
    },
    "parent": "hero-section",
    "nodes": []
  }
}
```

#### Button Element
```json
{
  "cta-button": {
    "type": { "resolvedName": "Button" },
    "isCanvas": false,
    "props": {
      "text": "Get Started",
      "background": "#3b82f6"
    },
    "displayName": "Button",
    "custom": {
      "displayName": "CTA Button"
    },
    "parent": "hero-section",
    "nodes": []
  }
}
```

#### Container Element (NOT a section)
```json
{
  "card-container": {
    "type": { "resolvedName": "Container" },
    "isCanvas": true,
    "props": {
      "background": "#ffffff",
      "padding": 20
    },
    "displayName": "Container",
    "custom": {
      "displayName": "Feature Card"
    },
    "parent": "features-section",
    "nodes": ["card-title", "card-description"]
  }
}
```

---

## Toolbar Behavior Summary

### Section Toolbar (Inside Selection)
- Position: Top-left corner, inside the selection border
- Shows: Move Up, Move Down, Replace, Duplicate, Settings*, Delete, More
- *Settings only for: navbar, footer, product, contact, carousel

### Element Toolbar (Outside Selection)
- Position: Above the element, outside the selection border
- Shows: Move Left, Move Right, Link, Resize, Duplicate, Delete, More

### Add Section Buttons
- Only appear for **SECTIONS** (never for elements)
- Top button: Hidden if first section AND is navbar/header
- Bottom button: Hidden if last section AND is footer

---

## Required Custom Properties

For best results, always include these in the `custom` object:

```json
{
  "custom": {
    "displayName": "Human Readable Name",  // Required: Shows in toolbar
    "componentType": "type-identifier",     // Recommended: For section identification
    "isSection": true | false               // Optional: Explicit section flag
  }
}
```

---

## Complete Example Template

```json
{
  "ROOT": {
    "type": { "resolvedName": "Root" },
    "isCanvas": true,
    "props": { "background": "#ffffff" },
    "displayName": "Root",
    "custom": { "displayName": "Page" },
    "nodes": ["navbar", "hero", "features", "footer"]
  },
  "navbar": {
    "type": { "resolvedName": "Section" },
    "isCanvas": true,
    "custom": {
      "displayName": "Navbar",
      "componentType": "navbar",
      "isSection": true
    },
    "parent": "ROOT",
    "nodes": ["logo", "nav-links"]
  },
  "hero": {
    "type": { "resolvedName": "Section" },
    "isCanvas": true,
    "custom": {
      "displayName": "Hero Section",
      "componentType": "hero",
      "isSection": true
    },
    "parent": "ROOT",
    "nodes": ["hero-title", "hero-button"]
  },
  "hero-title": {
    "type": { "resolvedName": "Text" },
    "isCanvas": false,
    "props": { "text": "Welcome", "fontSize": 48 },
    "custom": { "displayName": "Hero Title" },
    "parent": "hero",
    "nodes": []
  },
  "hero-button": {
    "type": { "resolvedName": "Button" },
    "isCanvas": false,
    "props": { "text": "Get Started" },
    "custom": { "displayName": "CTA Button" },
    "parent": "hero",
    "nodes": []
  },
  "features": {
    "type": { "resolvedName": "Section" },
    "isCanvas": true,
    "custom": {
      "displayName": "Features Section",
      "componentType": "features",
      "isSection": true
    },
    "parent": "ROOT",
    "nodes": ["feature-grid"]
  },
  "footer": {
    "type": { "resolvedName": "Section" },
    "isCanvas": true,
    "custom": {
      "displayName": "Footer",
      "componentType": "footer",
      "isSection": true
    },
    "parent": "ROOT",
    "nodes": ["footer-content"]
  }
}
```

---

## Validation Checklist

Before publishing a template, verify:

- [ ] All sections have `custom.isSection: true` or `custom.componentType` set
- [ ] All sections have a meaningful `custom.displayName`
- [ ] Navbar/Header is the first child of ROOT
- [ ] Footer is the last child of ROOT
- [ ] All elements have appropriate `displayName` values
- [ ] No elements incorrectly marked as sections
- [ ] All nodes have proper parent references
