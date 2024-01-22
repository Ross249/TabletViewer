export type LoginData = {
  account: string;
  password: string;
};

export type PaginationData = {
  page: number;
  listRows: number;
};

export type CreateTS01Data = {
  starting_place_id: string;
  starting_place: string;
  ending_place_id: string;
  ending_place: string;
  boat_name: string;
  departure_date: string;
  departure_time: string;
  estimated_achieve_time: string;
  trip_designation: string;
  crew: string;
  vip_cabin: string;
  premier_grand: string;
  super_class: string;
  economy_class: string;
  total_pax: string;
  vip_cabin_complimentary: string;
  premier_grand_complimentary: string;
  super_class_complimentary: string;
  economy_class_complimentary: string;
  crew_for_relieving: string;
  group_pax: string;
  baby: string;
  child: string;
  dob: string;
  luggage: string;
  prepared_by_id: string;
  generate_time: string;
  achieve_time: string;
  remark: string;
  delay_departure_code: string;
};

export type UpdateTS01Data = CreateTS01Data & { id: string };

export type FilterTS02Data = {
  starting_place: string;
  ending_place: string;
  departure_date: string;
  trip_designation: string;
};
