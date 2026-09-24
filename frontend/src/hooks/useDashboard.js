import { useState, useEffect, useContext } from 'react';
import { LocationContext } from '../context/LocationContext';

export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { lat, lng } = useContext(LocationContext);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/v1/dashboard?lat=${lat}&lng=${lng}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const result = await response.json();
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    if (lat && lng) {
      fetchData();
      
      const intervalId = setInterval(fetchData, 5 * 60 * 1000); // 5 min polling
      return () => {
        isMounted = false;
        clearInterval(intervalId);
      };
    }
  }, [lat, lng]);

  return { data, loading, error };
};
