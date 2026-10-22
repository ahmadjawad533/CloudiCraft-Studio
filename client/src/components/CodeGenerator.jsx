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
    { id: 'node', label: 'Node.js' },
    { id: 'python', label: 'Python' },
    { id: 'react', label: 'React' },
    { id: 'curl', label: 'cURL' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Code2 className="w-4 h-4 text-gray-700" />
          <h2 className="font-semibold text-sm text-gray-900 tracking-tight">
            Code Integration Snippet
          </h2>
        </div>

        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-700 shadow-sm font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative rounded-lg bg-gray-900 p-4 border border-gray-800 font-mono text-xs overflow-x-auto text-gray-100">
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-3 right-3 inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Copy code snippet"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>

        <pre className="text-gray-200 pr-20 leading-relaxed">
          <code>{snippets[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
}
