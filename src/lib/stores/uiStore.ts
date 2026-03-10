import { create } from 'zustand';

interface UIState {
  menuActive: boolean;
  loader: boolean;
  getInRoomModal: boolean;
  shareCodeModal: boolean;
  deleteRoomModal: boolean;
  setMenuActive: (active: boolean) => void;
  setLoader: (loading: boolean) => void;
  setGetInRoomModal: (open: boolean) => void;
  setShareCodeModal: (open: boolean) => void;
  setDeleteRoomModal: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  menuActive: false,
  loader: false,
  getInRoomModal: false,
  shareCodeModal: false,
  deleteRoomModal: false,
  setMenuActive: (active) => set({ menuActive: active }),
  setLoader: (loading) => set({ loader: loading }),
  setGetInRoomModal: (open) => set({ getInRoomModal: open }),
  setShareCodeModal: (open) => set({ shareCodeModal: open }),
  setDeleteRoomModal: (open) => set({ deleteRoomModal: open }),
}));
