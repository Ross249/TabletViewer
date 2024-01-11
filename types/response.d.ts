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
