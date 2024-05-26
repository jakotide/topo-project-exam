import { useState, useEffect, useRef } from "react";
export function useApi(url, { token, ...options } = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const headers = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...optionsRef.current.headers,
        };

        const response = await fetch(url, {
          ...optionsRef.current,
          headers,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, token]);

  return { data, isLoading, isError };
}
