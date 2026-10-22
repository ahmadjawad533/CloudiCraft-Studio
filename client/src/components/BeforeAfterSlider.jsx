import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';

export default function BeforeAfterSlider({
  originalUrl,
  transformedUrl,
  asset,
  isVideoMode,
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(transformedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  const isVideo = asset?.resourceType === 'video';
  const isGifOrThumb = transformedUrl.endsWith('.gif') || transformedUrl.endsWith('.jpg');

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-gray-800">
            Preview Comparison
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200">
            {isVideo ? (isGifOrThumb ? 'Video Transformation' : 'Video Player') : 'Side-by-Side'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            title="Copy Cloudinary CDN URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-600" />}
            <span>{copied ? 'Copied' : 'Copy URL'}</span>
          </button>

          <a
            href={transformedUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            title="Open in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gray-600" />
            <span>Open in CDN</span>
          </a>
        </div>
      </div>

      {/* Main viewer container */}
      <div
        ref={containerRef}
        className="relative flex-1 min-h-[420px] max-h-[560px] w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center select-none"
      >
        {isVideo && !isGifOrThumb ? (
          <video
            src={transformedUrl}
            controls
            autoPlay
            loop
            muted
            className="max-h-[500px] max-w-full rounded-md object-contain"
          />
        ) : (
          <>
            {/* Background: Original Image */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={originalUrl}
                alt="Original source asset"
                className="max-h-[480px] max-w-full object-contain pointer-events-none opacity-40"
              />
              <span className="absolute top-4 left-4 px-2 py-1 rounded-md bg-white text-[11px] font-medium text-gray-700 border border-gray-300 shadow-sm">
                Original
              </span>
            </div>

            {/* Foreground: Transformed Image with clip-path */}
            <div
              className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden"
              style={{
                clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`,
              }}
            >
              <img
                src={transformedUrl}
                alt="Transformed Cloudinary asset"
                className="max-h-[480px] max-w-full object-contain pointer-events-none"
              />
              <span className="absolute top-4 right-4 px-2 py-1 rounded-md bg-white text-[11px] font-medium text-blue-700 border border-blue-200 shadow-sm">
                Cloudinary Output
              </span>
            </div>

            {/* Draggable Divider Handle */}
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{ left: `${sliderPos}%` }}
              role="slider"
              aria-valuenow={Math.round(sliderPos)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Image comparison slider divider"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(0, p - 5));
                if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(100, p + 5));
              }}
              className="absolute top-0 bottom-0 w-0.5 bg-blue-600 cursor-ew-resize z-20 flex items-center justify-center -ml-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <div className="w-6 h-6 rounded-md bg-white border border-gray-300 shadow-sm flex items-center justify-center text-[10px] text-gray-600 font-mono">
                ↔
              </div>
            </div>
          </>
        )}
      </div>

      {!isVideo && (
        <p className="text-center text-xs text-gray-500">
          Drag the center handle to compare the original raw upload with the transformed Cloudinary output.
        </p>
      )}
    </div>
  );
}
