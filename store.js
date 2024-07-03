// store.js
import create from 'zustand';

const useStore = create((set) => ({
  user: null,
  riderDetails: null,
  newDeliveries: 0,
  setUser: (user) => set({ user }),
  setRiderDetails: (riderDetails) => set({ riderDetails }),
  setNewDeliveries: (newDeliveries) => set({ newDeliveries }),
}));

export default useStore;
