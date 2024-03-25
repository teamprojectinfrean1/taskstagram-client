import ProjectObj from "@/models/ProjectObj";
import TaskObj from "@/models/TaskObj";
import { atom } from "recoil";

export const selectedProjectState = atom<ProjectObj | null>({
  key: "selectedProjectState",
  default: null,
});

export const loggedState = atom({
  key: "loggedState",
  default: false,
});
