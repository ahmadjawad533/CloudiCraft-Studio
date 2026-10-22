/**
 * Cloudinary Transformation & Developer Playground Utility
 * Cloud Name: yq115gst
 */

export const CLOUD_NAME = 'yq115gst';
export const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

export const ASPECT_RATIOS = [
  { id: 'original', label: 'Original', ratio: null, desc: 'Keep original proportions' },
  { id: '1:1', label: '1:1 Square', width: 800, height: 800, desc: 'Instagram Post / Profile' },
  { id: '9:16', label: '9:16 Vertical', width: 720, height: 1280, desc: 'Reels / TikTok / Stories' },
  { id: '16:9', label: '16:9 Landscape', width: 1280, height: 720, desc: 'YouTube / Banner' },
  { id: '4:5', label: '4:5 Portrait', width: 800, height: 1000, desc: 'Social Media Portrait' },
  { id: '3:2', label: '3:2 Classic', width: 900, height: 600, desc: 'Classic Photography' },
];

export const FILTERS = [
  { id: 'none', label: 'None', transform: '' },
  { id: 'improve', label: 'AI Auto-Improve', transform: 'e_improve', desc: 'Auto color & contrast balancing' },
  { id: 'sharpen', label: 'Ultra Sharpen', transform: 'e_sharpen:150', desc: 'Enhances fine edges' },
  { id: 'grayscale', label: 'B & W Cinema', transform: 'e_grayscale', desc: 'Crisp black & white' },
  { id: 'sepia', label: 'Vintage Sepia', transform: 'e_sepia', desc: 'Warm nostalgic retro tone' },
  { id: 'vignette', label: 'Dramatic Vignette', transform: 'e_vignette:60', desc: 'Darkened borders focus subject' },
  { id: 'cyberpunk', label: 'Cyberpunk Neon', transform: 'e_tint:100:magenta:00f0ff', desc: 'Futuristic vibrant dual tint' },
  { id: 'warm', label: 'Golden Hour', transform: 'e_tint:40:orange:yellow', desc: 'Warm ambient glow' },
];

/**
 * Builds the transformed Cloudinary URL from options
 */
export function buildTransformedUrl(asset, options = {}) {
  if (!asset || !asset.publicId) return '';

  const isVideo = asset.resourceType === 'video';
  const segments = [];

  // 1. Video-specific: animated preview GIF
  if (isVideo && options.videoMode === 'gif') {
    segments.push('so_0,du_4');
    if (options.aspectRatio && options.aspectRatio !== 'original') {
      const ar = ASPECT_RATIOS.find((r) => r.id === options.aspectRatio);
      if (ar) {
        segments.push(`c_fill,w_${ar.width},h_${ar.height},g_auto`);
      }
    } else {
      segments.push('c_scale,w_600');
    }
    segments.push('f_gif');
    return `${BASE_URL}/video/upload/${segments.join('/')}/${asset.publicId}.gif`;
  }

  // 1b. Video-specific: thumbnail snapshot
  if (isVideo && options.videoMode === 'thumb') {
    segments.push('so_auto');
    if (options.aspectRatio && options.aspectRatio !== 'original') {
      const ar = ASPECT_RATIOS.find((r) => r.id === options.aspectRatio);
      if (ar) {
        segments.push(`c_fill,w_${ar.width},h_${ar.height},g_auto`);
      }
    }
    segments.push('f_auto,q_auto');
    return `${BASE_URL}/video/upload/${segments.join('/')}/${asset.publicId}.jpg`;
  }

  // 2. Cropping & Aspect Ratio with AI Gravity
  if (options.aspectRatio && options.aspectRatio !== 'original') {
    const ar = ASPECT_RATIOS.find((r) => r.id === options.aspectRatio);
    if (ar) {
      const gravity = options.gravity || 'auto';
      segments.push(`c_fill,w_${ar.width},h_${ar.height},g_${gravity}`);
    }
  }

  // 3. AI / Visual Effects & Filters
  if (options.filter && options.filter !== 'none') {
    const f = FILTERS.find((item) => item.id === options.filter);
    if (f && f.transform) {
      segments.push(f.transform);
    }
  }

  // 4. Background Blur
  if (options.blur && options.blur > 0) {
    segments.push(`e_blur:${options.blur * 10}`);
  }

  // 5. Dynamic Watermark / Text Overlay
  if (options.watermarkText && options.watermarkText.trim().length > 0) {
    const cleanText = encodeURIComponent(options.watermarkText.trim());
    const fontSize = options.watermarkSize || 32;
    const gravity = options.watermarkPos || 'south_east';
    const opacity = options.watermarkOpacity || 80;
    segments.push(`l_text:Arial_${fontSize}_bold:${cleanText},g_${gravity},x_25,y_25,co_rgb:ffffff,o_${opacity}`);
  }

  // 6. Quality and Format Optimization (Cloudinary best practice)
  const format = options.format || 'auto';
  const quality = options.quality || 'auto';
  segments.push(`f_${format},q_${quality}`);

  const resourceType = asset.resourceType || 'image';
  const segmentString = segments.length > 0 ? `${segments.join('/')}/` : '';

  return `${BASE_URL}/${resourceType}/upload/${segmentString}${asset.publicId}`;
}

/**
 * Returns an educational breakdown of URL segments for the URL Inspector
 */
