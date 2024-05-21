import { atom } from "recoil";

export const userInfoState = atom<UserInfo>({
  key: "userInfoState",
  default: {
    userId: "",
    memberId: "",
    email: "",
    id: "",
    nickname: "",
    profileImage: "",
    weaver: null,
  },
});
