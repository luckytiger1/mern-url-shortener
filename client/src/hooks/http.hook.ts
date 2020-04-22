import { useState, useCallback } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url: any, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
        const res = await fetch(url, {
          method,
          body,
          headers,
        });
        console.log(res);

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
export default useHttp;
