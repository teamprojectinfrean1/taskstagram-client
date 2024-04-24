// import { RawDraftContentState } from "draft-js";

type IssueStatus = "TODO" | "INPROGRESS" | "DONE" | null;
type IssueStatusTitle = "할 일" | "진행 중" | "완료" | null;


type IssueDetails = {
  taskId: string;
  taskTitle: string;
  issueId: string;
  issueTitle: string;
  issueContent: string;
  statusId: IssueStatus;
  statusTitle: IssueStatusTitle;
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
  taskTitle: string | null;
  assigneeId: string | null;
  assigneeName: string | null;
  assigneeProfileImage: string | null;
  issueTitle: string;
  issueContent: string;
  statusId: IssueStatus | null;
  statusTitle: IssueStatusTitle | null;
  startDate: string | null;
  endDate: string | null;
};

type NewIssue = Issue & { // 필요 없게 될 수도 있음; 다시 돌아와서 지워야 함
  creatorId: string;
};

type UpdatedIssue = Issue & { // 필요 없게 될 수도 있음; 다시 돌아와서 지워야 함
  modifierId: string;
};

type IssueStory = {
  userId: string;
  userNickname: string;
  profileImage: string;
  hasIssueInProgress: booelan;
};
