import React, { useState } from 'react';
import { Terminal, Copy, Check, Info, Layers, Tag } from 'lucide-react';
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
    <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wide">
            Cloudinary URL Inspector
          </h3>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          On-The-Fly Delivery Pipeline
        </span>
      </div>

      {/* Raw URL Display Box */}
      <div className="relative rounded-xl bg-slate-950 p-3.5 border border-slate-800 font-mono text-xs text-slate-300 break-all select-all flex items-start justify-between group">
        <span className="text-cyan-300/90 leading-relaxed pr-8">
          {transformedUrl || 'No media selected'}
        </span>
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition opacity-80 group-hover:opacity-100 cursor-pointer"
          title="Copy URL"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Explanations Grid */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center">
          <Info className="w-3.5 h-3.5 mr-1 text-slate-500" /> Transformation Breakdown
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {explanations.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-cyan-400 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-800/40">
                  {item.tag}
                </span>
                <span className="text-[10px] text-slate-500 font-medium uppercase">
                  {item.category}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-200 pt-0.5">{item.name}</p>
              <p className="text-[11px] text-slate-400 leading-snug">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
