import { useState, useEffect } from "react";
import { useUserStore } from "./useStore";
import { useParams } from "react-router-dom";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useUserStore((state) => state.user?.accessToken);
  const { name } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://v2.api.noroff.dev/api/v1/holidaze/profiles/${name}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.status}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && name) {
      fetchProfile();
    }
  }, [name, token]);

  return { profile, loading, error };
};
