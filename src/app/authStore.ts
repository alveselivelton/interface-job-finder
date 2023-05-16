import { create } from "zustand";
import { getCurrentUser } from "../api/userApi";

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
  checkUser: async () => {
    const json = localStorage.getItem("user");

    if (json) {
      const { token, _id } = JSON.parse(json);

      const user = await getCurrentUser(token);

      if (!user._id) return;

      set((state) => ({
        auth: (state.auth = true),
        userId: (state.userId = _id),
        token: (state.token = token),
      }));
    }
  },
  logout: () => {
    localStorage.setItem("user", "");

    set((state) => ({
      auth: (state.auth = false),
    }));
  },
}));
