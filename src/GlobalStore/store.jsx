import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from 'zustand/middleware'



const useStore = create(
    persist(
        (set, get) => ({
            user:[],
            riderDetails:[],
            cart :[],

            setUser: (data) =>
                set((state) => ({ user: data })),

            setRiderDetails: (data) =>
            set((state) => ({ riderDetails: data })),

            setCart: (data) =>
            set((state) => ({ cart: data })),
            
            setLogOutUser: () =>
            set((state) => ({ user: null, riderDetails:null })),
                

            reset: (data) =>
                set((state) => ({ dailyWaterIntakeTarget: 3, totalWaterIntake: 0, waterQuantityToIncrease: 100 })),
        }),
        {
            name: "erider",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) =>
                Object.fromEntries(                                                                                                                                                                                                     
                    Object.entries(state).filter(([key]) =>
                        [
                            "user",
                            'riderDetails',
                            
                        ].includes(key)
                    )
                ),
        }
    )
)

export default useStore