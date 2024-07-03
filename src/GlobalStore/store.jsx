import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
    persist(
        (set, get) => ({
            user: [],
            riderDetails: [],
            cart: [],
            account: [],
            balance: [],
            countone: 0, // Add countone to the store's state

            setUser: (data) =>
                set({ user: data }),

            setRiderDetails: (data) =>
                set({ riderDetails: data }),

            setAccount: (data) =>
                set({ account: data }),

            setBalance: (data) =>
                set({ balance: data }),

            setCart: (data) =>
                set({ cart: data }),

            addToCart: (data) => {
                set((state) => ({
                    cart: [...state.cart, data]
                }));
            },

            increment: (id) => {
                set((state) => ({
                    cart: state.cart.map((item) => {
                        if (item?.priceListId === id) {
                            return { ...item, qty: item.qty + 1 };
                        } else {
                            return item;
                        }
                    })
                }));
            },

            decrement: (id) => {
                set((state) => ({
                    cart: state.cart.map((item) => {
                        if (item?.priceListId === id) {
                            return { ...item, qty: item.qty - 1 };
                        } else {
                            return item;
                        }
                    })
                }));
            },

            removeItemFromCart: (id) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.priceListId !== id)
                }));
            },

            setLogOutUser: () =>
                set({ user: null, riderDetails: null }),

            reset: () =>
                set({ user: [], riderDetails: [], cart: [], countone: 0, counttwo: 0 }),

            // Method to update countone
            setCountOne: (value) =>
                set({countone: value }),
            setCountTwo:(value) => 
                set({counttwo: value})

        }),
        {
            name: "erider",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) =>
                        [
                            "user",
                            "riderDetails",
                            "cart",
                            "countone",
                            "counttwo"
                        ].includes(key)
                    )
                ),
        }
    )
);

export default useStore;
