import { create } from "zustand";

type State = {
  auth: boolean;
  userId: string;
  token: string;
  checkUser: () => void;
  logout: () => void;
};

export const useAuthStore = create<State>((set) => ({
  auth: false,
  userId: "",
  token: "",
  checkUser: () => {
    const { token, _id } = JSON.parse(localStorage.getItem("user") || "false");

    if (token && _id) {
      set((state) => ({
        auth: (state.auth = true),
        userId: (state.userId = _id),
        token: (state.token = token),
      }));
    }
  },
  logout: () => {
    localStorage.removeItem("user");

    set((state) => ({
      auth: (state.auth = false),
    }));
  },
}));
