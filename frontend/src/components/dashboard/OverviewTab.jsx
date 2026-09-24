import React from 'react';
import CategoryCard from './CategoryCard';
import HeroSection from './HeroSection';
import { useDashboard } from '../../hooks/useDashboard';
import { useNotifications } from '../../hooks/useNotifications';
import { AlertCircle } from 'lucide-react';

const defaultCategories = [
  { category: 'air_quality', icon: 'wind', status: 'grey', summary: '', source: null, ai_blurb: '' },
  { category: 'weather', icon: 'sun', status: 'grey', summary: '', source: null, ai_blurb: '' },
  { category: 'road_damage', icon: 'alert-triangle', status: 'grey', summary: '', source: null, ai_blurb: '' },
  { category: 'traffic', icon: 'car', status: 'grey', summary: '', source: null, ai_blurb: '' },
  { category: 'public_transit', icon: 'bus', status: 'grey', summary: '', source: null, ai_blurb: '' },
  { category: 'road_closures', icon: 'construction', status: 'grey', summary: '', source: null, ai_blurb: '' },
  { category: 'whats_happening', icon: 'newspaper', status: 'grey', summary: '', source: null, ai_blurb: '' }
];

const OverviewTab = () => {
  const { data, loading, error } = useDashboard();
  
  // Use notifications to fire toasts automatically
  useNotifications(data);

  // If loading or error, we still show the cards but in 'grey' state if no data available yet
  const displayCategories = data?.categories || defaultCategories;

  return (
    <div className="space-y-6 animate-fade-in relative">
      <HeroSection />
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle size={20} />
          <p>Failed to load live data. Showing cached or unavailable status.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCategories.map(cat => (
          <CategoryCard key={cat.category} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default OverviewTab;
