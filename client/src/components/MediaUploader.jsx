import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Video, Loader2, Sparkles, Check } from 'lucide-react';

export default function MediaUploader({ onAssetUploaded, isUploading, setIsUploading }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFiles = async (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setError('Please upload an image or video file.');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      onAssetUploaded(data.asset);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload asset');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
          dragActive
            ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
            : 'border-slate-700/80 hover:border-blue-500/80 bg-slate-900/40 hover:bg-slate-900/60'
        } ${isUploading ? 'pointer-events-none opacity-80' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*,video/*"
          onChange={(e) => handleFiles(e.target.files[0])}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-cyan-300 shadow-inner">
            {isUploading ? (
              <Loader2 className="w-7 h-7 animate-spin text-cyan-400" />
            ) : (
              <UploadCloud className="w-7 h-7 text-cyan-400" />
            )}
          </div>

          <div>
            <p className="font-semibold text-slate-200 text-sm">
              {isUploading ? (
                'Uploading & Streaming to Cloudinary Cloud...'
              ) : (
                <>
                  <span className="text-cyan-400 hover:underline">Click to upload</span> or drag and drop media
                </>
              )}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports JPG, PNG, WEBP, MP4, MOV (Up to 25MB)
            </p>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span className="flex items-center">
              <ImageIcon className="w-3.5 h-3.5 mr-1 text-blue-400" /> Image Transformations
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center">
              <Video className="w-3.5 h-3.5 mr-1 text-cyan-400" /> Video & GIF Conversion
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-400" /> AI Auto-Crop & Effects
            </span>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
