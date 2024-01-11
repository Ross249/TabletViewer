import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStoreTypes } from "../types/store";
import { UserInfoData } from "../types/response";

export const useAuthStore = create<AuthStoreTypes>()(
  persist(
    (set, get) => ({
      token: "",
      userInfo: {
        id: -1,
        username: "",
        nickname: "",
        email: "",
        mobile: "",
        avatar: "",
        group_id: -1,
        group_name: "",
      },
      logout: () => {
        set((state) => ({
          ...state,
          token: "",
          userInfo: {
            id: -1,
            username: "",
            nickname: "",
            email: "",
            mobile: "",
            avatar: "",
            group_id: -1,
            group_name: "",
          },
        }));
      },

      setToken: (n_token?: string) => {
        set((state) => ({ ...state, token: n_token }));
      },

      setUserInfo: (n_userInfo: UserInfoData) => {
        set((state) => ({ ...state, userInfo: n_userInfo }));
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
export const useUserInfo = () => useAuthStore((state) => state.userInfo);
