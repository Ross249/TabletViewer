export type CusHeaderProps = {
  children?: React.ReactNode;
  title: string;
};

export type WebViewModalProps = {
  url: string;
};

export type RouteData = {
  from: LocationData;
  to: LocationData;
};

export type LocationData = {
  id: number;
  name: string;
  name_en: string;
};

export type TS01A = {
  departure_date: string;
  departure_time: string;
  vessel_name: string;
  tripe_designation: string;
  number_of_crew: string;
  number_of_crew_for_relieving: string;
  total_number_of_crew: string;
  number_of_group_pax: string;
  estimated_arrive_time: string;
};

export type TS01B = {
  vip_cabin: string;
  vip_cabin_complimentary: string;
  vip_cabin_rate?: string;
  premier_grand: string;
  premier_grand_complimentary: string;
  premier_grand_rate?: string;
  super_class: string;
  super_class_complimentary: string;
  super_class_rate?: string;
  economy_class: string;
  economy_class_complimentary: string;
  economy_class_rate?: string;
  total_pax: string;

  infant: string;
  child: string;
  dob: string;
  luggage: string;
  prepared_by: CrewData;

  submitted_at: string;
  arrived_at: string;

  delay_departure_code: string;
  remarks: string;
  tag_through_luggage: string;
};

export type CrewData = {
  id: number | string;
  group_id: number;
  username: string;
  group_name: string;
  url: string;
};

export type VesselData = {
  id: number; //船只ID
  name: string; //船只名称
  image: string;
  number: string; //船隻編號
  crew: string; //船員人數
  total_pax: string; //总乘客量
  economy_class: string; //普通位
  super_class: string; //豪華位
  premier_grand: string; //尊豪位
  vip_cabin: string; //貴賓廂
  createtime: number;
  updatetime: number;
  format_image: string;
};

export type TS01AProps = TS01A &
  RouteData & {
    setRoute: (n: RouteData) => void;
    setData: (n: TS01A) => void;
  };

export type TS01BProps = TS01B & {
  setData: (n: TS01B) => void;
};

export type ModalProps = {
  show: boolean;
  setShow: (n: boolean) => void;
};

export type LocationModalProps = ModalProps & {
  route: RouteData;
  setRoute: (n: RouteData) => void;
  tag: "from" | "to";
};

export type OneWayModalProps = ModalProps & {
  data: VesselData;
  setData: (n: VesselData) => void;
};

export type CusInputProps = {
  disable: boolean;
  value: string;
  title: string;
  onChange: (n: string) => void;
  rate?: string;
};

export type DatetimeSelectorProps = Omit<CusInputProps, "onChange"> & {
  type: "date" | "time" | "datetime";
  onChange: (n: Date) => void;
};

export type PreparedSelectorProps = Omit<CusInputProps, "onChange", "value"> & {
  onChange: (n: CrewData) => void;
  value: CrewData;
};

export type PreparedProps = ModalProps & {
  data: CrewData;
  setData: (n: CrewData) => void;
};

export type TagProps = {
  title: string;
  value: string | number;
};

export type FilterFormData = RouteData & {
  trip_designation: string;
  departure_date: string;
};

export type FilterFormProps = FilterFormData & {
  setData: (n: FilterFormData) => void;
};

export type TS02Header = {
  start_place: string;
  end_place: string;
  departure_date: string;
};
