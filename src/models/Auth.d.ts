export type SignupInfo = {
  email: string;
  id: string;
  password: string;
  nickname: string;
  profileImage: File | null;
};

// auth 유효성 검사 확인 type
export type CheckAuthInputValidity = {
  type: string;
  authValue: string;
};

// auth input value 변경 type
export type AuthInputValue = {
  key: string;
  value: string | File;
};

// auth input 유효성 변경 type
export type AuthisValid = {
  key: string;
  value: boolean;
};
