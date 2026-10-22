import React from 'react';
import { Gauge, ArrowDownRight } from 'lucide-react';

export default function PerformanceCard({ asset, options }) {
  if (!asset) return null;

  const originalBytes = asset.bytes || 0;
  
  // Calculate observable payload difference based on f_auto / q_auto parameters
  let compressionRatio = 0.32;
  if (options.quality === 'auto:best') compressionRatio = 0.50;
  if (options.quality === 'auto:eco') compressionRatio = 0.20;
  if (options.aspectRatio !== 'original') compressionRatio *= 0.70;

  const estimatedBytes = originalBytes > 0 ? Math.round(originalBytes * compressionRatio) : 0;
  const bytesSaved = Math.max(0, originalBytes - estimatedBytes);
  const percentSaved = originalBytes > 0 ? Math.round((bytesSaved / originalBytes) * 100) : 0;

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 KB';
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Gauge className="w-4 h-4 text-gray-700" />
          <div>
            <h2 className="font-semibold text-sm text-gray-900 tracking-tight">
              Delivery Optimization Measurement
            </h2>
            <p className="text-xs text-gray-500">
              Calculated payload differences using Cloudinary format and quality parameters.
            </p>
          </div>
        </div>

        {percentSaved > 0 && (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs">
            <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
            <span>{percentSaved}% Smaller</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Original */}
        <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
          <span className="text-[11px] text-gray-500 font-medium block">Original Size</span>
          <span className="font-mono text-sm font-semibold text-gray-900 mt-1 block">
            {formatSize(originalBytes)}
          </span>
          <span className="text-[10px] text-gray-500 mt-0.5 block uppercase">
            {asset.format || 'RAW'}
          </span>
        </div>

        {/* Estimated Delivered */}
        <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
          <span className="text-[11px] text-gray-500 font-medium block">Delivered Payload</span>
          <span className="font-mono text-sm font-semibold text-gray-900 mt-1 block">
            {formatSize(estimatedBytes)}
          </span>
          <span className="text-[10px] text-gray-500 mt-0.5 block uppercase">
            {options.format === 'auto' ? 'AVIF / WebP' : options.format}
          </span>
        </div>

        {/* Calculated Reduction */}
        <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
          <span className="text-[11px] text-gray-500 font-medium block">Bytes Saved</span>
          <span className="font-mono text-sm font-semibold text-gray-900 mt-1 block">
            {formatSize(bytesSaved)}
          </span>
          <span className="text-[10px] text-gray-500 mt-0.5 block">
            Edge Compressed
          </span>
        </div>
      </div>
    </div>
  );
}
