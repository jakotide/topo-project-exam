import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        console.log("Full response:", result);

        const { data } = result;
        const { accessToken, name, email, avatar } = data;
        const venueManager = JSON.parse(localStorage.getItem("venueManager"));

        console.log("Access Token:", accessToken);
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Avatar:", avatar);
        console.log("Venue Manager:", venueManager);

        const user = {
          accessToken,
          name,
          email,
          avatar,
          venueManager,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
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

  return { login, loading, error, isLoggedIn };
};
