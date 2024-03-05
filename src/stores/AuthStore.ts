import { atom } from "recoil";

export const loggedState = atom({
  key: "loggedState",
  default: false,
});

export const signupInfoState = atom({
  key: "signupInfo",
  default: {
    email : "",
    id: "",
    passwd: "",
    nickname: "",
    profileImage: ""
  }
})