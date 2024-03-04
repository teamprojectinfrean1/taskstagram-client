import ProjectObj from "@/models/ProjectObj";
import TaskObj from "@/models/TaskObj";
import { atom } from "recoil";

export const projectListState = atom<ProjectObj[]>({
  key: "projectListState",
  default: [],
});

export const taskListState = atom<TaskObj[]>({
  key: "taskListState",
  default: [],
});

export const loggedState = atom({
  key: "loggedState",
  default: false,
});
