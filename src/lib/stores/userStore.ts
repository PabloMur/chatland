import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userName: string;
  userEmail: string;
  userImage: string;
  userPassword: string;
  userToken: string;
  userRooms: string[];
  userGuestRooms: string[];
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
  setUserImage: (image: string) => void;
  setUserPassword: (password: string) => void;
  setUserToken: (token: string) => void;
  setUserRooms: (rooms: string[]) => void;
  setUserGuestRooms: (rooms: string[]) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userName: 'user',
      userEmail: '',
      userImage: '',
      userPassword: '',
      userToken: '',
      userRooms: [],
      userGuestRooms: [],
      setUserName: (name) => set({ userName: name }),
      setUserEmail: (email) => set({ userEmail: email }),
      setUserImage: (image) => set({ userImage: image }),
      setUserPassword: (password) => set({ userPassword: password }),
      setUserToken: (token) => set({ userToken: token }),
      setUserRooms: (rooms) => set({ userRooms: rooms }),
      setUserGuestRooms: (rooms) => set({ userGuestRooms: rooms }),
    }),
    { name: 'chatland-user' }
  )
);
