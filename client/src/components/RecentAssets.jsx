import React from 'react';
import { Image as ImageIcon, Video, Trash2, FolderGit2, RefreshCw } from 'lucide-react';
import { BASE_URL } from '../utils/cloudinary';

export default function RecentAssets({
  assets,
  selectedAsset,
  onSelectAsset,
  onDeleteAsset,
  onRefresh,
  isLoading,
}) {
  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FolderGit2 className="w-4 h-4 text-blue-400" />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wide">
            Cloudinary Media Library ({assets.length})
          </h3>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition cursor-pointer disabled:opacity-50"
          title="Refresh library"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {assets.length === 0 ? (
        <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
          No media in library yet. Upload an asset above or click "Quick Seed Media" in the header!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {assets.map((item) => {
            const isSelected = selectedAsset?.publicId === item.publicId;
            const isVideo = item.resourceType === 'video';
            const thumbUrl = isVideo
              ? `${BASE_URL}/video/upload/c_fill,w_240,h_240,g_auto,so_auto/f_jpg/${item.publicId}.jpg`
              : `${BASE_URL}/image/upload/c_fill,w_240,h_240,g_auto/f_auto,q_auto/${item.publicId}`;

            return (
              <div
                key={item.publicId}
                onClick={() => onSelectAsset(item)}
                className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all aspect-square bg-slate-950 ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-[1.02]'
                    : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                <img
                  src={thumbUrl}
                  alt={item.publicId}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to original url
                    if (e.target.src !== item.url) {
                      e.target.src = item.url;
                    }
                  }}
                />

                {/* Type Badge */}
                <span className="absolute top-1.5 left-1.5 p-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-[10px] text-slate-300">
                  {isVideo ? <Video className="w-3 h-3 text-cyan-400" /> : <ImageIcon className="w-3 h-3 text-blue-400" />}
                </span>

                {/* Delete button on hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Delete this asset from Cloudinary?')) {
                      onDeleteAsset(item.publicId, item.resourceType);
                    }
                  }}
                  className="absolute top-1.5 right-1.5 p-1 rounded-md bg-red-950/80 hover:bg-red-800 text-red-300 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                  title="Delete asset"
                >
                  <Trash2 className="w-3 h-3" />
                </button>

                {/* Label */}
                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                  <p className="text-[10px] font-mono text-slate-300 truncate">
                    {item.publicId.split('/').pop()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
