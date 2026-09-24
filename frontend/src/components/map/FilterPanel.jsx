import React, { useState, useContext } from 'react';
import { Filter, X } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

const FilterPanel = ({ categories, activeFilters, setActiveFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useContext(LanguageContext);

  const toggleFilter = (cat) => {
    if (activeFilters.includes(cat)) {
      setActiveFilters(activeFilters.filter(c => c !== cat));
    } else {
      setActiveFilters([...activeFilters, cat]);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      {isOpen ? (
        <div className="glass-panel p-4 rounded-xl shadow-lg w-64 animate-fade-in">
          <div className="flex justify-between items-center mb-3 border-b border-[var(--color-border)] pb-2">
            <h3 className="font-medium text-[var(--color-text-primary)]">Filters</h3>
            <button onClick={() => setIsOpen(false)} className="text-[var(--color-text-secondary)] hover:bg-black/5 p-1 rounded transition-colors">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-black/5 p-1.5 rounded transition-colors">
                <input 
                  type="checkbox" 
                  checked={activeFilters.includes(cat)}
                  onChange={() => toggleFilter(cat)}
                  className="rounded text-[var(--color-accent)] focus:ring-[var(--color-accent)] border-[var(--color-border)] bg-transparent"
                />
                <span className="text-sm font-medium text-[var(--color-text-secondary)] capitalize">{t(`categories.${cat}`)}</span>
              </label>
            ))}
          </div>
          {activeFilters.length > 0 && (
            <button 
              onClick={() => setActiveFilters([])}
              className="mt-3 w-full text-xs font-semibold text-[var(--color-accent)] hover:opacity-80 transition-opacity"
            >
              Clear all
            </button>
          )}
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="glass-panel p-2.5 rounded-xl shadow-md text-[var(--color-text-primary)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
        >
          <Filter size={20} className="text-[var(--color-accent)]" />
          <span className="font-medium text-sm hidden sm:inline">Filter map</span>
          {activeFilters.length > 0 && (
            <span className="bg-[var(--color-accent)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-inner">
              {activeFilters.length}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
