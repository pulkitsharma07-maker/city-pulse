import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

const StatusDot = ({ status }) => {
  const { t } = useContext(LanguageContext);

  if (!status) return null;

  const statusKey = status;
  let badgeClass = 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
  
  if (statusKey === 'green') {
    badgeClass = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
  } else if (statusKey === 'amber') {
    badgeClass = 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
  } else if (statusKey === 'red') {
    badgeClass = 'bg-red-500/20 text-red-300 border border-red-500/30';
  }

  const labelKey = statusKey === 'grey' ? 'unavailable' : statusKey;

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
      <div className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse`} aria-hidden="true" />
      <span>{t(`status.${labelKey}`)}</span>
    </div>
  );
};

export default StatusDot;
