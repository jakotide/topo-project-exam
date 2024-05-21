// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const useRegister = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const register = async (userDetails) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     const requestData = {
//       name: userDetails.name,
//       email: userDetails.email,
//       password: userDetails.password,
//       // bio: userDetails.bio,
//       // avatar: {
//       //   url: userDetails.avatarUrl,
//       //   alt: userDetails.avatarAlt,
//       // },
//       // banner: {
//       //   url: userDetails.bannerUrl,
//       //   alt: userDetails.bannerAlt,
//       // },
//       venueManager: userDetails.venueManager || false,
//     };

//     console.log("Request Data:", requestData);

//     try {
//       const response = await fetch("https://v2.api.noroff.dev/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestData),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage || "Failed to register");
//       }

//       const data = await response.json();
//       setSuccess(true);
//       setTimeout(() => navigate("/login"), 3000);
//     } catch (error) {
//       console.error(error);
//       setError("Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { register, loading, error, success };
// };

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async (userDetails) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const requestData = {
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
      // bio: userDetails.bio,
      // avatar: {
      //   url: userDetails.avatarUrl,
      //   alt: userDetails.avatarAlt,
      // },
      // banner: {
      //   url: userDetails.bannerUrl,
      //   alt: userDetails.bannerAlt,
      // },
    };

    console.log("Request Data:", requestData);

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to register");
      }

      const data = await response.json();
      localStorage.setItem(
        "venueManager",
        JSON.stringify(userDetails.venueManager)
      );
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error(error);
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};
