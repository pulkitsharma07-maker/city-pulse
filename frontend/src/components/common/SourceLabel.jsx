import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

const SourceLabel = ({ source }) => {
  const { t } = useContext(LanguageContext);
  
  if (!source) return null;

  const isLive = source.type === 'real';
  const typeLabel = isLive ? t('common.live') : t('common.demo');

  return (
    <div className="text-xs text-[var(--color-text-tertiary)] flex items-center gap-1 mt-2">
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
      {typeLabel} &middot; {source.name}
    </div>
  );
};

export default SourceLabel;
