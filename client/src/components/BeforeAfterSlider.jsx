import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ExternalLink,
  Download,
  Copy,
  Check,
  Maximize2,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function BeforeAfterSlider({
  originalUrl,
  transformedUrl,
  asset,
  isVideoMode,
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
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
          <span className="text-xs font-semibold text-slate-300 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-cyan-400" /> Live Interactive Preview
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            {isVideo ? (isGifOrThumb ? 'Video Transform' : 'Cloudinary Video') : 'Side-by-Side Compare'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyUrl}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
            title="Copy Cloudinary CDN URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy URL'}</span>
          </button>

          <a
            href={transformedUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 px-2.5 py-1 text-xs rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition cursor-pointer"
            title="Open in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open CDN</span>
          </a>
        </div>
      </div>

      {/* Main viewer container */}
      <div
        ref={containerRef}
        className="relative flex-1 min-h-[420px] max-h-[580px] w-full rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800 flex items-center justify-center select-none shadow-2xl"
      >
        {isVideo && !isGifOrThumb ? (
          /* Pure video playback */
          <video
            src={transformedUrl}
            controls
            autoPlay
            loop
            muted
            className="max-h-[540px] max-w-full rounded-xl object-contain"
          />
        ) : (
          /* Image or GIF comparison view */
          <>
            {/* Background: Original Image */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={originalUrl}
                alt="Original"
                className="max-h-[520px] max-w-full object-contain pointer-events-none opacity-40 blur-[1px]"
              />
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-[11px] font-semibold text-slate-300 border border-slate-700/80 shadow">
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
                alt="Transformed"
                onLoad={() => setImgLoaded(true)}
                className="max-h-[520px] max-w-full object-contain pointer-events-none shadow-2xl"
              />
              <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-cyan-950/80 backdrop-blur-md text-[11px] font-semibold text-cyan-300 border border-cyan-500/40 shadow flex items-center space-x-1">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>Cloudinary Transformed</span>
              </span>
            </div>

            {/* Draggable Divider Handle */}
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{ left: `${sliderPos}%` }}
              className="absolute top-0 bottom-0 w-1 bg-cyan-400/80 cursor-ew-resize hover:bg-cyan-300 transition-colors z-20 flex items-center justify-center -ml-0.5"
            >
              <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg cursor-ew-resize">
                <div className="flex space-x-0.5 text-cyan-400 text-[10px] font-bold">
                  <span>◀</span>
                  <span>▶</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Helper text for slider */}
      {!isVideo && (
        <p className="text-center text-[11px] text-slate-500">
          Drag the center handle horizontally to compare the original raw asset vs the real-time Cloudinary output.
        </p>
      )}
    </div>
  );
}
