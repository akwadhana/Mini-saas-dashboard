import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  phone: string;
  role: string;
  name: string;
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  hydrated: boolean;

  signup: (user: User) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  setHydrated: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hydrated: false,

      signup: (user) => {
        localStorage.setItem("registeredUser", JSON.stringify(user));
      },

      login: (email, password) => {
        const saved = localStorage.getItem("registeredUser");
        if (!saved) return false;

        const user: User = JSON.parse(saved);

        if (user.email === email && user.password === password) {
          set({ user, isAuthenticated: true });
          return true;
        }

        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      // ✅ Update user profile and sync with localStorage
      updateProfile: (data) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedUser = { ...currentUser, ...data };
        set({ user: updatedUser });

        // update localStorage as well
        localStorage.setItem("registeredUser", JSON.stringify(updatedUser));
      },

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
