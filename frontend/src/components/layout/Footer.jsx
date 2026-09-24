import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-[var(--color-border)] py-8 relative">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-status-green)] flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="font-semibold text-[var(--color-text-primary)]">City Pulse</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Real-time urban intelligence dashboard.
          </p>
        </div>

        <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
          <span>Built for</span>
          <span className="font-semibold text-[var(--color-text-primary)]">AmiHacks 1.0</span>
          <span>with</span>
          <Heart size={14} className="text-red-500 fill-red-500 mx-1 animate-soft-pulse" />
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-[var(--color-text-secondary)]">
          <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Terms</a>
          <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Data Sources</a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
