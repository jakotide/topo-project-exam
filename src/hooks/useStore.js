import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  logIn: (user) => set({ user, accessToken: user.accessToken }),
  logOut: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null });
  },
}));

export default useStore;
