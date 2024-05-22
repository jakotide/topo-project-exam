// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const useUserStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       setUser: (user) => set({ user }),
//       clearUser: () => set({ user: null }),
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
// export const useUserActions = () => {
//   const { setUser, clearUser, updateStoreAvatar, updateStoreVenueManager } =
//     useUserStore();
//   return { setUser, clearUser, updateStoreAvatar, updateStoreVenueManager };
// };
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
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
export const useUserActions = () => {
  const { setUser, clearUser, updateStoreAvatar, updateStoreVenueManager } =
    useUserStore();
  return { setUser, clearUser, updateStoreAvatar, updateStoreVenueManager };
};
export const useToken = () => useUserStore((state) => state.user?.accessToken);
