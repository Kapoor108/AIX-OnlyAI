import React, { useState, useEffect } from 'react';
import Sidebar from './components/ui/sidebar';
import ToolsList from './components/ToolsList';
import FavoritesList from './components/FavoritesList';
import CategoryChart from './components/CategoryChart';
import Confetti from './components/Confetti';
import { mockApiService } from './services/mockApi';
import { AITool } from './types/types';
import { MessageCircle } from 'lucide-react';

const BOTPRESS_URL = "https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/06/18/11/20250618115332-G0I7D69Y.json";

const App = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [favorites, setFavorites] = useState<AITool[]>([]);
  const [currentView, setCurrentView] = useState<'search' | 'favorites' | 'analytics'>('search');
  const [isLoadingTools, setIsLoadingTools] = useState(false);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);
  const [isSavingFavorite, setIsSavingFavorite] = useState(false);
  const [toolsError, setToolsError] = useState<string>('');
  const [favoritesError, setFavoritesError] = useState<string>('');
  const [saveError, setSaveError] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => { fetchTools(); }, [selectedCategory]);
  useEffect(() => { fetchFavorites(); }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchTools = async () => {
    setIsLoadingTools(true);
    setToolsError('');
    try {
      const data = await mockApiService.getTools(selectedCategory);
      setTools(data);
    } catch (error) {
      setToolsError('Failed to fetch tools. Please try again.');
    } finally {
      setIsLoadingTools(false);
    }
  };

  const fetchFavorites = async () => {
    setIsLoadingFavorites(true);
    setFavoritesError('');
    try {
      const data = await mockApiService.getFavorites();
      setFavorites(data);
    } catch (error) {
      setFavoritesError('Failed to fetch favorites. Please try again.');
    } finally {
      setIsLoadingFavorites(false);
    }
  };

  const addFavorite = async (toolId: number) => {
    setIsSavingFavorite(true);
    setSaveError('');
    try {
      await mockApiService.addFavorite(toolId);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      fetchFavorites();
    } catch (error: any) {
      if (error.message.includes('already favorited')) {
        setSaveError('This tool is already in your favorites!');
      } else {
        setSaveError('Failed to add to favorites. Please try again.');
      }
    } finally {
      setIsSavingFavorite(false);
    }
  };

  const removeFavorite = async (toolId: number) => {
    try {
      await mockApiService.removeFavorite(toolId);
      fetchFavorites();
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-tr from-blue-100 via-blue-50 to-white'}`}>
      <Sidebar active={currentView} onNav={setCurrentView} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 ml-28 px-8 py-10">
        {showConfetti && <Confetti />}
        {saveError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg text-red-700 font-semibold">
            {saveError}
          </div>
        )}
        {currentView === 'search' && (
          <ToolsList
            tools={tools}
            onFavoriteClick={addFavorite}
            isLoading={isLoadingTools}
            error={toolsError}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            isSavingFavorite={isSavingFavorite}
            favorites={favorites}
          />
        )}
        {currentView === 'favorites' && (
          <FavoritesList
            favorites={favorites}
            onRemoveFavorite={removeFavorite}
            isLoading={isLoadingFavorites}
            error={favoritesError}
          />
        )}
        {currentView === 'analytics' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Analytics</h2>
            <CategoryChart data={tools.reduce((acc, tool) => {
              acc[tool.category] = (acc[tool.category] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)} />
          </div>
        )}
      </main>
      {/* Floating Chat Button & Popup */}
      <div>
        <button
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-6 shadow-lg flex items-center justify-center transition-all group"
          onClick={() => setShowChat(true)}
          aria-label="Open AI Chatbot"
          style={{ boxShadow: '0 4px 24px 0 rgba(0,64,255,0.18)' }}
        >
          <MessageCircle className="w-12 h-12" />
          {!showChat && (
            <span className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold text-lg shadow-lg animate-pulse whitespace-nowrap select-none group-hover:scale-105 transition-transform" style={{ position: 'absolute', right: '110%', bottom: '10%' }}>
              💬 Chat with AI!
            </span>
          )}
        </button>
      </div>
      {showChat && (
        <div className="fixed bottom-24 right-8 z-50 glass rounded-2xl shadow-2xl border border-blue-200 dark:border-gray-700 w-[370px] h-[540px] flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b border-blue-100 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 rounded-t-2xl">
            <span className="font-semibold text-blue-700 dark:text-blue-200">AI Chatbot</span>
            <button
              className="text-gray-400 hover:text-red-500 text-xl font-bold transition-colors"
              onClick={() => setShowChat(false)}
              aria-label="Close Chatbot"
            >
              ×
            </button>
          </div>
          <iframe
            src={BOTPRESS_URL}
            title="AI Chatbot"
            className="flex-1 w-full h-full rounded-b-2xl border-0"
            allow="microphone;"
            style={{ background: 'transparent' }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
