import axios from "axios";
import { BASE_URL } from "./domainSettings";
import Task from "@/models/Task";

const taskUrl = `${BASE_URL}/task`;

type getTaskListRequest = {
  page: number;
  size: number;
  projectId: string | null;
};

type TaskListResponse = {
  taskList: Task[];
  toalTaskpage: number;
};

type LastUpdateDetailType = {
  userUuid: string;
  userNickName: string;
  updatedDate: string;
};

type TaskDetailReponse = {
  taskId: string;
  taskTitle: string;
  taskContent: string;
  startDate: string;
  endDate: string;
  lastUpdateDetail: LastUpdateDetailType;
  taskTagList: [] | null;
  editDeletePermission: "allProjectMember" | "allProjectMember";
  taskStatus: string;
};

//프로젝트에 생성된 테스크들 조회
export const getTaskList = async ({
  page,
  size,
  projectId,
}: getTaskListRequest): Promise<TaskListResponse | null> => {
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
export const getTaskDetail = async (
  taskId: string
): Promise<TaskDetailReponse | null> => {
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

//task 삭제
export const deleteOneTask = async (taskId: string): Promise<boolean> => {
  if (taskId) {
    try {
      const response = await axios.delete(`${taskUrl}`, {
        params: {
          taskId: taskId,
        },
      });
      if (response.data && response.data.isSuccess) {
        return response.data.isSuccess;
      }
      return false;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};
