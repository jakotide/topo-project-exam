const API_BASE_V2 = "https://v2.api.noroff.dev/holidaze";

// export const getBookings = async (name, token, apiKey) => {
//   {
//     token, apiKey, name;
//   }
//   try {
//     const response = await fetch(`${API_BASE_V2}/profiles/${name}/bookings`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//         "X-Noroff-API-Key": apiKey,
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch bookings");
//     }

//     const data = await response.json();
//     return data.data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
// export const getBookings = async (name, token, apiKey) => {
//   try {
//     const response = await fetch(`${API_BASE_V2}/profiles/${name}/bookings`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//         "X-Noroff-API-Key": apiKey,
//       },
//     });

//     console.log("Response from API:", response);

//     if (!response.ok) {
//       throw new Error("Failed to fetch bookings");
//     }

//     const data = await response.json();
//     return data; // Return the entire data object, no need for data.data
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
export const getBookings = async (name, token, apiKey) => {
  try {
    const response = await fetch(
      `${API_BASE_V2}/profiles/${name}/bookings?_venue=true`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      }
    );

    console.log("Response from API:", response);

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const responseData = await response.json();
    const bookings = responseData.data; // Extract bookings from responseData
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};
