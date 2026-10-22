import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, RefreshCw } from 'lucide-react';

export default function Header({ status, onSeedSamples, isSeeding }) {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to="/"
            className="flex items-center space-x-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md p-1 -ml-1"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-base text-gray-900 tracking-tight block leading-tight">
                CloudiCraft Studio
              </span>
              <span className="text-xs text-gray-500 block leading-tight">
                Media Transformation Workbench
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-600 inline-block" />
            <span className="text-gray-500">Cloud:</span>
            <span className="font-mono font-medium text-gray-800">
              {status?.cloudName || 'yq115gst'}
            </span>
            {status?.credits && (
              <span className="text-gray-400 border-l border-gray-200 pl-2">
                {status.credits.usage} / {status.credits.limit} Credits
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onSeedSamples}
            disabled={isSeeding}
            className="inline-flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-gray-500 ${isSeeding ? 'animate-spin' : ''}`} />
            <span>{isSeeding ? 'Loading...' : 'Load Sample Media'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
