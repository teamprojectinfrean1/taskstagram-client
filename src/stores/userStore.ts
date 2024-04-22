import { atom } from "recoil";

export const userInfoState = atom<UserInfo>({
  key: 'userInfoState',
  default: {
    userId: "",
    email: "",
    id: "",
    userNickname: "",
    profileImage: ""
  }
})