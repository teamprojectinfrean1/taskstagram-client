export type ProjectFormData = {
  projectId: string;
  projectName: string;
  projectContent: string;
  projectImageUrl: string | null;
  projectImageFile: File | null;
  projectStartDate: string | null;
  projectEndDate: string | null;
  projectMemberUuidList: string[] | null;
  projectTags: string[] | null;
  lastUpdateUserNickname: string;
  lastUpdateDate: string;
  isMainProject: bool;
};

export type ProjectSummary = {
  projectId: string;
  projectName: string;
  isMainProject: bool;
  projectImage: string | null;
  permission: ProjectPermission;
};

export type ProjectPermission = "MEMBER" | "LEADER";
