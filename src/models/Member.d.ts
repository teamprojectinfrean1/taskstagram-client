type ProjectMember = {
  memberId: string | null;
  userId: string;
  userNickname: string | null;
  userProfileImage: string | null;
  permission: ProjectPermission;
  hasAssigneeIssueInProgress: boolean;
};

type ProjectPermission = "MEMBER" | "LEADER";
