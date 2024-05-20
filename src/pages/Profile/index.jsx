// import React from "react";
// import { useParams } from "react-router-dom";
// import { useProfile } from "../../hooks/useProfile"; // Adjust the import according to your hooks file location

// export const ProfilePage = () => {
//   const { name } = useParams();
//   const { profile, loading, error } = useProfile(name);

//   if (loading) return <p>Loading...</p>;
//   if (error) {
//     if (error.includes("404")) {
//       return <p>User not found</p>;
//     }
//     return <p>Error: {error}</p>;
//   }

//   // Check if profile is null
//   if (!profile) {
//     return <p>Profile not found</p>;
//   }

//   return (
//     <div>
//       <h1>{profile.name}'s Profile</h1>
//       {/* Add conditional rendering for avatar */}
//       {profile.avatar && (
//         <img src={profile.avatar.url} alt={`${profile.name}'s avatar`} />
//       )}
//       <p>Email: {profile.email}</p>
//       {profile.venueManager ? (
//         <div>
//           <h2>Venues</h2>
//           {/* Render user's venues */}
//         </div>
//       ) : (
//         <div>
//           <h2>Bookings</h2>
//           {/* Render user's bookings */}
//         </div>
//       )}
//     </div>
//   );
// };
import React from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile"; // Adjust the import according to your hooks file location

export const ProfilePage = () => {
  const { name } = useParams();
  const { profile, loading, error } = useProfile(name);

  console.log(name);

  if (loading) return <p>Loading...</p>;
  if (error) {
    if (error.includes("404")) {
      return <p>User not found</p>;
    }
    return <p>Error: {error}</p>;
  }

  if (!profile) {
    return <p>Profile not found</p>;
  }

  return (
    <div>
      <h1>{profile.name}'s Profile</h1>
      {profile.avatar && (
        <img src={profile.avatar.url} alt={`${profile.name}'s avatar`} />
      )}
      <p>Email: {profile.email}</p>
      {profile.venueManager ? (
        <div>
          <h2>Venues</h2>
          {/* Render user's venues */}
        </div>
      ) : (
        <div>
          <h2>Bookings</h2>
          {/* Render user's bookings */}
        </div>
      )}
    </div>
  );
};
