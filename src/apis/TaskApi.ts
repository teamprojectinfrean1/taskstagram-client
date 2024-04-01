import { authorizedAxios } from "./domainSettings";
import TaskObj from "@/models/TaskObj";

const taskUrl = "task";

type getTaskListParams = {
  page: number;
  size: number;
  projectId: string | null;
};

//프로젝트에 생성된 테스크들 조회
export const getTaskList = async ({
  page,
  size,
  projectId,
}: getTaskListParams): Promise<TaskObj[]> => {
  if (page && size && projectId !== null) {
    try {
      let taskList = [];
      const response = await authorizedAxios.get(taskUrl, {
        params: {
          page: page,
          size: size,
          projectId: projectId,
        },
      });

      if (response.data && response.data.data) {
        taskList = response.data.data.dataList;
      }
      return taskList;
    } catch {
      return [];
    }
  } else {
    return [];
  }
};

//task 상세조회
export const getTaskDetail = async (taskId: string): Promise<any> => {
  if (taskId) {
    try {
      let taskDetail = null;
      const response = await authorizedAxios.get(`${taskUrl}/${taskId}`);
      if (response.data) {
        taskDetail = response.data.data;
      }
      return taskDetail;
    } catch {
      return null;
    }
  } else {
    return null;
  }
};
