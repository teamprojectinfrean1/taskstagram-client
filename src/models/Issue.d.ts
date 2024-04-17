import { RawDraftContentState } from "draft-js";
import { StringLiteral } from "typescript";

/* IssueFormData 추후 제거 예정 */
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

type IssueStatus = "toDo" | "inProgress" | "done";

type IssueDetails = {
  projectId: string;
  taskId: string;
  taskName: string;
  issueId: string;
  issueName: string;
  issueContent: string;
  issueStatus: IssueStatus;
  assigneeId: string;
  assigneeNickname: string;
  assigneeProfileImage: string | null;
  startDate: string | null;
  endDate: string | null;
  lastUpdatedDetail: {
    updaterId: string;
    updaterNickname: string;
    updatedDate: string;
  };
};

type IssueSummary = {
  projectId: string;
  taskId: string;
  taskName: string;
  issueId: string;
  issueName: string;
  assigneeId: string;
  assigneeNickname: string;
  assigneeProfileImage: string | null;
};

type NewIssue = {
  projectId: string;
  taskId: string | null;
  creatorId: string;
  assigneeId: string | null;
  issueName: string;
  issueContent: string;
  issueStatus: IssueStatus;
  startDate: string | null;
  endDate: string | null;
};

type UpdateIssuePayload = {
  issue: IssueSummary;
  oldStatus: IssueStatus;
  newStatus: IssueStatus;
};

type IssueStory = {
  userId: string;
  userNickname: string;
  profileImage: string;
  hasIssueInProgress: booelan;
};
