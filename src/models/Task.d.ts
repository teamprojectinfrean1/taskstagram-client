import { RawDraftContentState } from "draft-js";

type Task = {
  taskId: string;
  taskTitle: string;
  taskContent: string | null;
  taskTags: string[] | null;
  taskStartDate: string | null;
  taskEndDate: string | null;
  taskAuthorityType: string;
  taskStatus: string | null;
  lastUpdateUserNickname: string;
  lastUpdateDate: string;
};

export default Task;
