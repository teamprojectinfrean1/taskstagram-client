import { authorizedAxios, unauthorizedAxios } from "./domainSettings";

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
  userNickname: string;
  updatedDate: string;
};

type TaskDetailReponse = {
  taskId: string;
  taskTitle: string;
  taskContent: string;
  startDate: string;
  endDate: string;
  lastUpdateDetail: LastUpdateDetailType;
  taskTags: string | null;
  editDeletePermission: TaskPermission;
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
  editDeletePermission: TaskPermission;
};

export type ReplaceTaskRequest = {
  selectedTaskId: string | null;
  updaterUuid: string | null;
  taskTitle: string;
  taskContent: string | null;
  taskTagList: string[] | null;
  startDate: string | null;
  endDate: string | null;
  editDeletePermission: TaskPermission;
};

//프로젝트에 생성된 테스크들 조회
export const getPaginatedTaskList = async ({
  page,
  size,
  projectId,
}: GetTaskListRequest): Promise<TaskListResponse | null> => {
  if (page && size && projectId !== null) {
    try {
      const response = await unauthorizedAxios.get(taskPath, {
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

type GetAllTaskResponse = Task[];

export const getAllTaskList = async ({
  projectId,
}: GetAllTaskListRequest): Promise<GetAllTaskResponse> => {
  try {
    const response = await authorizedAxios.get(`${taskPath}/all`, {
      params: {
        projectId,
      },
    });
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
      const response = await unauthorizedAxios.get(`${taskPath}/${taskId}`);
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
  try {
    const response = await unauthorizedAxios.post(`${taskPath}`, {
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
};

//task 수정
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
  try {
    const response = await unauthorizedAxios.put(
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
};

//task 삭제
export const deleteOneTask = async (taskId: string): Promise<boolean> => {
  if (taskId) {
    try {
      const response = await unauthorizedAxios.delete(`${taskPath}`, {
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
