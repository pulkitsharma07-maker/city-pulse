import React, { useContext } from 'react';
import { X, Globe, Settings, Info, Database } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { AccessibilityContext } from '../../context/AccessibilityContext';

const SideMenu = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { fontSize, setFontSize, highContrast, toggleHighContrast } = useContext(AccessibilityContext);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-80 glass-panel shadow-2xl z-50 overflow-y-auto transform transition-transform border-r border-white/50">
        <div className="p-4 flex justify-between items-center border-b border-[var(--color-border)]">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Settings</h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-black/5 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Language */}
          <section>
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] flex items-center gap-2 mb-3">
              <Globe size={16} /> Language
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिंदी' },
                { code: 'ta', label: 'தமிழ்' },
                { code: 'te', label: 'తెలుగు' },
                { code: 'bn', label: 'বাংলা' },
                { code: 'mr', label: 'मराठी' },
                { code: 'kn', label: 'ಕನ್ನಡ' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-2 text-sm rounded-md border text-left ${language === lang.code ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </section>

          {/* Accessibility */}
          <section>
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] flex items-center gap-2 mb-3">
              <Settings size={16} /> Accessibility
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm block mb-2">Text Size</label>
                <div className="flex bg-[var(--color-base)] rounded-lg p-1">
                  {['small', 'normal', 'large'].map(size => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`flex-1 py-1 text-sm rounded-md capitalize ${fontSize === size ? 'bg-[var(--color-surface)] shadow-sm font-medium' : 'text-[var(--color-text-secondary)]'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={highContrast} 
                  onChange={toggleHighContrast}
                  className="rounded text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                />
                <span className="text-sm">High Contrast Mode</span>
              </label>
            </div>
          </section>

          {/* About */}
          <section className="pt-4 border-t border-[var(--color-border)]">
            <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-[var(--color-surface-hover)] text-left">
              <Info size={18} className="text-[var(--color-text-secondary)]" />
              <span className="text-sm font-medium">About City Pulse</span>
            </button>
            <button className="flex items-center gap-3 w-full p-2 mt-1 rounded-md hover:bg-[var(--color-surface-hover)] text-left">
              <Database size={18} className="text-[var(--color-text-secondary)]" />
              <span className="text-sm font-medium">Data Sources</span>
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
