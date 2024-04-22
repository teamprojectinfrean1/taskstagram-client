// import { RawDraftContentState } from "draft-js";

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
  taskTitle: string;
  issueId: string;
  issueTitle: string;
  issueContent: string;
  status: IssueStatus;
  assigneeId: string;
  assigneeNickname: string;
  assigneeProfileImage: string | null;
  startDate: string | null;
  endDate: string | null;
  lastUpdatedDetail: {
    userUuid: string;
    userNickname: string;
    updatedDate: string;
  };
};

type IssueSummary = {
  taskId: string;
  taskTitle: string;
  issueId: string;
  issueTitle: string;
  assigneeId: string;
  assigneeNickname: string;
  assigneeProfileImage: string | null;
};

type Issue = {
  taskId: string | null;
  assigneeId: string | null;
  issueTitle: string;
  issueContent: string;
  status: IssueStatus;
  startDate: string | null;
  endDate: string | null;
};

type NewIssue = Issue & {
  creatorId: string;
};

type UpdatedIssue = Issue & {
  modifierId: string;
};

type IssueStory = {
  userId: string;
  userNickname: string;
  profileImage: string;
  hasIssueInProgress: booelan;
};
