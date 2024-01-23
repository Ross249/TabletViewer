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
  boat_name: string; //船只名称
  starting_place_id: number; //起始地 ID
  starting_place: string; //起始地
  ending_place_id: number; //目的地 ID
  ending_place: string; //目的地
  achieve_time: string; //落客时间
  estimated_achieve_time: string; //预计达到时间
  generate_time: string; //遞紙時間
  departure_date: string; //開航日期
  departure_time: string; //開航時間
  trip_designation: string; //班次編號
  crew: string; //船員人數
  total_crew: string; //總人數
  vip_cabin: string; //貴賓廂
  premier_grand: string; //尊豪位
  super_class: string; //豪華位
  economy_class: string; //普通位
  total_pax: string; //總人數
  vip_cabin_complimentary: string; //貴賓廂（赠券）
  premier_grand_complimentary: string; //尊豪位（赠券）
  super_class_complimentary: string; //豪華位（赠券）
  economy_class_complimentary: string; //普通位（赠券）
  crew_for_relieving: string; //額外船員人數
  group_pax: string; //團體人數
  baby: string; //嬰兒
  child: string; //小童
  dob: string; //遣返人數
  luggage: string; //行李
  prepared_by_id: string; //經手人 ID
  prepared_by: string; //經手人名称
  create_by_id: number; //創建人 ID
  create_by_name: string; //創建人名稱
  submit_by_id: number; //提交人 ID
  submit_by_name: string; //提交人名稱
  createtime: number;
  updatetime: number;
  remark: string;
  delay_departure_code: string;
  duration: string; //航行时长
  achieve_time_text: string; //達到時間（落客时间）
  generate_time_text: string; //遞紙時間
  departure_time_text: string; //開航時間
  estimated_achieve_time_text: string; //预计达到时间
};

export type TS02ListData = {
  total: number;
  per_page: string;
  current_page: number;
  last_page: number;
  data: TS02GeneralData[];
};

export type TS02GeneralData = {
  crew: number;
  date: string;
  departure_time_text: string;
  economy_class: number;
  ending_place: string;
  generate_time_text: string;
  id: number;
  number_of_flights: number;
  premier_grand: number;
  starting_place: string;
  super_class: number;
  total_pax: number;
  vip_cabin: number;
};

export type TS02Detail = {
  total: number;
  per_page: string;
  current_page: number;
  last_page: number;
  data: TS02Data[];
};

export type TS02Data = {
  id: number; //TS02 ID
  rev_date: string; //製錶日期
  trips: string; //航次
  date: string; //日期
  starting_place: string; //起始地
  ending_place: string; //目的地
  generate_time: string; //递纸时间
  boat_name: string; //船名
  departure_date: string; //开航日期
  departure_time: string; //開航時間
  trip_designation: string; //班次編號
  crew: string; //船員人數
  vip_cabin: string; //貴賓廂
  premier_grand: string; //尊豪位
  super_class: string; //豪華位
  economy_class: string; //普通位
  vip_cabin_complimentary: string; //貴賓廂（赠券）
  premier_grand_complimentary: string; //尊豪位（赠券）
  super_class_complimentary: string; //豪華位（赠券）
  economy_class_complimentary: string; //普通位（赠券）
  total_pax: string; //总人数
  crew_for_relieving: string; //額外船員人數
  group_pax: string; //團體人數
  baby: string; //嬰兒
  child: string; //小童
  dob: string; //遣返人數
  luggage: string; //行李
  prepared_by: string; //經手人
  verified_by: string; //核實人
  remark: string; //备注
  createtime: number;
  updatetime: number;
  delay_departure_code: string; //離港代碼
  starting_place_id: number;
  ending_place_id: number;
  achieve_time: string; //到达时间
  generate_time_text: string; //递纸时间
  departure_time_text: string; //开航时间
  achieve_time_text: string; //到达时间
};
