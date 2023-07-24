import { create } from "zustand";

type PromotionStore = {
  status: boolean;
  toggle: () => void;
};

export const usePromotionStatus = create<PromotionStore>((set) => ({
  status: false,
  toggle: () =>
    set((state) => ({
      status: !state.status,
    })),
}));
