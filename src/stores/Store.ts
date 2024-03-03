import TaskObj from "@/models/TaskObj";
import { atom } from "recoil";

export const taskListState = atom<TaskObj[]>({
  key: "taskListState",
  default: [],
});

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
    passwdDouble: "",
    nickname: "",
    profileImage: ""
  }
})