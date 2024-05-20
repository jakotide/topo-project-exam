// useUserStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
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
      name: "user", // key to store in localStorage
    }
  )
);

export const useToken = () => useUserStore((state) => state.user?.accessToken);

export const useUserActions = () => {
  const { setUser, clearUser, updateStoreAvatar, updateStoreVenueManager } =
    useUserStore();
  return { setUser, clearUser, updateStoreAvatar, updateStoreVenueManager };
};

export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.user?.accessToken);

  const isLoggedIn = !!user && !!token;

  return { user, token, isLoggedIn };
};
