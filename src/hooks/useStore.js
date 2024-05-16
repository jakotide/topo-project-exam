import create from "zustand";

const useStore = create((set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  logIn: (user) => set({ user, accessToken: user.accessToken }),
  logOut: () => set({ user: null, accessToken: null }),
}));

export default useStore;
