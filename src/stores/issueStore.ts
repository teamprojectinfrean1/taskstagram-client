import { atom, SetterOrUpdater } from "recoil";

export const issueIdToShowInModalState = atom<string | null>({
  key: "issueIdToShowInModalState",
  default: null,
});

export const issueStatusBoardSearchState = atom<IssueStatusBoardSearchState>({
  key: "issueStatusBoardState",
  default: {
    TODO: {
      searchParams: { filter: "ISSUE", keyword: "" },
      isSearchMode: false,
      executeSearchApi: false,
    },
    INPROGRESS: {
      searchParams: { filter: "ISSUE", keyword: "" },
      isSearchMode: false,
      executeSearchApi: false,
    },
    DONE: {
      searchParams: { filter: "ISSUE", keyword: "" },
      isSearchMode: false,
      executeSearchApi: false,
    },
  },
});

export const endIssueSearchMode = (
  setIssueStatusBoardSearchState: SetterOrUpdater<IssueStatusBoardSearchState>,
  issueStatus: IssueStatus 
) => {
  setIssueStatusBoardSearchState((prevState) => ({
    ...prevState,
    [issueStatus]: {
      ...prevState[issueStatus],
      searchParams: { filter: "ISSUE", keyword: "" },
      isSearchMode: false,
      executeSearchApi: false,
    },
  }));
};

export const issueFeatureAvailabilityState = atom<boolean>({
  key: "issueFeatureAvailabilityState",
  default: false,
});