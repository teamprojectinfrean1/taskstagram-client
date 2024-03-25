export type SignupInfo = {
  email: string;
  id: string;
  password: string;
  nickname: string;
  profileImage: string;
};

export type AuthInputValidity = {
  type: string;
  authValue: string;
};

export type SignupInputValue = {
  key: string;
  value: string;
}