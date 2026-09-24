import React, { useState, useContext } from 'react';
import TrendChart from './TrendChart';
import { useDashboard } from '../../hooks/useDashboard';
import { LanguageContext } from '../../context/LanguageContext';

const HistoryTab = () => {
  const { data } = useDashboard();
  const { t } = useContext(LanguageContext);
  
  const categories = data?.categories?.map(c => c.category) || ['air_quality', 'weather', 'traffic'];
  
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [timeRange, setTimeRange] = useState('7D'); // 7D, 1M, 3M

  return (
    <div className="glass-panel rounded-xl p-6 animate-fade-in shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        
        {/* Category Selector */}
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 5).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                selectedCategory === cat 
                  ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]' 
                  : 'bg-[var(--color-base)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Time Range */}
        <div className="flex bg-[var(--color-base)] p-1 rounded-lg border border-[var(--color-border)]">
          {['7D', '1M', '3M'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium ${
                timeRange === range 
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-1">
          {t(`categories.${selectedCategory}`)} Trends
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm">
          Condition has been mostly stable over the past {timeRange === '7D' ? 'week' : timeRange === '1M' ? 'month' : '3 months'}.
        </p>
      </div>

      <TrendChart category={selectedCategory} timeRange={timeRange} />
    </div>
  );
};

export default HistoryTab;
