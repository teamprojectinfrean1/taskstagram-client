type IssueSearchFilter = "ISSUE" | "TASK" | "ASSIGNEE"

type IssueSearchParams = {
  filter: IssueSearchFilter;
  keyword: string;
};
