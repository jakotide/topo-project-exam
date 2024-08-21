import { setDate } from "date-fns";
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

        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const json = await response.json();
        console.log("Raw JSON Response:", json);

        // Check if the response contains data
        if (json.data && Array.isArray(json.data)) {
          setData(json.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, token]);

  return { data, isLoading, isError };
}

export function useSingleVenue(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchSingleVenue() {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);

        if (!response) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSingleVenue();
  }, [url]);

  return { data, isLoading, isError };
}
