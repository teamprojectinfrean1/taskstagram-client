import { atom } from "recoil";

export const commentIdSelectedToDeleteState = atom<string | null>({
  key: "commentIdSelectedToDeleteState ",
  default: null,
});
