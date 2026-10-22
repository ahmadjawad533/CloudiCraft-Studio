# CloudiCraft Studio: Cloudinary Media Suite and Developer Playground

An interactive full-stack workbench for building, inspecting, comparing, and benchmarking Cloudinary media transformation pipelines.

## Capabilities

- **Server-Side Signed Uploads**: Direct streaming upload to Cloudinary with secure credential isolation (API key and secret kept server-side in environment variables).
- **Subject and Face Auto-Cropping (g_auto)**: Social media presets (1:1, 9:16, 16:9, 4:5) powered by Cloudinary AI gravity.
- **Visual Enhancements**: Auto color balancing (e_improve), sharpen, vignette, Gaussian blur, and contrast adjustments.
- **Dynamic Branding Layers**: Text overlays (l_text) with font customization, gravity positioning, and adjustable opacity.
- **Video Processing Pipeline**: Generate 4-second animated GIF previews (so_0,du_4,f_gif) and video poster thumbnails (so_auto,f_jpg).
- **Bandwidth Impact Measurement**: Real-time calculation of byte savings using Cloudinary automatic format and quality delivery (f_auto, q_auto).
- **Cloudinary URL Inspector**: Structural breakdown explaining every transformation segment in the delivery URL.
- **Multi-Language SDK Generator**: Copyable integration snippets for Node.js SDK v2, Python SDK, React, and cURL.
- **Cloud Media Library**: Browse, preview, inspect, and delete assets stored in the Cloudinary cloud.

## Architecture

```
                       +-----------------------------------------------+
                       |               CloudiCraft Studio               |
                       +-----------------------+-----------------------+
                                               |
                       +-----------------------+-----------------------+
                       |                                               |
             Frontend (Port 3000)                             Backend (Port 5001)
     React 18 + Vite + Tailwind CSS                   Node.js + Express + Multer
     - Real-time comparison slider                    - Cloudinary SDK v2
     - Transformation URL inspector                   - Authenticated upload stream
     - Multi-SDK code generator                       - Usage and media API
                       |                                               |
                       +-----------------------+-----------------------+
                                               |
                              Cloudinary Cloud Platform
                                (Cloud: yq115gst)
                                - Signed uploads
                                - Smart AI gravity (g_auto)
                                - Dynamic layers and overlays
                                - Global CDN delivery
```

## Quick Start

### 1. Prerequisites
- Node.js v18 or later
- Cloudinary Account (credentials configured in `server/.env`)

### 2. Installation
Install all dependencies for both backend and frontend:
```bash
npm run install:all
```

### 3. Environment Configuration
Verify your `server/.env` contains your Cloudinary credentials:
```env
PORT=5001
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 4. Running the Project

Start the backend server:
```bash
npm run server
```

In a second terminal, start the frontend:
```bash
npm run client
```

Open your browser at `http://localhost:3000`.

## Transformation Examples

| Feature | Cloudinary URL Parameter | Description |
|---|---|---|
| Auto-Crop | `c_fill,w_800,h_800,g_auto` | AI detects faces or primary subjects and crops to 1:1 square |
| Color Enhancement | `e_improve` | Automatically optimizes colors, exposure, and contrast |
| Edge Sharpening | `e_sharpen:150` | Clarifies high-frequency details |
| Dynamic Watermark | `l_text:Arial_32_bold:Watermark,g_south_east,o_80` | Overlays stylized text at bottom right |
| Video to GIF | `so_0,du_4,c_scale,w_600/f_gif` | Extracts first 4 seconds of video into an animated GIF |
| Codec Optimization | `f_auto,q_auto` | Delivers optimal modern format (AVIF or WebP) with perceptual compression |

## Project Structure

```
cloudinary/
├── client/                     # Frontend Application
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── icon.svg
│   │   ├── apple-touch-icon.png
│   │   ├── manifest.webmanifest
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/
│   │   │   ├── BeforeAfterSlider.jsx       # Split comparison viewer
│   │   │   ├── CodeGenerator.jsx           # Node.js, Python, React, cURL snippets
│   │   │   ├── Header.jsx                  # Top navigation and cloud status
│   │   │   ├── MediaUploader.jsx           # Upload dropzone
│   │   │   ├── PerformanceCard.jsx         # Bandwidth savings metrics
│   │   │   ├── RecentAssets.jsx            # Cloud media gallery
│   │   │   ├── TransformationControls.jsx  # Controls for crop, filters, overlays
│   │   │   └── UrlInspector.jsx            # Breakdown of Cloudinary URLs
│   │   ├── pages/
│   │   │   ├── PrivacyPolicy.jsx           # Privacy policy draft
│   │   │   └── Terms.jsx                   # Terms and conditions draft
│   │   ├── utils/
│   │   │   └── cloudinary.js               # URL builder and SDK snippet generator
│   │   ├── App.jsx                         # Main workbench layout and routes
│   │   ├── index.css                       # Flat Tailwind styling
│   │   └── main.jsx                        # React root entry
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Backend API
│   ├── server.js               # Express API with Cloudinary SDK v2
│   ├── .env                    # Cloudinary credentials
│   └── package.json
├── vercel.json                 # Vercel multi-service configuration
├── package.json                # Root orchestrator
└── README.md                   # Documentation
```
