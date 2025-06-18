import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  // If using react-router, otherwise replace with a prop or window.location
  const navigate = useNavigate?.() ?? ((path: string) => (window.location.href = path));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-blue-50 to-white">
      <div className="glass soft-shadow px-12 py-16 rounded-3xl flex flex-col items-center text-center max-w-xl">
        <div className="mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
            <Sparkles className="w-10 h-10" />
          </span>
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">AI Tools Directory</h1>
          <p className="text-lg text-gray-600 mb-6">Discover, compare, and favorite the best AI tools for every workflow. Minimal, futuristic, and always up to date.</p>
        </div>
        <button
          className="btn bg-blue-600 text-white hover:bg-blue-700 transition-all text-lg px-8 py-3 rounded-xl shadow-lg"
          onClick={() => navigate('/search')}
        >
          Browse Tools
        </button>
      </div>
    </div>
  );
};

export default Index;
