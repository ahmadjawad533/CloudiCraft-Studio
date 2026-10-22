import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import MediaUploader from './components/MediaUploader';
import TransformationControls from './components/TransformationControls';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import UrlInspector from './components/UrlInspector';
import CodeGenerator from './components/CodeGenerator';
import PerformanceCard from './components/PerformanceCard';
import RecentAssets from './components/RecentAssets';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import { buildTransformedUrl } from './utils/cloudinary';
import { Upload } from 'lucide-react';

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

function Workbench() {
  const [status, setStatus] = useState(null);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [isUploading, setIsUploading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleAssetUploaded = (newAsset) => {
    setAssets((prev) => [newAsset, ...prev]);
    setSelectedAsset(newAsset);
    setOptions(DEFAULT_OPTIONS);
  };

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
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      <Header
        status={status}
        onSeedSamples={handleSeedSamples}
        isSeeding={isSeeding}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Calm, professional hero with plain headline and one clear button */}
        <section className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md inline-block">
              Cloudinary Media Workbench
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Inspect, test, and benchmark media transformations in real time.
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Upload an image or video to configure aspect ratios, AI gravity cropping, dynamic watermarks, and format optimization.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const dropzone = document.getElementById('uploader-dropzone');
                  if (dropzone) {
                    dropzone.scrollIntoView({ behavior: 'smooth' });
                    dropzone.click();
                  }
                }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Media</span>
              </button>
            </div>
          </div>
        </section>

        {/* Upload Zone */}
        <MediaUploader
          onAssetUploaded={handleAssetUploaded}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />

        {selectedAsset ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Controls Column (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <TransformationControls
                  options={options}
                  setOptions={setOptions}
                  asset={selectedAsset}
                  onReset={handleResetOptions}
                />
              </div>

              {/* Viewer Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <BeforeAfterSlider
                    originalUrl={selectedAsset.url}
                    transformedUrl={transformedUrl}
                    asset={selectedAsset}
                    isVideoMode={selectedAsset.resourceType === 'video'}
                  />
                </div>

                <PerformanceCard asset={selectedAsset} options={options} />
              </div>
            </div>

            {/* URL Inspector & Code Generator */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UrlInspector
                transformedUrl={transformedUrl}
                options={options}
                asset={selectedAsset}
              />

              <CodeGenerator
                publicId={selectedAsset.publicId}
                options={options}
                asset={selectedAsset}
              />
            </div>
          </div>
        ) : (
          <div className="p-12 text-center rounded-lg border border-gray-200 bg-white space-y-3 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800">No asset currently selected</h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Upload a media file above or click below to load sample media into your Cloudinary cloud.
            </p>
            <button
              type="button"
              onClick={handleSeedSamples}
              disabled={isSeeding}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <span>{isSeeding ? 'Loading sample media...' : 'Load Sample Media'}</span>
            </button>
          </div>
        )}

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

      {/* Footer linking /privacy and /terms */}
      <footer className="border-t border-gray-200 bg-white py-6 mt-12 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-semibold text-gray-800">CloudiCraft Studio</span>
            <span className="text-gray-400 mx-2">|</span>
            <span>Cloudinary media transformation workbench.</span>
          </div>

          <div className="flex items-center space-x-6 text-xs text-gray-600">
            <Link
              to="/privacy"
              className="hover:text-gray-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-1"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-gray-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-1"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Workbench />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}
