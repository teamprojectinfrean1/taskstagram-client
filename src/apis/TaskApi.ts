import axios from "axios";
import { BASE_URL } from "./domainSettings";
import TaskObj from "@/models/TaskObj";

const taskUrl = `${BASE_URL}/task`;

type getTaskListRequest = {
  page: number;
  size: number;
  projectId: string | null;
};

type getTaskListResponse = {
  taskList: TaskObj[];
  toalTaskpage: number;
};

//프로젝트에 생성된 테스크들 조회
export const getTaskList = async ({
  page,
  size,
  projectId,
}: getTaskListRequest): Promise<getTaskListResponse | null> => {
  if (page && size && projectId !== null) {
    try {
      let taskListResponse = null;
      const response = await axios.get(`${taskUrl}`, {
        params: {
          page: page,
          size: size,
          projectId: projectId,
        },
      });

      if (response.data && response.data.data) {
        taskListResponse = {
          taskList: response.data.data.dataList,
          toalTaskpage: response.data.data.totalPage,
        };
      }
      return taskListResponse;
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

//task 상세조회
export const getTaskDetail = async (taskId: string): Promise<any> => {
  if (taskId) {
    try {
      let taskDetail = null;
      const response = await axios.get(`${taskUrl}/${taskId}`);
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
