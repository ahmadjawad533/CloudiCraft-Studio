import React from 'react';
import {
  Crop,
  Sliders,
  Type,
  Video,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { ASPECT_RATIOS, FILTERS } from '../utils/cloudinary';

export default function TransformationControls({
  options,
  setOptions,
  asset,
  onReset,
}) {
  const isVideo = asset?.resourceType === 'video';

  const updateOption = (key, value) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header with reset */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-gray-700" />
          <h2 className="font-semibold text-sm text-gray-900 tracking-tight">
            Transformation Settings
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-900 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-1.5 py-0.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Video Mode Selector (if video) */}
      {isVideo && (
        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-3">
          <label className="flex items-center space-x-2 text-xs font-semibold text-gray-800">
            <Video className="w-4 h-4 text-gray-700" />
            <span>Video Delivery Mode</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'video', label: 'Streaming Video' },
              { id: 'gif', label: 'Animated GIF' },
              { id: 'thumb', label: 'Thumbnail Image' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => updateOption('videoMode', mode.id)}
                className={`py-2 px-2 text-xs rounded-lg font-medium border text-center transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  (options.videoMode || 'video') === mode.id
                    ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Aspect Ratio & AI Gravity Crop */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-xs font-semibold text-gray-800">
          <Crop className="w-3.5 h-3.5 text-gray-700" />
          <span>Aspect Ratio and AI Gravity</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {ASPECT_RATIOS.map((ratio) => (
            <button
              key={ratio.id}
              type="button"
              onClick={() => updateOption('aspectRatio', ratio.id)}
              className={`py-2 px-2.5 text-xs rounded-lg font-medium border text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                options.aspectRatio === ratio.id
                  ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="font-semibold">{ratio.label}</div>
              <div className="text-[10px] text-gray-500 truncate">{ratio.desc}</div>
            </button>
          ))}
        </div>

        {options.aspectRatio !== 'original' && (
          <div className="pt-1 flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-xs">
            <label htmlFor="gravity-engine-select" className="text-gray-700 font-medium">
              Gravity Focus
            </label>
            <select
              id="gravity-engine-select"
              value={options.gravity}
              onChange={(e) => updateOption('gravity', e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="auto">AI Auto Subject (g_auto)</option>
              <option value="face">Face Detection (g_face)</option>
              <option value="center">Center (g_center)</option>
              <option value="north">Top / North (g_north)</option>
            </select>
          </div>
        )}
      </div>

      {/* Visual Adjustments */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-xs font-semibold text-gray-800">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-700" />
          <span>Visual Filters</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => updateOption('filter', f.id)}
              className={`py-2 px-3 text-xs rounded-lg font-medium border text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                options.filter === f.id
                  ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div>{f.label}</div>
            </button>
          ))}
        </div>

        {/* Background Blur */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">
          <div className="flex justify-between text-xs">
            <label htmlFor="blur-range-slider" className="text-gray-700 font-medium">
              Gaussian Blur (e_blur)
            </label>
            <span className="font-mono text-gray-800 font-semibold">{options.blur || 0}</span>
          </div>
          <input
            id="blur-range-slider"
            type="range"
            min="0"
            max="10"
            step="1"
            value={options.blur || 0}
            onChange={(e) => updateOption('blur', Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          />
        </div>
      </div>

      {/* Dynamic Watermark */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-xs font-semibold text-gray-800">
          <Type className="w-3.5 h-3.5 text-gray-700" />
          <span>Dynamic Watermark Layer</span>
        </label>
        <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200 space-y-3">
          <div>
            <label htmlFor="watermark-text-input" className="text-xs text-gray-700 font-medium block mb-1">
              Watermark Text
            </label>
            <input
              id="watermark-text-input"
              type="text"
              placeholder="e.g. YourBrand"
              value={options.watermarkText || ''}
              onChange={(e) => updateOption('watermarkText', e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {options.watermarkText && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label htmlFor="watermark-pos-select" className="text-xs text-gray-700 font-medium block mb-1">
                  Position
                </label>
                <select
                  id="watermark-pos-select"
                  value={options.watermarkPos || 'south_east'}
                  onChange={(e) => updateOption('watermarkPos', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="south_east">Bottom Right</option>
                  <option value="south_west">Bottom Left</option>
                  <option value="center">Center</option>
                  <option value="north_east">Top Right</option>
                  <option value="north_west">Top Left</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-700 font-medium mb-1">
                  <label htmlFor="watermark-opacity-slider">Opacity</label>
                  <span className="font-mono text-gray-800">{options.watermarkOpacity || 80}%</span>
                </div>
                <input
                  id="watermark-opacity-slider"
                  type="range"
                  min="20"
                  max="100"
                  value={options.watermarkOpacity || 80}
                  onChange={(e) => updateOption('watermarkOpacity', Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Codec & Compression */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-800 block">
          Format and Quality Optimization
        </label>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label htmlFor="format-select" className="text-gray-700 font-medium block mb-1">
              Format (f_)
            </label>
            <select
              id="format-select"
              value={options.format}
              onChange={(e) => updateOption('format', e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="auto">Automatic (f_auto)</option>
              <option value="webp">WebP</option>
              <option value="avif">AVIF</option>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
            </select>
          </div>
          <div>
            <label htmlFor="quality-select" className="text-gray-700 font-medium block mb-1">
              Quality (q_)
            </label>
            <select
              id="quality-select"
              value={options.quality}
              onChange={(e) => updateOption('quality', e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="auto">Automatic (q_auto)</option>
              <option value="auto:best">High Fidelity (q_auto:best)</option>
              <option value="auto:eco">Maximum Compression (q_auto:eco)</option>
              <option value="80">Fixed 80%</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
