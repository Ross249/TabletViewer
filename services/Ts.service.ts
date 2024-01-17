import { Fetcher } from "../lib/Fetcher";
import { CreateTS01Data, PaginationData } from "../types/request";

export const TsServices = {
  get_ts01_list: async (data: PaginationData) =>
    await Fetcher({
      method: "GET",
      path: `/api/TS01/index?page=${data.page}&listRows=${data.listRows}`,
    }),

  getRegionList: async () =>
    await Fetcher({
      method: "GET",
      path: `/api/Region/index`,
    }),

  getStaffList: async () =>
    await Fetcher({
      method: "GET",
      path: "/api/User/index",
    }),

  getVesselList: async () =>
    await Fetcher({
      method: "GET",
      path: "/api/Boat/index",
    }),
  createTS01: async (data: CreateTS01Data) =>
    await Fetcher({
      method: "POST",
      path: "/api/Ts01/create",
      data: data,
    }),
};
