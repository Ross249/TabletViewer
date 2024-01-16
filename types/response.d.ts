export type LoginResponseData = {
  userinfo: UserInfoData;
  token: string;
};

export type UserInfoData = {
  id: number; //用户ID
  username: string; //用户名（賬號）
  nickname: string; //昵稱
  email: string; //邮箱
  mobile: string; //手機號
  avatar: string; //頭像
  group_id: number; //分組ID
  group_name: string; //分組名稱（職位）
};

export type TS01ListData = {
  total: number;
  per_page: string;
  current_page: number;
  last_page: number;
  data: TS01Data[];
};

export type TS01Data = {
  id: number; //TS01 ID
  rev_date: string;
  boat_id: number; //船只ID
  boat_name: string;
  starting_place: string; //起始地
  ending_place: string; //目的地
  achieve_time: number;
  generate_time: number;
  departure_date: string; //開航日期
  departure_time: number; //開航時間
  trip_designation: string; //班次編號
  crew: string; //船員人數
  vip_cabin: string; //貴賓廂
  premier_grand: string; //尊豪位
  super_class: string; //豪華位
  economy_class: string; //普通位
  total_pax: string; //總人數
  vip_cabin_complimentary: string; //貴賓廂（赠券）
  premier_grand_complimentary: string; //尊豪位（赠券）
  super_class_complimentary: string; //豪華位（赠券）
  economy_class_complimentary: string; //普通位（赠券）
  premier_grand_attendance: null | string; //尊豪位（上座率）
  vip_cabin_attendance: null | string; //貴賓廂（上座率）
  super_class_attendance: null | string; //豪華位（上座率）
  economy_class_attendance: null | string; //普通位（上座率）
  total_pax_attendance: null | string; //總人數（上座率）
  crew_for_relieving: string; //額外船員人數
  group_pax: string; //團體人數
  baby: string; //嬰兒
  child: string; //小童
  dob: string; //遣返人數
  luggage: string; //行李
  prepared_by_id: number; //經手人 ID
  prepared_by: null; //經手人名称
  create_by_id: number;
  create_by_name: string; //創建人名稱
  submit_by_id: number;
  submit_by_name: string; //提交人名稱
  createtime: number;
  updatetime: number;
  achieve_time_text: string; //達到時間
  generate_time_text: string; //遞紙時間
  departure_time_text: string; //開航時間
  estimated_achieve_time: string;
  duration: string; //航行时长
  estimated_achieve_time_text: string; //预计达到时间
};
