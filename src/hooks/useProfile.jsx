import { useEffect, useState } from "react";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = {
    _bookings: "&_bookings=true",
    _owner: "?_owner=true",
    _venues: "?_venues=true",
    _venue: "?_venue=true",
    _customer: "&_customer=true",
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("user");

    if (userInfo) {
      const { name: username, accessToken: token } = JSON.parse(userInfo);

      const fetchProfile = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `https://v2.api.noroff.dev/holidaze/profiles/${username}/${params._bookings}/${params._venues}`,
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

      fetchProfile();
    } else {
      setLoading(false);
      setError("User is not logged in");
    }
  }, []);

  return { profile, loading, error };
};
