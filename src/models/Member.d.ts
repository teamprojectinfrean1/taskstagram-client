type ProjectMember = {
  memberId: string | null;
  userId: string;
  userNickname: string | null;
  userProfileImage: string | null;
  permission: ProjectPermission;
  hasAssigneeIssueInProgress: boolean;
};

type Member = {
  memberUuid: string;
  userUuid: string;
  nickname: string | null;
  profileUrl: string | null;
};

export type ProjectPermission = "MEMBER" | "LEADER";
