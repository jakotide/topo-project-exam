// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const useLogin = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const login = async (email, password, onLogin) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("https://v2.api.noroff.dev/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         const { data } = result;
//         const { accessToken, name, email, avatar } = data;
//         const venueManager = JSON.parse(localStorage.getItem("venueManager"));

//         const user = {
//           accessToken,
//           name,
//           email,
//           avatar,
//           venueManager,
//         };

//         localStorage.setItem("user", JSON.stringify(user));
//         window.dispatchEvent(new Event("storage")); // Dispatch storage event
//         // onLogin(user); // Call the onLogin handler
//         navigate("/");
//       } else {
//         setError("Login failed. Please check your credentials.");
//       }
//     } catch (error) {
//       console.error(error);
//       setError("Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     window.dispatchEvent(new Event("storage")); // Dispatch storage event
//     navigate("/login");
//   };

//   return { login, logout, loading, error };
// };
