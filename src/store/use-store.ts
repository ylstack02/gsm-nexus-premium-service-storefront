import { create } from 'zustand';
import { Service } from '../../shared/types';
interface CartItem {
  service: Service;
  quantity: number;
  formData: Record<string, string>;
}
interface AppState {
  cart: CartItem[];
  recentSearches: string[];
  trackingModalOpen: boolean;
  // Actions
  addToCart: (service: Service, formData: Record<string, string>) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  setTrackingModal: (open: boolean) => void;
  addRecentSearch: (query: string) => void;
}
export const useStore = create<AppState>((set) => ({
  cart: [],
  recentSearches: [],
  trackingModalOpen: false,
  addToCart: (service, formData) => set((state) => ({
    cart: [...state.cart, { service, formData, quantity: 1 }]
  })),
  removeFromCart: (serviceId) => set((state) => ({
    cart: state.cart.filter((item) => item.service.id !== serviceId)
  })),
  clearCart: () => set({ cart: [] }),
  setTrackingModal: (open) => set({ trackingModalOpen: open }),
  addRecentSearch: (query) => set((state) => {
    const filtered = state.recentSearches.filter(q => q !== query);
    return { recentSearches: [query, ...filtered].slice(0, 5) };
  }),
}));