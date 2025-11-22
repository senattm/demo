import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Address } from '@/types';

interface UserStore {
  user: User;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (addressId: string, address: Address) => void;
  deleteAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

const defaultUser: User = {
  isAuthenticated: false,
  addresses: [],
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: defaultUser,

      login: (user) => {
        set({ user: { ...user, addresses: user.addresses || [] } });
      },

      logout: () => {
        set({ user: defaultUser });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      addAddress: (address) => {
        set((state) => {
          const addresses = state.user.addresses || [];
          const newAddresses = address.isDefault
            ? addresses.map((addr) => ({ ...addr, isDefault: false }))
            : addresses;
          
          return {
            user: {
              ...state.user,
              addresses: [...newAddresses, address],
            },
          };
        });
      },

      updateAddress: (addressId, updatedAddress) => {
        set((state) => {
          const addresses = state.user.addresses || [];
          const newAddresses = updatedAddress.isDefault
            ? addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === addressId ? true : false,
              }))
            : addresses.map((addr) =>
                addr.id === addressId ? updatedAddress : addr
              );

          return {
            user: {
              ...state.user,
              addresses: newAddresses,
            },
          };
        });
      },

      deleteAddress: (addressId) => {
        set((state) => ({
          user: {
            ...state.user,
            addresses: (state.user.addresses || []).filter(
              (addr) => addr.id !== addressId
            ),
          },
        }));
      },

      setDefaultAddress: (addressId) => {
        set((state) => ({
          user: {
            ...state.user,
            addresses: (state.user.addresses || []).map((addr) => ({
              ...addr,
              isDefault: addr.id === addressId,
            })),
          },
        }));
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

