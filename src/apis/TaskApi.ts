import axios from "axios";
import { authorizedAxios } from "./domainSettings";


const taskPath = "task";

type GetTaskListRequest = {
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

export type CreateTaskRequest = {
  projectId: string | null;
  writerUuid: string | null;
  taskTitle: string;
  taskContent: string | null;
  taskTagList: string[] | null;
  startDate: string | null;
  endDate: string | null;
  editDeletePermission: string;
};

export type ReplaceTaskRequest = {
  selectedTaskId: string | null;
  updaterUuid: string | null;
  taskTitle: string;
  taskContent: string | null;
  taskTagList: string[] | null;
  startDate: string | null;
  endDate: string | null;
  editDeletePermission: string;
};

//프로젝트에 생성된 테스크들 조회
export const getTaskList = async ({
  page,
  size,
  projectId,
}: GetTaskListRequest): Promise<TaskListResponse | null> => {
  if (page && size && projectId !== null) {
    try {
      const response = await authorizedAxios.get(taskPath, {
        params: {
          page,
          size,
          projectId,
        },
      });
      return {
        taskList: response.data.data.dataList,
        toalTaskpage: response.data.data.totalPage,
      };
    } catch {
      return null;
    }
  } else {
    return null;
  }
};


type GetAllTaskListRequest = {
  projectId: string;
};

type GetAllTaskResponse = Task[]

export const getAllTaskList = async ({
  projectId,
}: GetAllTaskListRequest): Promise<GetAllTaskResponse> => {
  try {
    const response = await authorizedAxios.post(
      `${taskPath}/task/all`,
      {
        params: { 
        projectId
      }
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("태스크 목록 전체를 가져오는 중 오류가 발생했습니다.");
  }
};


//task 상세조회
export const getTaskDetail = async (
  taskId: string
): Promise<TaskDetailReponse | null> => {
  if (taskId) {
    try {
      const response = await authorizedAxios.get(`${taskPath}/${taskId}`);
      return response.data.data;
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

//task 생성
export const createOneTask = async ({
  projectId,
  writerUuid,
  taskTitle,
  taskContent,
  taskTagList,
  startDate,
  endDate,
  editDeletePermission,
}: CreateTaskRequest): Promise<boolean> => {
  if (
    projectId !== null &&
    writerUuid !== null &&
    taskTitle !== null &&
    startDate !== null &&
    endDate !== null &&
    editDeletePermission !== null
  ) {
    try {
      const response = await axios.post(`${taskPath}`, {
        projectId,
        writerUuid,
        taskTitle,
        taskContent,
        taskTagList,
        startDate,
        endDate,
        editDeletePermission,
      });
      return response.data.isSuccess;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

export const replaceOneTask = async ({
  selectedTaskId,
  updaterUuid,
  taskTitle,
  taskContent,
  taskTagList,
  startDate,
  endDate,
  editDeletePermission,
}: ReplaceTaskRequest): Promise<boolean> => {
  if (
    selectedTaskId !== null &&
    updaterUuid !== null &&
    taskTitle !== null &&
    startDate !== null &&
    endDate !== null &&
    editDeletePermission !== null
  ) {
    try {
      const response = await axios.put(
        `${taskPath}`,
        {
          updaterUuid,
          taskTitle,
          taskContent,
          taskTagList,
          startDate,
          endDate,
          editDeletePermission,
        },
        {
          params: {
            taskId: selectedTaskId,
          },
        }
      );
      return response.data.isSuccess;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

//task 삭제
export const deleteOneTask = async (taskId: string): Promise<boolean> => {
  if (taskId) {
    try {
      const response = await axios.delete(`${taskPath}`, {
        params: {
          taskId: taskId,
        },
      });
      return response.data.isSuccess;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};
