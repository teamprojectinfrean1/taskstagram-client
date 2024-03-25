import { RawDraftContentState } from "draft-js";

type IssueFormData = {
  title: string | null;
  content: RawDraftContentState | null;
  assignee: string[] | null;
  task: string | null;
  startDate: string | null;
  endDate: string | null;
  type: string | null;
  status: string | null;
};

export type IssueSummary = {
  issueId: string;
  issueName: string;
  taskId: string;
  taskName: string;
  userUuid: string;
  userNickname: string;
  userImageUrl: string;
};

