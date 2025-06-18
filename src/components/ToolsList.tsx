import React from 'react';
import ToolCard from './ToolCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { AITool } from '../types/types';

interface ToolsListProps {
  tools: AITool[];
  onFavoriteClick: (toolId: number) => void;
  isLoading: boolean;
  error: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isSavingFavorite: boolean;
  favorites: AITool[];
}

const ToolsList: React.FC<ToolsListProps> = ({
  tools,
  onFavoriteClick,
  isLoading,
  error,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  isSavingFavorite,
  favorites
}) => {
  const favoriteIds = favorites.map(fav => fav.id);

  // Filter tools by search term and category
  const filteredTools = tools.filter(tool => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || tool.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-2xl mx-auto z-10">
        <input
          type="text"
          placeholder="Search AI tools..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-blue-200 bg-white/60 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 font-sans text-lg shadow-md"
        />
      </div>
      {/* Tools Grid Layout */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-24 text-2xl font-sans text-blue-400 animate-pulse">
          &gt; NO MATCHING AI TOOLS FOUND.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onFavoriteClick={onFavoriteClick}
              isLoading={isSavingFavorite}
              isFavorited={favoriteIds.includes(tool.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsList;
