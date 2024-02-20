import { Dayjs } from "dayjs";
import { RawDraftContentState } from "draft-js";
import Tag from "./Tag";

type TaskObj = {
    taskId: string,
    taskName: string,
    taskExplanation: RawDraftContentState | null;
    taskAssignee: string[] | null,
    taskTags: Tag[] | null,
    taskStartDate: Dayjs | null,
    taskEndDate: Dayjs | null,
    taskSubIssues: string[] | null,
    taskAuthorityType: string
}

export default TaskObj;