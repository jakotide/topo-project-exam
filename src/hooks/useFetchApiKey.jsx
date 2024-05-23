import { useEffect, useState } from "react";
import { createApiKey } from "../api/auth/createApiKey";
import { useToken, useApiKey, useUserActions } from "./useStore";

export const useFetchApiKey = () => {
  const token = useToken();
  const apiKey = useApiKey(); // Add apiKey state
  const { setApiKey } = useUserActions();
  const [error, setError] = useState(null);

  const fetchApiKey = async () => {
    // Add fetchApiKey function
    if (!token) {
      setError("No token available");
      return;
    }
    try {
      const newApiKey = await createApiKey(token);
      setApiKey(newApiKey);
    } catch (error) {
      console.error("Error creating API key:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    const generateApiKeyIfNeeded = async () => {
      if (!apiKey) {
        await fetchApiKey(); // Use fetchApiKey function
      }
    };

    generateApiKeyIfNeeded();
  }, [token, apiKey, setApiKey]);

  return { apiKey, error, fetchApiKey }; // Return fetchApiKey function
};
