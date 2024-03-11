import { RawDraftContentState } from "draft-js";

type TaskObj = {
  taskId: string;
  taskName: string;
  taskExplanation: RawDraftContentState | null;
  taskAssignee: string[] | null;
  taskTags: string[] | null;
  taskStartDate: string | null;
  taskEndDate: string | null;
  taskSubIssues: string[] | null;
  taskAuthorityType: string;
};

export default TaskObj;
