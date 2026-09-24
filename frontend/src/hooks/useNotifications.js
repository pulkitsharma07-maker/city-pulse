import { useState, useEffect, useRef } from 'react';

export const useNotifications = (dashboardData) => {
  const [notifications, setNotifications] = useState([]);
  const previousDataRef = useRef();

  useEffect(() => {
    if (!dashboardData || !previousDataRef.current) {
      previousDataRef.current = dashboardData;
      return;
    }

    const prev = previousDataRef.current;
    const curr = dashboardData;

    // Simple threshold check example: category status changes to 'red' or 'amber'
    curr.categories?.forEach(currCat => {
      const prevCat = prev.categories?.find(c => c.category === currCat.category);
      if (prevCat && prevCat.status !== currCat.status) {
        if (currCat.status === 'red') {
          addNotification({
            id: Date.now() + Math.random(),
            type: 'warning',
            message: `${currCat.category} condition has worsened to Poor.`,
          });
        }
      }
    });

    previousDataRef.current = curr;
  }, [dashboardData]);

  const addNotification = (notif) => {
    setNotifications(prev => [...prev, notif]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return { notifications, addNotification, removeNotification };
};
