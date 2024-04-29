import { atom } from "recoil";

export const issueIdToShowInModalState = atom<string | null>({
  key: "issueIdToShowInModalState",
  default: null,
});
