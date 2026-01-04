# Field Inspector - Offline Inspection Forms

A Progressive Web App (PWA) for offline field inspections.

## Features

- Fully offline after first load
- Custom form templates with 16+ field types
- Photo capture, GPS, digital signatures
- HTML report generation
- Data export/import as JSON

## Quick Start

```bash
cd FieldInspector
python3 -m http.server 8080
```

Open http://localhost:8080 on your device, then install via Chrome menu.

## Convert to APK

1. Deploy to HTTPS host (GitHub Pages, Netlify, etc.)
2. Go to https://www.pwabuilder.com/
3. Enter your URL and download Android package

## File Structure

- index.html - Main app
- css/styles.css - Styling
- js/*.js - App modules
- sw.js - Service worker for offline
- manifest.json - PWA manifest
- icons/ - App icons
