import React, { useState, useEffect, useContext } from 'react';
import TopBar from './components/layout/TopBar';
import TabNav from './components/layout/TabNav';
import BottomNav from './components/layout/BottomNav';
import OverviewTab from './components/dashboard/OverviewTab';
import MapTab from './components/map/MapTab';
import HistoryTab from './components/history/HistoryTab';
import Toast from './components/common/Toast';
import { LocationProvider } from './context/LocationContext';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider, AccessibilityContext } from './context/AccessibilityContext';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { fontSize, highContrast } = useContext(AccessibilityContext);

  useEffect(() => {
    document.body.className = `${highContrast ? 'high-contrast' : ''} font-${fontSize}`;
  }, [fontSize, highContrast]);

  return (
    <div className="min-h-screen pb-24 lg:pb-0 relative">
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'map' && <MapTab />}
        {activeTab === 'history' && <HistoryTab />}
      </main>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <Toast />
    </div>
  );
};

function App() {
  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <LocationProvider>
          <AppContent />
        </LocationProvider>
      </LanguageProvider>
    </AccessibilityProvider>
  );
}

export default App;
