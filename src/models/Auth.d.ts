type SignupInfo = {
  email: string;
  id: string;
  password: string;
  nickname: string;
  profileImage: File | null;
};

// auth 유효성 검사 확인 type
type CheckAuthInputValidity = {
  type: string;
  authValue: string;
};

// auth input value 변경 type
type AuthInputValue = {
  key: string;
  value: string | File;
};

// auth input 유효성 변경 type
type AuthisValid = {
  key: string;
  value: boolean;
};
