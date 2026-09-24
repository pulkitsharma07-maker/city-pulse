import React, { useContext } from 'react';
import { LocationContext } from '../../context/LocationContext';

const HeroSection = () => {
  const { areaName } = useContext(LocationContext);
  const cityName = areaName.split(',')[0] || 'The city';

  return (
    <div className="glass-panel rounded-2xl p-8 mb-8 relative overflow-hidden mt-2 border border-white/40 shadow-lg">
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-status-green)] opacity-20 rounded-full blur-3xl animate-soft-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-gradient-to-tr from-purple-400 to-indigo-300 opacity-20 rounded-full blur-2xl animate-float pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-status-green)] animate-soft-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
            <span className="text-sm font-semibold tracking-wide uppercase text-[var(--color-accent)]">Live Urban Feed</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
            {cityName} is alive right now.
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl font-medium">
            Explore real-time data on mobility, air quality, and local events. Stay connected to the pulse of your neighborhood.
          </p>
        </div>
        
        <div className="flex gap-4 self-start md:self-center">
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 border border-white/50 shadow-sm text-center min-w-[100px]">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">24/7</div>
            <div className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase mt-1">Monitoring</div>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 border border-white/50 shadow-sm text-center min-w-[100px]">
            <div className="text-2xl font-bold text-[var(--color-status-green)]">98%</div>
            <div className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase mt-1">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