export function explainTransformations(options = {}, asset = {}) {
  const isVideo = asset.resourceType === 'video';
  const items = [];

  if (isVideo && options.videoMode === 'gif') {
    items.push({
      tag: 'so_0,du_4,f_gif',
      name: 'Video to Animated GIF',
      description: 'Captures first 4 seconds starting at 0s and converts video stream into animated lightweight GIF.',
      category: 'Video',
    });
  }

  if (options.aspectRatio && options.aspectRatio !== 'original') {
    const ar = ASPECT_RATIOS.find((r) => r.id === options.aspectRatio);
    const gravity = options.gravity || 'auto';
    items.push({
      tag: `c_fill,w_${ar.width},h_${ar.height},g_${gravity}`,
      name: `Smart Auto-Crop (${ar.label})`,
      description: `Crops to exact dimensions (${ar.width}x${ar.height}) while AI gravity (${gravity}) centers faces or focal subjects.`,
      category: 'Cropping',
    });
  }

  if (options.filter && options.filter !== 'none') {
    const f = FILTERS.find((item) => item.id === options.filter);
    if (f) {
      items.push({
        tag: f.transform,
        name: f.label,
        description: f.desc,
        category: 'Filter & Effects',
      });
    }
  }

  if (options.blur && options.blur > 0) {
    items.push({
      tag: `e_blur:${options.blur * 10}`,
      name: 'Gaussian Blur',
      description: `Applies a ${options.blur * 10}px Gaussian blur to soften the media.`,
      category: 'Filter & Effects',
    });
  }

  if (options.watermarkText && options.watermarkText.trim().length > 0) {
    items.push({
      tag: `l_text:..._bold:${encodeURIComponent(options.watermarkText)}`,
      name: 'Dynamic Text Overlay',
      description: `Cloudinary dynamically renders a crisp typography layer positioned at ${options.watermarkPos || 'south_east'}.`,
      category: 'Branding',
    });
  }

  items.push({
    tag: `f_${options.format || 'auto'},q_${options.quality || 'auto'}`,
    name: 'Automatic Format & Quality (f_auto, q_auto)',
    description: 'Cloudinary delivers modern codecs (AVIF/WebP) tailored to user browser with optimal perceptual compression.',
    category: 'Optimization',
  });

  return items;
}

/**
 * Generates developer SDK snippets for this exact transformation
 */
export function generateCodeSnippets(publicId, options = {}, asset = {}) {
  const isVideo = asset.resourceType === 'video';
  const ar = ASPECT_RATIOS.find((r) => r.id === options.aspectRatio);

  // Node.js snippet
  const nodeSnippet = `// Node.js - Cloudinary SDK v2
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: '${CLOUD_NAME}',
  secure: true
});

const deliveryUrl = cloudinary.url('${publicId}', {
  resource_type: '${isVideo ? 'video' : 'image'}',
  transformation: [
${ar && ar.ratio !== null ? `    { width: ${ar.width}, height: ${ar.height}, crop: 'fill', gravity: '${options.gravity || 'auto'}' },\n` : ''}${options.filter && options.filter !== 'none' ? `    { effect: '${options.filter === 'improve' ? 'improve' : options.filter}' },\n` : ''}${options.watermarkText ? `    { overlay: { font_family: 'Arial', font_size: ${options.watermarkSize || 32}, font_weight: 'bold', text: '${options.watermarkText}' }, gravity: '${options.watermarkPos || 'south_east'}', opacity: ${options.watermarkOpacity || 80} },\n` : ''}    { quality: '${options.quality || 'auto'}', fetch_format: '${options.format || 'auto'}' }
  ]
});

console.log('Optimized CDN URL:', deliveryUrl);`;

  // Python snippet
  const pythonSnippet = `# Python - cloudinary SDK
import cloudinary
import cloudinary.uploader
import cloudinary.utils

cloudinary.config(
    cloud_name="${CLOUD_NAME}",
    secure=True
)

url, options = cloudinary.utils.cloudinary_url(
    "${publicId}",
    resource_type="${isVideo ? 'video' : 'image'}",
    transformation=[
${ar && ar.ratio !== null ? `        {"width": ${ar.width}, "height": ${ar.height}, "crop": "fill", "gravity": "${options.gravity || 'auto'}"},\n` : ''}${options.filter && options.filter !== 'none' ? `        {"effect": "${options.filter}"},\n` : ''}        {"quality": "${options.quality || 'auto'}", "fetch_format": "${options.format || 'auto'}"}
    ]
)

print("Generated URL:", url)`;

  // React snippet
  const reactSnippet = `// React - Cloudinary React Component
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

const cld = new Cloudinary({ cloud: { cloudName: '${CLOUD_NAME}' } });

export function CreatorMedia() {
  const myMedia = cld.image('${publicId}')
    .resize(fill().width(${ar ? ar.width : 800}).height(${ar ? ar.height : 800}).gravity(autoGravity()))
    .delivery(format('auto'))
    .delivery(quality('auto'));

  return <AdvancedImage cldImg={myMedia} className="rounded-xl shadow-lg" />;
}`;

  // cURL snippet
  const directUrl = buildTransformedUrl(asset, options);
  const curlSnippet = `# Fetch the optimized asset headers & verify AVIF/WebP delivery
curl -I "${directUrl}"`;

  return {
    node: nodeSnippet,
    python: pythonSnippet,
    react: reactSnippet,
    curl: curlSnippet,
  };
}
