import { create } from "zustand";

interface NavigationState {
  previousRoute: string | null;
  setPreviousRoute: (path: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  previousRoute: null,
  setPreviousRoute: (path: string) => set({ previousRoute: path }),
}));
