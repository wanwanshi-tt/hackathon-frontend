import { create } from 'zustand';

interface AppState {
  uploadedData: { [key: string]: unknown }[];
  setUploadedData: (data: { [key: string]: unknown }[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  uploadedData: [],
  setUploadedData: (data) => set({ uploadedData: data }),
}));
