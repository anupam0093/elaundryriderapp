import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from 'zustand/middleware'



const useStore = create(
    persist(
        (set, get) => ({
            user:[],
            setUser: (data) =>
                set((state) => ({ user: data })),

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
                        ].includes(key)
                    )
                ),
        }
    )
)

export default useStore