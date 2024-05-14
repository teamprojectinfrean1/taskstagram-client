import { atom, SetterOrUpdater } from "recoil";

export const issueIdToShowInModalState = atom<string | null>({
  key: "issueIdToShowInModalState",
  default: null,
});

export const issueStatusBoardSearchModeState = atom<StatusBoardSearchModes>({
  key: "issueStatusBoardSearchModeState",
  default: {
    TODO: false,
    INPROGRESS: false,
    DONE: false,
  },
});

export const issueStatusBoardSearchParamsState = atom<StatusBoardSearchParams>({
  key: "issueStatusBoardSearchParamsState",
  default: {
    TODO: { filter: "ISSUE", keyword: "" },
    INPROGRESS: { filter: "ISSUE", keyword: "" },
    DONE: { filter: "ISSUE", keyword: "" },
  },
});

export const endIssueSearchMode = (
  setIssueStatusBoardSearchModes: SetterOrUpdater<StatusBoardSearchModes>,
  setIssueStatusBoardSearchParams: SetterOrUpdater<StatusBoardSearchParams>,
  issueStatus: string
) => {
  setIssueStatusBoardSearchModes((prevModes) => ({
    ...prevModes,
    [issueStatus]: false,
  }));

  setIssueStatusBoardSearchParams((prevParams) => ({
    ...prevParams,
    [issueStatus]: { filter: "ISSUE", keyword: "" },
  }));
};

export const issueFeatureAvailabilityState = atom<boolean>({
  key: "issueFeatureAvailabilityState",
  default: false,
});