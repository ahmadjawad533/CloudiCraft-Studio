import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Video, Loader2 } from 'lucide-react';

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
        id="uploader-dropzone"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            inputRef.current?.click();
          }
        }}
        aria-label="Upload image or video file"
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
          dragActive
            ? 'border-blue-600 bg-blue-50/40'
            : 'border-gray-300 hover:border-gray-400 bg-white'
        } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          id="file-upload-input"
          aria-label="Select image or video file"
          className="hidden"
          accept="image/*,video/*"
          onChange={(e) => handleFiles(e.target.files[0])}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            ) : (
              <Upload className="w-6 h-6 text-gray-600" />
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {isUploading ? (
                'Streaming asset to Cloudinary...'
              ) : (
                <>
                  <span className="text-blue-600 hover:underline">Click to upload</span> or drag and drop a file
                </>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports JPG, PNG, WEBP, MP4, MOV up to 25MB.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-500 pt-1">
            <span className="inline-flex items-center">
              <ImageIcon className="w-3.5 h-3.5 mr-1 text-gray-600" /> Image Transformations
            </span>
            <span className="text-gray-300">•</span>
            <span className="inline-flex items-center">
              <Video className="w-3.5 h-3.5 mr-1 text-gray-600" /> Video and GIF Processing
            </span>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 text-left">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
