import React from 'react';
import { Cloud, Sparkles, CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';

export default function Header({ status, onSeedSamples, isSeeding }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cloud className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                CloudiCraft Studio
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Creator Community Edition
              </span>
            </div>
            <p className="text-xs text-slate-400">
              AI Media Transformations & Developer Playground
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Cloud status badge */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">Cloud:</span>
            <span className="font-mono font-medium text-cyan-300">
              {status?.cloudName || 'yq115gst'}
            </span>
            {status?.credits && (
              <span className="text-slate-500 text-[11px] border-l border-slate-700 pl-2">
                {status.credits.usage} / {status.credits.limit} Credits
              </span>
            )}
          </div>

          {/* Seed demo assets button */}
          <button
            onClick={onSeedSamples}
            disabled={isSeeding}
            className="flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all cursor-pointer disabled:opacity-50"
            title="Upload curated sample assets to your cloud"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{isSeeding ? 'Seeding...' : 'Quick Seed Media'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
