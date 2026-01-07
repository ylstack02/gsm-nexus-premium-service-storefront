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
  lastOrderId: string | null;
  // Actions
  addToCart: (service: Service, formData: Record<string, string>) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  setTrackingModal: (open: boolean) => void;
  addRecentSearch: (query: string) => void;
  setLastOrderId: (id: string | null) => void;
}
export const useStore = create<AppState>((set) => ({
  cart: [],
  recentSearches: [],
  trackingModalOpen: false,
  lastOrderId: null,
  addToCart: (service, formData) => set((state) => ({
    // For this business model, usually one service per checkout (e.g. one IMEI)
    // but we support a list. Replacing instead of merging for simpler logic.
    cart: [{
      service,
      formData,
      quantity: 1
    }],
    lastOrderId: null // Reset successful order state when adding new item
  })),
  removeFromCart: (serviceId) => set((state) => ({
    cart: state.cart.filter((item) => item.service.id !== serviceId)
  })),
  clearCart: () => set({
    cart: []
  }),
  setTrackingModal: (open) => set({
    trackingModalOpen: open
  }),
  addRecentSearch: (query) => set((state) => {
    if (!query.trim()) return state;
    const filtered = state.recentSearches.filter(q => q !== query);
    return {
      recentSearches: [query, ...filtered].slice(0, 5)
    };
  }),
  setLastOrderId: (id) => set({
    lastOrderId: id
  }),
}));