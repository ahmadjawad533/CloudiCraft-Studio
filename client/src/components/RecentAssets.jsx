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
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <FolderGit2 className="w-4 h-4 text-gray-700" />
          <h2 className="font-semibold text-sm text-gray-900 tracking-tight">
            Cloud Media Library ({assets.length})
          </h2>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 transition-colors duration-150 cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          title="Refresh library"
          aria-label="Refresh media library"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {assets.length === 0 ? (
        <div className="p-8 text-center text-xs text-gray-500 border border-dashed border-gray-200 rounded-lg bg-gray-50">
          No media assets in cloud library yet. Upload an asset above or click "Load Sample Media" in the header.
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
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectAsset(item);
                  }
                }}
                aria-label={`Select media asset ${item.publicId}`}
                className={`group relative rounded-lg overflow-hidden border cursor-pointer transition-colors duration-150 aspect-square bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-600/30'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img
                  src={thumbUrl}
                  alt={`Thumbnail for ${item.publicId}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (e.target.src !== item.url) {
                      e.target.src = item.url;
                    }
                  }}
                />

                <span className="absolute top-1.5 left-1.5 p-1 rounded-md bg-white/90 text-gray-700 shadow-sm">
                  {isVideo ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Delete this asset from Cloudinary?')) {
                      onDeleteAsset(item.publicId, item.resourceType);
                    }
                  }}
                  className="absolute top-1.5 right-1.5 p-1 rounded-md bg-white hover:bg-red-50 text-red-600 border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                  title="Delete asset"
                  aria-label="Delete asset from Cloudinary"
                >
                  <Trash2 className="w-3 h-3" />
                </button>

                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-white/95 border-t border-gray-200">
                  <p className="text-[10px] font-mono text-gray-700 truncate">
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
