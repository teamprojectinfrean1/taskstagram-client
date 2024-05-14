type IssueSearchFilter = "ISSUE" | "TASK" | "ASSIGNEE"

type IssueSearchParams = {
  filter: IssueSearchFilter;
  keyword: string;
};

type StatusBoardSearchModes = {
  [key in IssueStatus]: boolean;
};

type StatusBoardSearchParams = {
  TODO: IssueSearchParams;
  INPROGRESS: IssueSearchParams;
  DONE: IssueSearchParams;
};