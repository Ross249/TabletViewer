import { Fetcher } from "../lib/Fetcher";
import { PaginationData } from "../types/request";

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
};
