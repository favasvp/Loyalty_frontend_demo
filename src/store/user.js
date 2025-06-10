import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useUserStore = create(
  subscribeWithSelector((set, get) => ({
    // User Data
    user: {
      id: "1",
      name: "Abdul Wahaab",
      email: "abdul.wahaab@example.com",
      phone: "+968 9876 5432",
      memberSince: "January 2023",
      tier: "Bronze",
      totalPoints: 50000,
      pointsToNextTier: 25000,
      totalEarned: 75000,
      totalRedeemed: 25000,
      avatar: null,
    },

    // Points & Transactions
    pointsHistory: [
      {
        id: 1,
        type: "earned",
        points: 250,
        description: "App download",
        date: "01-01-2023",
        balance: "2,100.00",
      },
      {
        id: 2,
        type: "burned",
        points: 50,
        description: "Voucher purchase",
        date: "01-01-2023",
        balance: "2,050.00",
      },
      {
        id: 3,
        type: "earned",
        points: 100,
        description: "App download",
        date: "01-01-2023",
        balance: "2,150.00",
      },
    ],

    // Offers & Coupons
    offers: [
      {
        id: 1,
        title: "Footwears",
        discount: "Get 30% off on your first purchase",
        originalPrice: "₹2,999",
        discountedPrice: "₹2,099",
        image: null,
        category: "Fashion",
        brand: "Nike",
      },
      {
        id: 2,
        title: "Footwears",
        discount: "Get 25% off on your first purchase",
        originalPrice: "₹3,499",
        discountedPrice: "₹2,624",
        image: null,
        category: "Fashion",
        brand: "Adidas",
      },
    ],

    coupons: [
      {
        id: 1,
        title: "GIFT VOUCHER",
        subtitle: "10% discount on your next order",
        color: "bg-green-500",
        code: "SAVE10",
        validUntil: "2024-12-31",
        isRedeemed: false,
      },
      {
        id: 2,
        title: "GIFT VOUCHER",
        subtitle: "Flat Entertainment Voucher worth ₹500",
        color: "bg-blue-500",
        code: "ENTERTAINMENT500",
        validUntil: "2024-12-31",
        isRedeemed: false,
      },
    ],

    // Favorites
    favorites: new Set(),

    // Loading states
    isLoading: false,
    error: null,

    // Actions
    setUser: (userData) => set({ user: { ...get().user, ...userData } }),

    setLoading: (loading) => set({ isLoading: loading }),

    setError: (error) => set({ error }),

    addPointsTransaction: (transaction) =>
      set((state) => ({
        pointsHistory: [transaction, ...state.pointsHistory],
      })),

    toggleFavorite: (itemId) =>
      set((state) => {
        const newFavorites = new Set(state.favorites);
        if (newFavorites.has(itemId)) {
          newFavorites.delete(itemId);
        } else {
          newFavorites.add(itemId);
        }
        return { favorites: newFavorites };
      }),

    redeemCoupon: (couponId) =>
      set((state) => ({
        coupons: state.coupons.map((coupon) =>
          coupon.id === couponId ? { ...coupon, isRedeemed: true } : coupon
        ),
      })),

    updatePoints: (points) =>
      set((state) => ({
        user: {
          ...state.user,
          totalPoints: state.user.totalPoints + points,
          totalEarned:
            points > 0
              ? state.user.totalEarned + points
              : state.user.totalEarned,
          totalRedeemed:
            points < 0
              ? state.user.totalRedeemed + Math.abs(points)
              : state.user.totalRedeemed,
        },
      })),

    // Reset store
    reset: () =>
      set({
        user: null,
        pointsHistory: [],
        offers: [],
        coupons: [],
        favorites: new Set(),
        isLoading: false,
        error: null,
      }),
  }))
);
