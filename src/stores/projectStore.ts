import { ProjectSummary } from "@/models/Project";
import { atom } from "recoil";

export const selectedProjectState = atom<ProjectSummary | null>({
  key: "selectedProjectState",
  default: null,
});

// 
export const projectListState = atom<ProjectSummary[]> ({
  key: "projectListState",
  default: []
})