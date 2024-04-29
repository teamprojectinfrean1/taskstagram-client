type Task = {
  taskId: string | null;
  taskTitle: string | null;
  taskContent: string | null;
  taskTags: string[] | null;
  taskStartDate: string | null;
  taskEndDate: string | null;
  taskAuthorityType: TaskPermission;
  taskStatus: string | null;
  lastUpdateUserNickname: string;
  lastUpdateDate: string;
};

type TaskPermission = "allProjectMember" | "projectLeader";
