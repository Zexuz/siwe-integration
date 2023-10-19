import { create } from "zustand";

interface UserInfo {
  id: string;
  username: string;
  bio: string;
}

interface UserStore {
  refresh: () => Promise<void>;
  userInfo: UserInfo;
  token: string | undefined;
  setToken: (token: string) => void;
  update: (newState: Omit<UserInfo, "id">) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  userInfo: {
    id: "",
    username: "",
    bio: "",
  },
  token: "",
  setToken: (token: string) => set({ token }),
  update: async (newState) => {
    const token = get().token;

    const baseUrl = "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/user/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: newState.username,
        bio: newState.bio,
      }),
    });

    if (response.status === 200) {
      const { username, bio, id } = await response.json();
      set({
        userInfo: {
          username,
          bio,
          id,
        },
      });
    }
  },
  refresh: async () => {
    const token = get().token;

    const baseUrl = "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const { username, bio, id } = await response.json();
      set({
        userInfo: {
          username,
          bio,
          id,
        },
      });
    }
  },
}));
