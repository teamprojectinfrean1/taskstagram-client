import { RawDraftContentState } from "draft-js";

export type Task = {
  taskId: string;
  taskTitle: string;
  taskContent: string | null;
  taskTags: string[] | null;
  taskStartDate: string | null;
  taskEndDate: string | null;
  taskAuthorityType: TaskPermission;
  taskStatus: string | null;
  lastUpdateUserNickname: string;
  lastUpdateDate: string;
};

export type TaskPermission = "allProjectMember" | "projectLeader";
