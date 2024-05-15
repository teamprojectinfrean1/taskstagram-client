type IssueStatus = "TODO" | "INPROGRESS" | "DONE";

type IssueStatusTitle = "할 일" | "진행 중" | "완료";

type IssueSummary = {
  taskId: string;
  taskTitle: string;
  issueId: string;
  issueTitle: string;
  statusId: IssueStatus;
  assigneeId: string;
  assigneeNickname: string;
  assigneeProfileImage: string | null;
};

type Issue = {
  writerId?: string;
  taskId: string | null;
  taskTitle: string | null;
  assigneeId: string | null;
  assigneeNickname: string | null;
  assigneeProfileImage: string | null;
  issueId?: string;
  issueTitle: string | null;
  issueContent: RawDraftContentState | null;
  statusId: IssueStatus | null;
  statusTitle: IssueStatusTitle | null;
  startDate: string | null;
  endDate: string | null;
  lastUpdateDetail?: {
    memberUuid: string;
    userNickname: string;
    updatedDate: string;
  };
};

/* Issue Search */
type IssueSearchFilter = "ISSUE" | "TASK" | "ASSIGNEE";

type IssueSearchParams = {
  filter: IssueSearchFilter;
  keyword: string;
};

type SearchState = {
  searchParams: IssueSearchParams;
  isSearchMode: boolean;
  executeSearchApi: boolean;
};

type IssueStatusBoardSearchState = {
  [key in IssueStatus]: SearchState;
};


