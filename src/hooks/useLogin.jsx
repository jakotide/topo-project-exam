// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const useLogin = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const login = async (email, password) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("https://v2.api.noroff.dev/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         console.log("Login response data:", data);
//         localStorage.setItem("accessToken", data.data.accessToken);
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

//   return { login, loading, error };
// };

// useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "./useStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUserActions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (response.ok) {
        console.log("Login response data:", result.data);
        const { accessToken, name, email, avatar, venueManager } = result.data;
        setUser({
          accessToken,
          name,
          email,
          avatar,
          venueManager,
        });
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
