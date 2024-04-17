type IssueSearchFilter = "Issue" | "Task" | "Assignee"

type IssueSearchParams = {
  filter: IssueSearchFilter;
  keyword: string;
};
