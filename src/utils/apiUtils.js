// export const getApiKey = async (token) => {
//   try {
//     const response = await fetch(
//       "https://v2.api.noroff.dev/api/v1/auth/create-api-key",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       const errorDetails = await response.json(); // Fetch error details from the response
//       throw new Error(
//         `Failed to fetch API key: ${response.status}, ${errorDetails.message}`
//       );
//     }

//     const data = await response.json();
//     return data.apiKey;
//   } catch (error) {
//     console.error("Error fetching API Key:", error);
//     return null; // Ensure to handle null return
//   }
// };

export const fetchApi = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const fetchOptions = {
    ...options,
    headers,
  };

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    const errorBody = await response.json();
    const errorMessage = errorBody.message || `Status code: ${response.status}`;
    throw new Error(`API request failed: ${errorMessage}`);
  }
  return response.json();
};
