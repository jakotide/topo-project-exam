// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const useUserStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       apiKey: null, // Add apiKey to the store
//       setUser: (user) => set({ user }),
//       setApiKey: (apiKey) => set({ apiKey }), // Add action to set apiKey
//       clearUser: () => set({ user: null, apiKey: null }), // Clear apiKey when user is cleared
//       updateStoreAvatar: (avatar) =>
//         set((state) => ({
//           user: { ...state.user, avatar },
//         })),
//       updateStoreVenueManager: (venueManager) =>
//         set((state) => ({
//           user: { ...state.user, venueManager },
//         })),
//     }),
//     {
//       name: "user-store",
//     }
//   )
// );

// export const useUser = () => useUserStore((state) => state.user);
// export const useApiKey = () => useUserStore((state) => state.apiKey); // Add hook to access apiKey
// export const useUserActions = () => {
//   const {
//     setUser,
//     clearUser,
//     updateStoreAvatar,
//     updateStoreVenueManager,
//     setApiKey,
//   } = useUserStore();
//   return {
//     setUser,
//     clearUser,
//     updateStoreAvatar,
//     updateStoreVenueManager,
//     setApiKey,
//   };
// };
// export const useToken = () => useUserStore((state) => state.user?.accessToken);
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      apiKey: null,
      setUser: (user) => set({ user }),
      setApiKey: (apiKey) => set({ apiKey }), // Add action to set apiKey
      clearUser: () => set({ user: null, apiKey: null }), // Clear apiKey when user is cleared
      updateStoreAvatar: (avatar) =>
        set((state) => ({
          user: { ...state.user, avatar },
        })),
      updateStoreVenueManager: (venueManager) =>
        set((state) => ({
          user: { ...state.user, venueManager },
        })),
    }),
    {
      name: "user-store",
    }
  )
);

export const useUser = () => useUserStore((state) => state.user);
export const useApiKey = () => useUserStore((state) => state.apiKey);
export const useUserActions = () => {
  const {
    setUser,
    clearUser,
    updateStoreAvatar,
    updateStoreVenueManager,
    setApiKey,
  } = useUserStore();
  return {
    setUser,
    clearUser,
    updateStoreAvatar,
    updateStoreVenueManager,
    setApiKey,
  };
};
export const useToken = () => useUserStore((state) => state.user?.accessToken);
