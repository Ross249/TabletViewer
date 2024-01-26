import { Fetcher } from "../lib/Fetcher";
import {
  CreateTS01Data,
  FilterTS02Data,
  PaginationData,
  UpdateTS01Data,
} from "../types/request";

export const TsServices = {
  get_ts01_list: async (data: number) => {
    return await Fetcher({
      method: "GET",
      path: `/api/TS01/index?page=${data}&listRows=5`,
    });
  },

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

  updateTS01: async (data: UpdateTS01Data) =>
    await Fetcher({
      method: "POST",
      path: "/api/Ts01/update",
      data: data,
    }),

  getOrSearchTS02: async (data: FilterTS02Data & { page: number }) =>
    await Fetcher({
      method: "GET",
      path: `/api/Ts02/index?starting_place=${data.starting_place}&ending_place=${data.ending_place}&departure_date=${data.departure_date}&trip_designation=${data.trip_designation}&page=${data.page}&listRows=10`,
    }),

  getTS02Detail: async (data: { id: string; page: number }) =>
    await Fetcher({
      method: "GET",
      path: `/api/Ts02/view?id=${data.id}&page=${data.page}&listRows=10`,
    }),
  getOrSearchTS03: async (data: FilterTS02Data & { page: number }) =>
    await Fetcher({
      method: "GET",
      path: `/api/Ts03/index?starting_place=${data.starting_place}&ending_place=${data.ending_place}&departure_date=${data.departure_date}&trip_designation=${data.trip_designation}&page=${data.page}&listRows=10`,
    }),
  getTS03Detail: async (data: { id: string; page: number }) =>
    await Fetcher({
      method: "GET",
      path: `/api/Ts03/view?id=${data.id}&page=${data.page}&listRows=10`,
    }),
};
