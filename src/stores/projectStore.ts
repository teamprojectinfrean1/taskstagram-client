import { ProjectSummary } from "@/models/Project";
import { atom } from "recoil";

export const selectedProjectState = atom<ProjectSummary | null>({
  key: "selectedProjectState",
  default: null,
});

// 프로젝트 리스트 Recoil 변경
export const projectListState = atom<ProjectSummary[]>({
  key: "projectListState",
  default: [],
});

export const projectActingModeState = atom<string | null>({
  key: "projectActingModeState",
  default: null,
});
