import { Fetcher } from "../lib/Fetcher";
import { LoginData } from "../types/request";

export const AuthServices = {
  login: async (data: LoginData) =>
    await Fetcher({
      method: "POST",
      path: "/api/user/loginByPassword",
      data: data,
    }),
  logout: async () =>
    await Fetcher({
      method: "POST",
      path: "/api/user/logout",
    }),
};
