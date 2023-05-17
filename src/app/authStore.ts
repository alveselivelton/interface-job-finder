import { create } from "zustand";
import { getCurrentUser } from "../api/userApi";

type User = {
  _id: string;
  token: string;
};

type State = {
  auth: boolean;
  user: User;
  checkUser: () => void;
  logout: () => void;
};

export const useAuthStore = create<State>((set) => ({
  auth: false,
  user: JSON.parse(localStorage.getItem("user") || "false"),
  checkUser: async () => {
    const json = localStorage.getItem("user");

    if (!json) return;

    const { token, _id } = JSON.parse(json);

    const user = await getCurrentUser(token);

    if (!user._id) return;

    set((state) => ({
      auth: (state.auth = true),
      user: (state.user = { token, _id }),
    }));
  },
  logout: () => {
    localStorage.setItem("user", "");

    set((state) => ({
      auth: (state.auth = false),
    }));
  },
}));
