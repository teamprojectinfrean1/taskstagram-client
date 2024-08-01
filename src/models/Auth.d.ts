type SignupInfo = {
  email: string;
  id: string;
  password: string;
  nickname: string;
  profileImage: File | null;
};

type CheckAuthInputValidity = {
  type: string;
  authValue: string;
};

type AuthInputValue = {
  key: string;
  value: string | File;
};

type AuthisValid = {
  key: string;
  value: boolean;
};
