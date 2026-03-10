import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RoomState {
  roomCode: string;
  realtimeCode: string;
  setRoomCode: (code: string) => void;
  setRealtimeCode: (code: string) => void;
}

export const useRoomStore = create<RoomState>()(
  persist(
    (set) => ({
      roomCode: '00000',
      realtimeCode: '',
      setRoomCode: (code) => set({ roomCode: code }),
      setRealtimeCode: (code) => set({ realtimeCode: code }),
    }),
    { name: 'chatland-room' }
  )
);
