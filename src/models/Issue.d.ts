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

type Issue = {};
