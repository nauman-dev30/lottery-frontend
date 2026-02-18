import { useState, useEffect } from 'react';
import { fetchLatestDraw } from '../backendServices/drawService';

export const useLatestDraw = () => {
  const [latestDraw, setLatestDraw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLatestDraw = async () => {
      try {
        setLoading(true);
        const draw = await fetchLatestDraw();
        setLatestDraw(draw);
        setError(null);
      } catch (err) {
        setError(err);
        console.error('Failed to fetch latest draw:', err);
      } finally {
        setLoading(false);
      }
    };

    getLatestDraw();
  }, []);

  return { latestDraw, loading, error };
};