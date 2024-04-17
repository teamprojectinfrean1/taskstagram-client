export type ProjectFormData = {
  projectId: string;
  projectName: string;
  projectContent: string;
  projectStartDate: string | null;
  projectEndDate: string | null;
  projectMemberUuidList: string[] | null;
  projectTags: string[] | null;
  isMainProject: bool;
};

export type ProjectSummary = {
  projectId: string;
  projectName: string;
  isMainProject: bool;
};
