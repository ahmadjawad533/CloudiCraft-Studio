const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

app.use(cors());
app.use(express.json());

// In-memory upload handling via multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max
});

/**
 * Health & Usage status
 */
app.get('/api/status', async (req, res) => {
  try {
    const usage = await cloudinary.api.usage();
    res.json({
      success: true,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      plan: usage.plan,
      credits: usage.credits,
      resources: usage.resources,
      objects: usage.objects,
      bandwidth: usage.bandwidth,
      storage: usage.storage,
    });
  } catch (error) {
    console.error('Error fetching Cloudinary usage:', error);
    res.status(500).json({
      success: false,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      error: error.message,
    });
  }
});

/**
 * Upload an image or video asset to Cloudinary
 */
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const isVideo = req.file.mimetype.startsWith('video');
    const resourceType = isVideo ? 'video' : 'image';

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'cloudicraft',
        resource_type: resourceType,
        tags: ['cloudicraft_creator', resourceType],
        transformation: isVideo ? undefined : [{ quality: 'auto' }],
      },
      (error, result) => {
        if (error) {
          console.error('Upload stream error:', error);
          return res.status(500).json({ success: false, error: error.message });
        }
        res.json({
          success: true,
          asset: {
            publicId: result.public_id,
            url: result.secure_url,
            format: result.format,
            bytes: result.bytes,
            width: result.width,
            height: result.height,
            resourceType: result.resource_type,
            createdAt: result.created_at,
          },
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Fetch recent uploaded assets
 */
app.get('/api/resources', async (req, res) => {
  try {
    // Try to search by tag or folder first
    let result = await cloudinary.search
      .expression('folder:cloudicraft OR tags:cloudicraft_creator')
      .sort_by('created_at', 'desc')
      .max_results(24)
      .execute();

    // If empty, fall back to general resources
    if (!result || !result.resources || result.resources.length === 0) {
      const generalImages = await cloudinary.api.resources({
        type: 'upload',
        prefix: '',
        max_results: 12,
      });
      result = { resources: generalImages.resources };
    }

    res.json({
      success: true,
      resources: (result.resources || []).map((r) => ({
        publicId: r.public_id,
        url: r.secure_url,
        format: r.format,
        bytes: r.bytes,
        width: r.width,
        height: r.height,
        resourceType: r.resource_type,
        createdAt: r.created_at,
      })),
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Seed sample assets into Cloudinary if user wants instant samples
 */
app.post('/api/seed-samples', async (req, res) => {
  try {
    const samples = [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        name: 'portrait_model',
        type: 'image',
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        name: 'tropical_beach',
        type: 'image',
      },
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
        name: 'product_sneaker',
        type: 'image',
      },
    ];

    const results = [];
    for (const sample of samples) {
      const uploaded = await cloudinary.uploader.upload(sample.url, {
        folder: 'cloudicraft',
        public_id: sample.name,
        resource_type: sample.type,
        tags: ['cloudicraft_creator', 'sample'],
      });
      results.push({
        publicId: uploaded.public_id,
        url: uploaded.secure_url,
        format: uploaded.format,
        bytes: uploaded.bytes,
        width: uploaded.width,
        height: uploaded.height,
        resourceType: uploaded.resource_type,
        createdAt: uploaded.created_at,
      });
    }

    res.json({ success: true, count: results.length, assets: results });
  } catch (error) {
    console.error('Error seeding samples:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Delete an asset
 */
app.delete('/api/resource', async (req, res) => {
  try {
    const publicId = req.query.publicId || req.body?.publicId;
    if (!publicId) {
      return res.status(400).json({ success: false, error: 'Missing publicId' });
    }
    const resourceType = req.query.type || req.body?.type || 'image';
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`CloudiCraft Studio API server running on http://localhost:${port}`);
});
