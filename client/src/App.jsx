import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MediaUploader from './components/MediaUploader';
import TransformationControls from './components/TransformationControls';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import UrlInspector from './components/UrlInspector';
import CodeGenerator from './components/CodeGenerator';
import PerformanceCard from './components/PerformanceCard';
import RecentAssets from './components/RecentAssets';
import { buildTransformedUrl } from './utils/cloudinary';
import { Sparkles, Layers, Sliders, PlayCircle } from 'lucide-react';

const DEFAULT_OPTIONS = {
  aspectRatio: 'original',
  gravity: 'auto',
  filter: 'none',
  blur: 0,
  watermarkText: '',
  watermarkPos: 'south_east',
  watermarkSize: 32,
  watermarkOpacity: 80,
  format: 'auto',
  quality: 'auto',
  videoMode: 'video',
};

export default function App() {
  const [status, setStatus] = useState(null);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [isUploading, setIsUploading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial account info and assets
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statusRes, resourcesRes] = await Promise.all([
        fetch('/api/status').then((r) => r.json()),
        fetch('/api/resources').then((r) => r.json()),
      ]);

      if (statusRes.success) {
        setStatus(statusRes);
      }

      if (resourcesRes.success && resourcesRes.resources?.length > 0) {
        setAssets(resourcesRes.resources);
        if (!selectedAsset) {
          setSelectedAsset(resourcesRes.resources[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching initial data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle seeding sample assets
  const handleSeedSamples = async () => {
    setIsSeeding(true);
    try {
      const res = await fetch('/api/seed-samples', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.assets?.length > 0) {
        setAssets((prev) => [...data.assets, ...prev]);
        setSelectedAsset(data.assets[0]);
      }
    } catch (err) {
      console.error('Failed to seed sample assets:', err);
    } finally {
      setIsSeeding(false);
    }
  };

  // Handle asset upload completion
  const handleAssetUploaded = (newAsset) => {
    setAssets((prev) => [newAsset, ...prev]);
    setSelectedAsset(newAsset);
    setOptions(DEFAULT_OPTIONS);
  };

  // Handle asset delete
  const handleDeleteAsset = async (publicId, type) => {
    try {
      const res = await fetch(`/api/resource?publicId=${encodeURIComponent(publicId)}&type=${type}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        const remaining = assets.filter((a) => a.publicId !== publicId);
        setAssets(remaining);
        if (selectedAsset?.publicId === publicId) {
          setSelectedAsset(remaining[0] || null);
        }
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleResetOptions = () => {
    setOptions(DEFAULT_OPTIONS);
  };

  const transformedUrl = selectedAsset
    ? buildTransformedUrl(selectedAsset, options)
    : '';

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Header
        status={status}
        onSeedSamples={handleSeedSamples}
        isSeeding={isSeeding}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner for Cloudinary Creator Community */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-900/30 via-indigo-950/20 to-cyan-950/20 border border-blue-500/20 overflow-hidden shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project for Cloudinary Creator Community</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              CloudiCraft AI Media Studio & URL Inspector
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Explore dynamic URL transformations, AI gravity smart-cropping (<code className="text-cyan-300 bg-cyan-950/60 px-1 py-0.5 rounded text-xs">g_auto</code>), dynamic watermarks, format auto-optimization (<code className="text-cyan-300 bg-cyan-950/60 px-1 py-0.5 rounded text-xs">f_auto,q_auto</code>), and instant multi-language SDK code generation.
            </p>
          </div>
        </div>

        {/* Upload Zone */}
        <MediaUploader
          onAssetUploaded={handleAssetUploaded}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />

        {selectedAsset ? (
          <div className="space-y-8">
            {/* Interactive Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Transformation Controls (5 cols) */}
              <div className="lg:col-span-5 bg-slate-900/60 rounded-3xl border border-slate-800 p-6 shadow-xl backdrop-blur-sm">
                <TransformationControls
                  options={options}
                  setOptions={setOptions}
                  asset={selectedAsset}
                  onReset={handleResetOptions}
                />
              </div>

              {/* Right Column: Visual Viewer & Comparison (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 shadow-xl backdrop-blur-sm">
                  <BeforeAfterSlider
                    originalUrl={selectedAsset.url}
                    transformedUrl={transformedUrl}
                    asset={selectedAsset}
                    isVideoMode={selectedAsset.resourceType === 'video'}
                  />
                </div>

                {/* Bandwidth Savings Card */}
                <PerformanceCard asset={selectedAsset} options={options} />
              </div>
            </div>

            {/* Bottom Section: Educational Developer Playground */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cloudinary URL Inspector */}
              <UrlInspector
                transformedUrl={transformedUrl}
                options={options}
                asset={selectedAsset}
              />

              {/* Developer Code Generator */}
              <CodeGenerator
                publicId={selectedAsset.publicId}
                options={options}
                asset={selectedAsset}
              />
            </div>
          </div>
        ) : (
          /* Empty State when no asset selected */
          <div className="p-12 text-center rounded-3xl border border-slate-800 bg-slate-900/40 space-y-4">
            <h3 className="text-lg font-bold text-slate-300">No Asset Currently Selected</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Upload an image or video above, or click below to load high-resolution demo samples into your Cloudinary cloud.
            </p>
            <button
              onClick={handleSeedSamples}
              disabled={isSeeding}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-lg shadow-blue-600/30 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSeeding ? 'Seeding Demo Assets...' : 'Load Curated Sample Assets'}</span>
            </button>
          </div>
        )}

        {/* Media Library / Recent Uploads */}
        <RecentAssets
          assets={assets}
          selectedAsset={selectedAsset}
          onSelectAsset={(a) => {
            setSelectedAsset(a);
            setOptions(DEFAULT_OPTIONS);
          }}
          onDeleteAsset={handleDeleteAsset}
          onRefresh={fetchData}
          isLoading={isLoading}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Built for the <strong className="text-slate-300 font-semibold">Cloudinary Creator Community</strong> • Cloud: <code className="text-cyan-400">yq115gst</code>
          </p>
          <p className="text-slate-400">
            Powered by Cloudinary Node.js SDK v2 & Real-time Dynamic Transformations
          </p>
        </div>
      </footer>
    </div>
  );
}
