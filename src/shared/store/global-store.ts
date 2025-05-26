import { create } from "zustand";

interface GlobalStore {}

const useGlobalStore = create<GlobalStore>(() => ({}));

export default useGlobalStore;
