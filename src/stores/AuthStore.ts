import { atom } from "recoil";

export const signupInfoState = atom({
  key: "signupInfo",
  default: {
    email: "",
    id: "",
    password: "",
    nickname: "",
    profileImage: "",
  },
});

export const logged = atom({
  key: "logged",
  default: false,
});
