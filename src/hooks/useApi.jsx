// import { useState, useEffect } from "react";

// export function useApi(url) {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     async function getData() {
//       try {
//         setIsLoading(true);
//         setIsError(false);
//         const fetchedData = await fetch(url);
//         const json = await fetchedData.json();
//         setData(json);
//       } catch (error) {
//         console.log(error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     getData();
//   }, [url]);
//   return { data, isLoading, isError };
// }

import { useState, useEffect, useRef } from "react";

export function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const optionsRef = useRef(options); // Using a ref to store options

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedData = await fetch(url, optionsRef.current); // Using optionsRef
        const json = await fetchedData.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url]);

  return { data, isLoading, isError };
}
