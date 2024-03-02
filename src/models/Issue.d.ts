import { RawDraftContentState } from "draft-js";

type Duration = {
  startDate: string  | null;
  endDate: string | null;
};

type IssueFormData = {
  title: string | null;
  content: RawDraftContentState | null;
  assignee: string[] | null;
  task: string | null;
  duration: Duration;
  type: string | null;
  status: string | null;
};

type Issue = {};
