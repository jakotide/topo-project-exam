// src/hooks/useRegister.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore"; // Adjust the path accordingly
import { fetchApi } from "../utils/fetchApi";

const useRegister = () => {
  const navigate = useNavigate();
  const { logIn, setAccessToken } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userDetails) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchApi(
        `${API_BASE_URL_V2}${ENDPOINTS.register}`,
        {
          method: "POST",
          body: JSON.stringify(userDetails),
        }
      );

      const data = response.data;
      if (data.accessToken && data.name) {
        setAccessToken(data.accessToken);

        const userTypeKey = userDetails.isVenueManager
          ? "venueManager"
          : "customer";

        logIn({
          username: data.name,
          name: data.name,
          email: data.email,
          bio: data.bio,
          avatar: data.avatar,
          banner: data.banner,
          accessToken: data.accessToken,
          userType: userTypeKey,
        });

        navigate("/"); // Redirect to homepage or appropriate dashboard
      } else {
        throw new Error(
          "Registration failed: No access token or username received"
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export { useRegister };
