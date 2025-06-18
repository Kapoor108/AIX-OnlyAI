import React from 'react';
import { Star as StarIcon, ExternalLink, Heart } from 'lucide-react';
import { AITool } from '../types/types';

interface ToolCardProps {
  tool: AITool;
  onFavoriteClick: (toolId: number) => void;
  isLoading: boolean;
  isFavorited: boolean;
}

const getCategoryColor = (category: string) => {
  // Simple color mapping for demo
  if (category.toLowerCase().includes('nlp')) return 'bg-blue-100 text-blue-700';
  if (category.toLowerCase().includes('image')) return 'bg-purple-100 text-purple-700';
  if (category.toLowerCase().includes('code')) return 'bg-green-100 text-green-700';
  return 'bg-gray-100 text-gray-700';
};

const ToolCard: React.FC<ToolCardProps> = ({ tool, onFavoriteClick, isLoading, isFavorited }) => {
  return (
    <div className="glass soft-shadow rounded-2xl p-6 flex flex-col gap-3 min-w-[300px] max-w-xs transition-all duration-200 hover:shadow-xl hover:-translate-y-1 relative">
      {/* Favorite Icon */}
      <button
        className={`absolute top-4 right-4 p-2 rounded-full bg-white/60 hover:bg-blue-100 transition-all border border-blue-100 ${isFavorited ? 'text-blue-600' : 'text-gray-400'}`}
        onClick={() => onFavoriteClick(tool.id)}
        disabled={isLoading}
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart fill={isFavorited ? '#2563eb' : 'none'} className="w-5 h-5" />
      </button>
      {/* Tool Name */}
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-xl font-bold font-sans tracking-tight">{tool.name}</h2>
        {tool.category && (
          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(tool.category)}`}>{tool.category}</span>
        )}
      </div>
      {/* Description */}
      <p className="text-gray-700 text-sm mb-1 line-clamp-2">{tool.description}</p>
      {/* Pricing */}
      {tool.pricing && (
        <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium mb-1">{tool.pricing}</span>
      )}
      {/* Features */}
      {tool.features && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tool.features.slice(0, 3).map((feature, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
              {feature}
            </span>
          ))}
        </div>
      )}
      {/* Ratings (demo: 4.5 stars) */}
      <div className="flex items-center gap-1 mb-2">
        <span className="text-blue-700 font-semibold text-sm">4.5</span>
        {[1,2,3,4,5].map(i => (
          <StarIcon key={i} className={`w-4 h-4 ${i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} fill={i <= 4 ? '#facc15' : 'none'} />
        ))}
      </div>
      {/* Visit Button */}
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 btn bg-blue-600 text-white hover:bg-blue-700 transition-all px-5 py-2 rounded-lg font-semibold flex items-center gap-2 justify-center"
      >
        Visit <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};

export default ToolCard;

// Add floating animation
// In index.css or a global CSS file, add:
// .animate-float {
//   animation: float 4s ease-in-out infinite;
// }
// @keyframes float {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-16px); }
// }
