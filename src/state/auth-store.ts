import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "./storage";

type Props = {
  user: Record<string, any> | null;
  setUser: (user: any) => void;
  setCurrentOrder: (order: any) => void;
  currentOrder: Record<string, any> | null;
  logout: () => void;
};

export const useAuthStore = create<Props>()(
  persist(
    (set, get) => ({
      user: null,
      currentOrder: null,
      setCurrentOrder: (order) => set({ currentOrder: order }),
      setUser: (data) => set({ user: data }),
      logout: () =>
        set({
          user: null,
          currentOrder: null,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
