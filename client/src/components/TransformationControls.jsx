import React from 'react';
import {
  Crop,
  Sparkles,
  Type,
  Video,
  Sliders,
  Maximize2,
  SlidersHorizontal,
  Compass,
  RotateCcw,
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
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-slate-100 tracking-wide uppercase">
            Transformation Studio
          </h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Video Mode Selector (if video) */}
      {isVideo && (
        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/30 space-y-2.5">
          <label className="flex items-center space-x-2 text-xs font-semibold text-cyan-300">
            <Video className="w-4 h-4 text-cyan-400" />
            <span>Cloudinary Video Pipeline</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'video', label: 'Streaming Video' },
              { id: 'gif', label: 'Animated GIF' },
              { id: 'thumb', label: 'Smart Thumbnail' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => updateOption('videoMode', mode.id)}
                className={`py-2 px-2 text-xs rounded-lg font-medium border text-center transition-all cursor-pointer ${
                  (options.videoMode || 'video') === mode.id
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
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
        <label className="flex items-center space-x-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Crop className="w-3.5 h-3.5 text-blue-400" />
          <span>Social Media Crop (AI Gravity)</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {ASPECT_RATIOS.map((ratio) => (
            <button
              key={ratio.id}
              onClick={() => updateOption('aspectRatio', ratio.id)}
              className={`py-2 px-2.5 text-xs rounded-xl font-medium border text-left transition-all cursor-pointer ${
                options.aspectRatio === ratio.id
                  ? 'bg-blue-600/20 border-blue-500 text-blue-200 shadow-sm shadow-blue-500/20'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              <div className="font-semibold">{ratio.label}</div>
              <div className="text-[10px] text-slate-500 truncate">{ratio.desc}</div>
            </button>
          ))}
        </div>

        {options.aspectRatio !== 'original' && (
          <div className="pt-2 flex items-center justify-between bg-slate-900/50 p-2.5 rounded-lg border border-slate-800 text-xs">
            <span className="flex items-center text-slate-400">
              <Compass className="w-3.5 h-3.5 mr-1 text-cyan-400" /> Gravity Engine
            </span>
            <select
              value={options.gravity}
              onChange={(e) => updateOption('gravity', e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="auto">AI Auto Subject (g_auto)</option>
              <option value="face">Face Detection (g_face)</option>
              <option value="center">Center (g_center)</option>
              <option value="north">Top / North (g_north)</option>
            </select>
          </div>
        )}
      </div>

      {/* AI Filters & Visual Enhancements */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI Filters & Visual Styles</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => updateOption('filter', f.id)}
              className={`py-2 px-3 text-xs rounded-xl font-medium border text-left transition-all cursor-pointer ${
                options.filter === f.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-sm shadow-indigo-500/20'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              <div className="font-medium">{f.label}</div>
            </button>
          ))}
        </div>

        {/* Background Blur slider */}
        <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Background Blur (e_blur)</span>
            <span className="font-mono text-cyan-300">{options.blur || 0}</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={options.blur || 0}
            onChange={(e) => updateOption('blur', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>

      {/* Dynamic Watermarking & Overlay */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Type className="w-3.5 h-3.5 text-cyan-400" />
          <span>Dynamic Watermark Layer</span>
        </label>
        <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800 space-y-3">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Watermark Text</label>
            <input
              type="text"
              placeholder="e.g. @YourBrand • Cloudinary"
              value={options.watermarkText || ''}
              onChange={(e) => updateOption('watermarkText', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {options.watermarkText && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Position (Gravity)</label>
                <select
                  value={options.watermarkPos || 'south_east'}
                  onChange={(e) => updateOption('watermarkPos', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="south_east">Bottom Right</option>
                  <option value="south_west">Bottom Left</option>
                  <option value="center">Center Badge</option>
                  <option value="north_east">Top Right</option>
                  <option value="north_west">Top Left</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Opacity</span>
                  <span className="font-mono text-cyan-300">{options.watermarkOpacity || 80}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={options.watermarkOpacity || 80}
                  onChange={(e) => updateOption('watermarkOpacity', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Optimization & Delivery */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
          <span>Delivery Codec & Compression</span>
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Format (f_)</label>
            <select
              value={options.format}
              onChange={(e) => updateOption('format', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="auto">Auto Modern (f_auto)</option>
              <option value="webp">WebP</option>
              <option value="avif">AVIF (Next-Gen)</option>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Quality (q_)</label>
            <select
              value={options.quality}
              onChange={(e) => updateOption('quality', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="auto">Auto Perceptual (q_auto)</option>
              <option value="auto:best">Best Fidelity (q_auto:best)</option>
              <option value="auto:eco">Eco / Max Compression (q_auto:eco)</option>
              <option value="80">Fixed 80%</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
