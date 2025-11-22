import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FirstOrderDiscount {
  code: string;
  discount: number;
  isApplied: boolean;
}

interface CouponStore {
  firstOrderDiscount: FirstOrderDiscount;
  applyFirstOrderDiscount: (code: string, hasOrders: boolean) => { success: boolean; message: string };
  removeDiscount: () => void;
  getDiscount: (cartTotal: number) => number;
}

export const useCouponStore = create<CouponStore>()(
  persist(
    (set, get) => ({
      firstOrderDiscount: {
        code: 'İLK10',
        discount: 10,
        isApplied: false,
      },

      applyFirstOrderDiscount: (code: string, hasOrders: boolean) => {
        const upperCode = code.toUpperCase().trim();
        const validCode = get().firstOrderDiscount.code.toUpperCase();

        if (upperCode !== validCode) {
          return {
            success: false,
            message: 'Geçersiz kod. İlk siparişinizde "İLK10" kodunu kullanarak %10 indirim kazanabilirsiniz.',
          };
        }

        if (hasOrders) {
          return {
            success: false,
            message: 'Bu indirim yalnızca ilk siparişinizde geçerlidir.',
          };
        }

        set((state) => ({
          firstOrderDiscount: { ...state.firstOrderDiscount, isApplied: true },
        }));

        return {
          success: true,
          message: 'İlk sipariş indirimi uygulandı! %10 indirim kazandınız.',
        };
      },

      removeDiscount: () => {
        set((state) => ({
          firstOrderDiscount: { ...state.firstOrderDiscount, isApplied: false },
        }));
      },

      getDiscount: (cartTotal: number) => {
        const { firstOrderDiscount } = get();
        if (!firstOrderDiscount.isApplied) return 0;
        return (cartTotal * firstOrderDiscount.discount) / 100;
      },
    }),
    {
      name: 'coupon-storage',
    }
  )
);

