import React, { useState, useContext, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import StatusDot from '../common/StatusDot';
import SourceLabel from '../common/SourceLabel';
import { LanguageContext } from '../../context/LanguageContext';

const renderDetailValue = (val, t) => {
  if (Array.isArray(val)) {
    return (
      <div className="mt-2 space-y-2">
        {val.map((item, idx) => (
          <div key={idx} className="bg-[var(--color-base)] p-3 rounded-lg border border-[var(--color-border)] shadow-sm">
            {(item.road || item.location || item.name || item.title) && (
              <div className="font-semibold text-sm mb-2 pb-1 border-b border-[var(--color-border)] text-[var(--color-text-primary)]">
                {item.road || item.location || item.name || item.title}
              </div>
            )}
            <div className="space-y-1">
              {Object.entries(item)
                .filter(([k]) => !['road', 'location', 'name', 'title', 'lat', 'lng'].includes(k))
                .map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs">
                    <span className="capitalize text-[var(--color-text-secondary)]">{t(`detail_keys.${k}`) || k.replace(/_/g, ' ')}:</span>
                    <span className="font-medium text-[var(--color-text-primary)] text-right ml-2">{String(v)}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (typeof val === 'object' && val !== null) {
    return (
       <div className="mt-1 space-y-1 bg-[var(--color-base)] p-2 rounded-lg border border-[var(--color-border)]">
          {Object.entries(val).map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="capitalize text-[var(--color-text-secondary)]">{t(`detail_keys.${k}`) || k.replace(/_/g, ' ')}:</span>
                <span className="font-medium text-[var(--color-text-primary)] text-right ml-2">{String(v)}</span>
              </div>
          ))}
       </div>
    );
  }

  return <div className="text-sm font-medium text-[var(--color-text-primary)] mt-1">{val}</div>;
};

const CategoryCard = ({ category }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useContext(LanguageContext);
  const contentRef = useRef(null);

  const IconComponent = LucideIcons[category.icon ? category.icon.charAt(0).toUpperCase() + category.icon.slice(1).replace(/-./g, x=>x[1].toUpperCase()) : 'Info'] || LucideIcons.Info;

  return (
    <div className="glass-panel rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--color-surface)] bg-opacity-50 rounded-lg shadow-inner">
              <IconComponent size={20} className="text-[var(--color-accent)]" />
            </div>
            <h3 className="font-semibold text-[var(--color-text-primary)] tracking-tight">
              {t(`categories.${category.category}`)}
            </h3>
          </div>
          <StatusDot status={category.status} />
        </div>
        
        <p className="text-[var(--color-text-secondary)] text-sm mb-4 font-medium">
          {category.summary || t('common.no_data')}
        </p>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-[var(--color-accent)] text-sm font-semibold hover:opacity-80 flex items-center gap-1 transition-opacity"
        >
          {expanded ? t('common.view_less') : t('common.view_more')}
          <LucideIcons.ChevronDown size={16} className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div 
        ref={contentRef}
        className="transition-all duration-500 ease-in-out overflow-hidden bg-black/5 border-t border-[var(--color-border)]"
        style={{ 
          maxHeight: expanded ? `${contentRef.current?.scrollHeight}px` : '0px',
          opacity: expanded ? 1 : 0
        }}
      >
        <div className="p-5">
          {category.detail && (
            <div className="flex flex-col gap-4 mb-4">
              {Object.entries(category.detail).map(([key, value]) => (
                <div key={key}>
                  <div className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider font-semibold">{t(`detail_keys.${key}`) || key.replace(/_/g, ' ')}</div>
                  {renderDetailValue(value, t)}
                </div>
              ))}
            </div>
          )}
          
          {category.ai_blurb && (
            <div className="bg-[var(--color-base)] p-3 rounded-lg border border-[var(--color-border)] mb-4">
              <div className="flex items-start gap-2">
                <LucideIcons.Sparkles size={16} className="text-[var(--color-accent)] mt-0.5 shrink-0" />
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {category.ai_blurb}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <SourceLabel source={category.source} />
            <div className="text-xs text-[var(--color-text-tertiary)]">
              {category.timestamp ? new Date(category.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
