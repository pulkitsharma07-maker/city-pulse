import React, { useContext } from 'react';
import { Home, Map as MapIcon, BarChart3 } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'map', label: 'Explore', icon: MapIcon },
    { id: 'history', label: 'Insights', icon: BarChart3 }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full glass-panel border-t border-white/40 lg:hidden z-50 rounded-t-3xl pb-safe">
      <div className="flex justify-around items-center h-20 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all ${
                isActive ? 'text-[var(--color-accent)] scale-110' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <div className={`p-2 rounded-full ${isActive ? 'bg-[var(--color-accent)]/10' : ''}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-xs font-semibold ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
