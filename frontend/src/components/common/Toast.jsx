import React, { useEffect } from 'react';

// For simplicity, we just use a basic toast that accepts a prop here.
// In a full implementation we might tie this to context or the useNotifications hook globally.
const Toast = ({ notifications = [], removeNotification }) => {
  if (notifications.length === 0) return null;

  const current = notifications[0]; // Show one at a time

  useEffect(() => {
    const timer = setTimeout(() => {
      if (removeNotification && current) {
        removeNotification(current.id);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [current, removeNotification]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
      <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
        {current.type === 'warning' && <div className="w-2 h-2 rounded-full bg-amber-500"></div>}
        <p className="text-sm font-medium">{current.message}</p>
        <button 
          onClick={() => removeNotification(current.id)}
          className="ml-auto text-gray-400 hover:text-white"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
