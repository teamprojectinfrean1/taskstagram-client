import { RawDraftContentState } from "draft-js";

export type IssueFormData = {
  title: string | null;
  content: RawDraftContentState | null;
  assignee: string[] | null; // assignee는 객체여야 함; image url, name, 등등의 정보를 담은 객체
  task: string | null;
  dateRange: [string, string] | null;
  type: string | null;
  status: string | null;
};

export type Issue = {
  
};

/* Issue 랑 Issue Form Data 랑 분리할 필요가 있을까? */
