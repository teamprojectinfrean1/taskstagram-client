// import { RawDraftContentState } from "draft-js";

type IssueStatus = "TODO" | "INPROGRESS" | "DONE";

type IssueStatusTitle = "할 일" | "진행 중" | "완료";

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
  writerId?: string;
  taskId: string | null;
  taskTitle: string | null;
  assigneeId: string | null;
  assigneeNickname: string | null;
  assigneeProfileImage: string | null;
  issueId?: string;
  issueTitle: string | null;
  issueContent: RawDraftContentState | null;
  statusId: IssueStatus | null;
  statusTitle: IssueStatusTitle | null;
  startDate: string | null;
  endDate: string | null;
  lastUpdatedDetail?: {
    userUuid: string;
    userNickname: string;
    updatedDate: string;
  };
};

type NewIssue = BaseIssue 

type UpdatedIssue = BaseIssue & {
  issueId?: string;
}

type IssueStory = {
  userId: string;
  userNickname: string;
  profileImage: string;
  hasIssueInProgress: booelan;
};
