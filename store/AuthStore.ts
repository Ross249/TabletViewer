import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStoreTypes } from "../types/store";

export const useAuthStore = create<AuthStoreTypes>()(
  persist(
    (set, get) => ({
      token: "",
      actions: {
        logout: () => {
          set((state) => ({
            ...state,
            token: "",
          }));
        },
        setToken: (n_token?: string) => {
          set((state) => ({ ...state, token: n_token }));
        },
      },
    }),
    {
      name: "turbojet_auth",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: (state) => {
        console.log("hydration starts");

        // optional
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            console.log("hydration finished");
          }
        };
      },
    }
  )
);

export const useToken = () => useAuthStore((state) => state.token);
export const useAuthActions = () => useAuthStore((state) => state.actions);
