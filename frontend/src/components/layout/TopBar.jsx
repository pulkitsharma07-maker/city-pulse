import React, { useState, useContext } from 'react';
import { Menu, MapPin, Globe } from 'lucide-react';
import SideMenu from './SideMenu';
import SearchBar from '../common/SearchBar';
import { LocationContext } from '../../context/LocationContext';
import { LanguageContext } from '../../context/LanguageContext';

const TopBar = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { areaName } = useContext(LocationContext);
  const { t, language, setLanguage } = useContext(LanguageContext);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'map', label: 'Explore' },
    { id: 'events', label: 'Events' },
    { id: 'mobility', label: 'Mobility' },
    { id: 'history', label: 'Insights' }
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (id === 'overview' || id === 'map' || id === 'history') {
      setActiveTab(id);
    } else {
      // Default secondary feeds to main overview
      setActiveTab('overview');
    }
  };

  return (
    <>
      <header className="glass-panel sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2 rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] md:hidden"
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('overview')}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-status-green)] flex items-center justify-center animate-soft-pulse shadow-md">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 tracking-tighter">
                City Pulse
              </h1>
            </div>
            
            {/* SaaS Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 ml-8">
              {navItems.map(item => {
                const isActive = activeTab === item.id || (activeTab === 'overview' && (item.id === 'events' || item.id === 'mobility'));
                return (
                  <a 
                    key={item.id} 
                    href="#" 
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`text-sm font-medium transition-all duration-300 ${isActive ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)] py-1' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-sm mx-4 justify-end">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 text-[var(--color-text-primary)] bg-white/40 border border-white/50 shadow-sm backdrop-blur-md px-3 py-1.5 rounded-full hover:bg-white/60 transition-all">
              <Globe size={16} className="text-[var(--color-accent)]" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none text-sm font-semibold focus:outline-none cursor-pointer uppercase outline-none"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="ta">TA</option>
                <option value="te">TE</option>
                <option value="bn">BN</option>
                <option value="mr">MR</option>
                <option value="kn">KN</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-[var(--color-text-primary)] bg-white/40 border border-white/50 shadow-sm backdrop-blur-md px-4 py-2 rounded-full cursor-pointer hover:bg-white/60 transition-all">
              <MapPin size={16} className="text-[var(--color-accent)]" />
              <span className="text-sm font-semibold truncate max-w-[120px] sm:max-w-[200px]">
                {areaName}
              </span>
            </div>
          </div>
        </div>
        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </header>
      
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default TopBar;
