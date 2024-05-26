import { useEffect, useState } from "react";
import { createApiKey } from "../api/auth/createApiKey";
import { useToken, useUserActions, useApiKey } from "./useStore";

export const useFetchApiKey = () => {
  const token = useToken();
  const { setApiKey } = useUserActions();
  const storedApiKey = useApiKey();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        if (!token) {
          throw new Error("No token available");
        }

        setLoading(true);

        if (!storedApiKey) {
          const newApiKey = await createApiKey(token);
          setApiKey(newApiKey);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApiKey();
  }, [token, storedApiKey, setApiKey]);

  return { loading, error };
};
