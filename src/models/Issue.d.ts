export type IssueFormData = {
  title: string | null;
  content: ContentState | null;
  assignee: string[] | null;
  task: string | null;
  dateRange: [string, string] | null;
  type: string | null;
  status: string | null;
};

export type Issue = {};
