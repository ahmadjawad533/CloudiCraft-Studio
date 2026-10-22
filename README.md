# ☁️ CloudiCraft Studio — Cloudinary AI Media Suite & Developer Playground

> **Built for the Cloudinary Creator Community**  
> An interactive full-stack application showcasing advanced Cloudinary API transformations, smart AI gravity auto-cropping, dynamic branding overlays, video-to-GIF processing, real-time URL inspection, and multi-language SDK code generation.

---

## 🌟 Highlights & Key Capabilities

- **🚀 Server-Side Signed Uploads**: Direct streaming upload to Cloudinary with secure credential isolation (`CLOUDINARY_API_KEY` & `CLOUDINARY_API_SECRET` kept server-side in `.env`).
- **🎯 Smart Subject & Face Auto-Cropping (`g_auto`)**: Social media presets (Instagram 1:1, TikTok/Reels 9:16, YouTube 16:9, Portrait 4:5) powered by Cloudinary's AI gravity engine.
- **✨ AI Visual Enhancements & Filters**: Auto color-balancing (`e_improve`), ultra-sharpen, vignette, Gaussian blur, and futuristic dual-tint styling.
- **🏷️ Dynamic Branding & Watermark Layers**: Dynamic text overlays (`l_text:`, font customization, gravity positioning, and adjustable opacity).
- **🎬 Cloudinary Video Pipeline**: Generate 4-second animated GIF previews (`so_0,du_4,f_gif`) and smart video poster thumbnails (`so_auto,f_jpg`).
- **⚡ Bandwidth & Speed Impact Calculator**: Real-time measurement of bytes saved and page load speed improvements using Cloudinary's automatic format and quality engine (`f_auto,q_auto`).
- **🔍 Cloudinary URL Inspector**: Educational breakdown explaining every transformation segment in the delivery URL for developers.
- **💻 Multi-Language SDK Generator**: Instant copyable snippets in **Node.js SDK v2**, **Python SDK**, **React (`@cloudinary/url-gen`)**, and **cURL**.
- **🗂️ Cloud Media Library**: Browse, preview, inspect, and delete assets stored in the Cloudinary cloud.

---

## 🏗️ Architecture

```
                       ┌───────────────────────────────────────────────┐
                       │               CloudiCraft Studio               │
                       └───────────────────────┬───────────────────────┘
                                               │
                       ┌───────────────────────┴───────────────────────┐
                       │                                               │
             Frontend (Port 3000)                             Backend (Port 5001)
     React 18 + Vite + Tailwind CSS                   Node.js + Express + Multer
     • Real-time Before/After Slider                  • Cloudinary SDK v2
     • Transformation Inspector & Breakdown           • Authenticated Upload Stream
     • Multi-SDK Code Generator                       • Usage & Media Management API
                       │                                               │
                       └───────────────────────┬───────────────────────┘
                                               │
                              Cloudinary Cloud Platform
                                (Cloud: yq115gst)
                                ├── Signed Uploads
                                ├── Smart AI Gravity (g_auto)
                                ├── Dynamic Layers & Overlays
                                └── Global Fastly/Akamai CDN Delivery
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v20)
- **Cloudinary Account** (credentials configured in `server/.env`)

### 2. Installation
Install all dependencies for both backend and frontend:
```bash
# In the project root:
npm run install:all
```
*(Or navigate to `server` and `client` individually and run `npm install`)*

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
# Runs Express on http://localhost:5001
```

In a second terminal, start the frontend:
```bash
npm run client
# Runs Vite client on http://localhost:3000
```

Open your browser at **`http://localhost:3000`** to start crafting and transforming media!

---

## 🎨 Transformation Examples

| Feature | Cloudinary URL Transformation Parameter | Description |
|---|---|---|
| **Social Auto-Crop** | `c_fill,w_800,h_800,g_auto` | AI detects faces or primary subjects and crops to 1:1 square |
| **Color AI Enhancement** | `e_improve` | Automatically optimizes colors, exposure, and contrast |
| **Edge Sharpening** | `e_sharpen:150` | Clarifies high-frequency details |
| **Dynamic Watermark** | `l_text:Arial_32_bold:Watermark,g_south_east,o_80` | Overlays stylized text at bottom right |
| **Video to GIF Preview**| `so_0,du_4,c_scale,w_600/f_gif` | Extracts first 4 seconds of video into an animated GIF |
| **Performance Delivery**| `f_auto,q_auto` | Delivers optimal modern format (AVIF/WebP) with perceptual compression |

---

## 📦 Project Structure

```
cloudinary/
├── client/                     # Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── BeforeAfterSlider.jsx       # Interactive split comparison viewer
│   │   │   ├── CodeGenerator.jsx           # Node.js, Python, React, cURL snippets
│   │   │   ├── Header.jsx                  # Top navigation & cloud status badge
│   │   │   ├── MediaUploader.jsx           # Drag-and-drop signed upload zone
│   │   │   ├── PerformanceCard.jsx         # Bandwidth savings & speed metrics
│   │   │   ├── RecentAssets.jsx            # Cloud media gallery
│   │   │   ├── TransformationControls.jsx  # Controls for crop, filters, overlays
│   │   │   └── UrlInspector.jsx            # Visual breakdown of Cloudinary URLs
│   │   ├── utils/
│   │   │   └── cloudinary.js               # URL builder & SDK snippet generator
│   │   ├── App.jsx                         # Main application layout
│   │   ├── index.css                       # Tailwind directives & styles
│   │   └── main.jsx                        # React entrypoint
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Backend API
│   ├── server.js               # Express API with Cloudinary SDK v2
│   ├── .env                    # Cloudinary credentials
│   └── package.json
├── package.json                # Root orchestrator
└── README.md                   # Project documentation & Creator Community guide
```

---

## 🤝 Cloudinary Creator Community Submission Details
- **Project Name**: CloudiCraft Studio
- **Target Audience**: Developers, content creators, media designers, and community members learning Cloudinary.
- **Cloudinary Tech Stack**: Cloudinary Node.js SDK v2, Dynamic URL Transformations, AI Subject Gravity (`g_auto`), Dynamic Text Layers (`l_text`), Video Processing (`f_gif`), and CDN Delivery Optimization (`f_auto,q_auto`).
