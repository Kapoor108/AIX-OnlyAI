import React from 'react';
import { Search, Star, BarChart3, Moon, Sun } from 'lucide-react';

interface SidebarProps {
  active: string;
  onNav: (nav: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, onNav, darkMode, setDarkMode }) => {
  const navItems = [
    { key: 'search', icon: <Search />, label: 'Search' },
    { key: 'favorites', icon: <Star />, label: 'Favorites' },
    { key: 'analytics', icon: <BarChart3 />, label: 'Analytics' },
  ];
    return (
    <aside className={`fixed top-6 left-6 h-[90vh] w-20 flex flex-col items-center glass soft-shadow rounded-3xl py-6 z-30 transition-colors ${darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/60 border-blue-100'}`}>
      <div className="mb-8 text-2xl font-bold tracking-widest text-blue-700 dark:text-blue-300">AIX</div>
      <nav className="flex flex-col gap-8 flex-1 justify-center">
        {navItems.map(item => (
          <button
            key={item.key}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${active === item.key ? 'bg-blue-100 text-blue-700 shadow-md dark:bg-blue-900/40 dark:text-blue-200' : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:text-blue-300 dark:hover:bg-gray-800/60'}`}
            onClick={() => onNav(item.key)}
            aria-label={item.label}
          >
            {item.icon}
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <button
        className="mt-auto mb-2 p-2 rounded-full bg-blue-100 dark:bg-gray-800 hover:bg-blue-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle dark mode"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-blue-700" />}
      </button>
    </aside>
  );
};

export default Sidebar;
