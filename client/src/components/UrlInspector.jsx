import React, { useState } from 'react';
import { Terminal, Copy, Check, Info } from 'lucide-react';
import { explainTransformations } from '../utils/cloudinary';

export default function UrlInspector({ transformedUrl, options, asset }) {
  const [copied, setCopied] = useState(false);
  const explanations = explainTransformations(options, asset);

  const handleCopy = () => {
    navigator.clipboard.writeText(transformedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-gray-700" />
          <h2 className="font-semibold text-sm text-gray-900 tracking-tight">
            Cloudinary URL Inspector
          </h2>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border border-gray-200">
          Delivery Pipeline
        </span>
      </div>

      {/* Raw URL Display Box */}
      <div className="relative rounded-lg bg-gray-50 p-3.5 border border-gray-200 font-mono text-xs text-gray-800 break-all select-all flex items-start justify-between group">
        <span className="leading-relaxed pr-8">
          {transformedUrl || 'No media selected'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 rounded-md bg-white hover:bg-gray-100 text-gray-600 border border-gray-300 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          title="Copy URL"
          aria-label="Copy transformation URL"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Explanations Grid */}
      <div className="space-y-3 pt-1">
        <p className="text-xs font-semibold text-gray-600 flex items-center">
          <Info className="w-3.5 h-3.5 mr-1 text-gray-500" /> Transformation Breakdown
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {explanations.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  {item.tag}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  {item.category}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-900 pt-0.5">{item.name}</p>
              <p className="text-xs text-gray-600 leading-normal">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
