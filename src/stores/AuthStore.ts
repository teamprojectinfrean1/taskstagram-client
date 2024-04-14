import { atom } from "recoil";
import { SignupInfo } from "@/models/Auth";

export const signupInfoState = atom<SignupInfo>({
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