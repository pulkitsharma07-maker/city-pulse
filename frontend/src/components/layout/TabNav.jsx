import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

const TabNav = ({ activeTab, setActiveTab }) => {
  const { t } = useContext(LanguageContext);
  const tabs = [
    { id: 'overview', label: t('tabs.overview') },
    { id: 'map', label: t('tabs.map') },
    { id: 'history', label: t('tabs.history') }
  ];

  return (
    <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-[104px] md:top-16 z-30">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)]'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNav;
