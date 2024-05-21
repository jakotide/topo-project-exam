// import { useState, useEffect, useRef } from "react";

// export function useApi(url, options = {}) {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const optionsRef = useRef(options); // Using a ref to store options

//   useEffect(() => {
//     async function getData() {
//       try {
//         setIsLoading(true);
//         setIsError(false);

//         const token = localStorage.getItem("accessToken");
//         const headers = {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//           ...optionsRef.current.headers,
//         };

//         const response = await fetch(url, {
//           ...optionsRef.current,
//           headers,
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }

//         const json = await response.json();
//         setData(json);
//       } catch (error) {
//         console.error(error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     getData();
//   }, [url]); // Only depend on the URL

//   return { data, isLoading, isError };
// }
import { useState, useEffect, useRef } from "react";
export function useApi(url, { token, ...options } = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const optionsRef = useRef(options); // Using a ref to store options

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
  }, [url, token]); // Depend on both URL and token

  return { data, isLoading, isError };
}
