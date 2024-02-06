export type IssueFormData = {
    title: string | null;
    content: string | null;
    assignee: string[] | null;
    task: string | null;
    dateRange: [string, string] | null;
    type: string | null;
    status: string | null;
  };