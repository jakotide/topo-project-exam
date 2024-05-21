import { useEffect, useState } from "react";

export const useProfile = (token, username) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfile(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && username) {
      fetchProfile();
    }
  }, [token, username]);

  return { profile, loading, error };
};
