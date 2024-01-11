import { UserInfoData } from "./response";

export type AuthStoreTypes = {
  token: string;
  userInfo: UserInfoData;
  logout: () => void;
  setToken: (token?: string) => void;
  setUserInfo: (userInfo: UserInfoData) => void;
};
