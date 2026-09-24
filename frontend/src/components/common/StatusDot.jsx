import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

const StatusDot = ({ status }) => {
  const { t } = useContext(LanguageContext);

  const colors = {
    green: 'bg-[#7CAA6E]',
    amber: 'bg-[#C4A23D]',
    red: 'bg-[#C27156]',
    grey: 'bg-[#B8B3AD]',
  };

  if (!status) return null;

  const statusKey = status;
  const colorClass = colors[statusKey] || colors.grey;
  const labelKey = statusKey === 'grey' ? 'unavailable' : statusKey;

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${colorClass}`} aria-hidden="true" />
      <span className="text-sm font-medium text-[var(--color-text-secondary)]">
        {t(`status.${labelKey}`)}
      </span>
    </div>
  );
};

export default StatusDot;
