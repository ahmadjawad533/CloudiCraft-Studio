import React, { useState } from 'react';
import { Code2, Copy, Check } from 'lucide-react';
import { generateCodeSnippets } from '../utils/cloudinary';

export default function CodeGenerator({ publicId, options, asset }) {
  const [activeTab, setActiveTab] = useState('node');
  const [copied, setCopied] = useState(false);

  const snippets = generateCodeSnippets(publicId, options, asset);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'node', label: 'Node.js SDK' },
    { id: 'python', label: 'Python SDK' },
    { id: 'react', label: 'React / Next.js' },
    { id: 'curl', label: 'cURL / Shell' },
  ];

  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wide">
            Developer SDK Generator
          </h3>
        </div>

        {/* Tab selection */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code Display */}
      <div className="relative rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 flex items-center space-x-1 px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
        </button>

        <pre className="text-slate-300 pr-24 leading-relaxed">
          <code>{snippets[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
}
