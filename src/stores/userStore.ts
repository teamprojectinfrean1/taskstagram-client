import { atom } from "recoil";
import { UserInfo } from "@/models/User";

export const userInfoState = atom<UserInfo>({
  key: 'userInfoState',
  default: {
    userId: "",
    memberId: "",
    email: "",
    id: "",
    nickname: "",
    profileImage: "",
    weaver: null
  }
})