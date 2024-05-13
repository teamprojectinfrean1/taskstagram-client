import { atom } from "recoil";

export const signupInfoState = atom<SignupInfo>({
  key: "signupInfo",
  default: {
    email: "",
    id: "",
    password: "",
    nickname: "",
    profileImage: null,
  },
});

export const logged = atom({
  key: "logged",
  default: false,
});
