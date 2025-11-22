import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface UserStore {
  user: User;
  login: (user: User) => void;
  logout: () => void;
}

const defaultUser: User = {
  isAuthenticated: false,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: defaultUser,

      login: (user) => {
        set({ user });
      },

      logout: () => {
        set({ user: defaultUser });
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

