// import { useEffect, useState } from "react";
// import { createApiKey } from "../api/auth/createApiKey";
// import { useToken, useUserActions } from "./useStore";

// export const useFetchApiKey = () => {
//   const token = useToken();
//   const { setApiKey } = useUserActions();
//   const [apiKey, setStoredApiKey] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchApiKey = async () => {
//     try {
//       if (!token) {
//         throw new Error("No token available");
//       }
//       setLoading(true);

//       if (!apiKey) {
//         const newApiKey = await createApiKey(token);
//         setStoredApiKey(newApiKey);
//         setApiKey(newApiKey);
//         console.log(newApiKey);
//       }
//     } catch (error) {
//       console.error("Error creating API key:", error.message);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchApiKey();
//     }
//   }, [token, apiKey]);

//   return { apiKey, loading, error };
// };
import { useEffect, useState } from "react";
import { createApiKey } from "../api/auth/createApiKey";
import { useToken, useUserActions, useApiKey } from "./useStore";

export const useFetchApiKey = () => {
  const token = useToken();
  const { setApiKey } = useUserActions();
  const storedApiKey = useApiKey(); // Retrieve API key from the store
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
          // Check if API key is already stored
          const newApiKey = await createApiKey(token);
          setApiKey(newApiKey); // Set the API key in the store
        }
      } catch (error) {
        console.error("Error creating API key:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApiKey();
  }, [token, storedApiKey, setApiKey]);

  return { loading, error }; // Return loading state and error message
};
