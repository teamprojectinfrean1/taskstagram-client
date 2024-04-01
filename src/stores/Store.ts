import Project from "@/models/Project";
import { atom } from "recoil";

export const selectedProjectState = atom<Project | null>({
  key: "selectedProjectState",
  default: null,
});
