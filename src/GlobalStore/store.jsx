import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from 'zustand/middleware'



const useStore = create(
    persist(
        (set, get) => ({
            user: [],
            riderDetails: [],
            cart: [],

            setUser: (data) =>
                set((state) => ({ user: data })),

            setRiderDetails: (data) =>
                set((state) => ({ riderDetails: data })),

            addToCart: (data) => {
                set((state) => ({
                    cart: [...state.cart, data]
                }))
            },

            increment: (id) => {
                set((state) => ({

                    cart: state.cart.map((item) => {
                        if (item?.priceListId == id) {
                            return { ...item, qty: item.qty + 1 }
                        } else {
                            return item
                        }
                    })
                }))
            },

            decrement: (id) => {
                set((state) => ({

                    cart: state.cart.map((item) => {
                        if (item?.priceListId == id) {
                            return { ...item, qty: item.qty - 1 }
                        } else {
                            return item
                        }
                    })
                }))
            },

            removeItemFromCart: (id) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.priceListId !== id)
                }))
            },


            setLogOutUser: () =>
                set((state) => ({ user: null, riderDetails: null })),


            reset: (data) =>
                set((state) => ({ user: [], riderDetails: [], cart: [] })),
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

                        ].includes(key)
                    )
                ),
        }
    )
)

export default useStore