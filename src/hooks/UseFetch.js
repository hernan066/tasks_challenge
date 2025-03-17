import { useState, useCallback } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (method = "GET", body = null) => {
      setLoading(true);
      setError(null);
      try {
        const options = {
          method,
          headers: { "Content-Type": "application/json" },
          body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        return result; // Devuelve los datos en caso de POST, PUT, DELETE
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { data, loading, error, request };
}
