import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Bear = {
  name: string;
  description: string;
};

type BearStore = {
  bears: Bear[];
  addBear: (bear: Bear) => void;
  removeBear: (name: string) => void;
};

const useBear = create<BearStore>()(
  devtools(
    persist(
      (set) => ({
        bears: [],
        addBear: (bear) =>
          set((state) => ({
            bears: [...state.bears, bear],
          })),
        removeBear: (name) =>
          set((state) => ({
            bears: state.bears.filter((b) => b.name !== name),
          })),
      }),
      { name: "bearStore" }
    )
  )
);

export default useBear;
