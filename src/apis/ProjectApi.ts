import { unauthorizedAxios } from "./domainSettings";
import { ProjectSummary } from "@/models/Project";

const projectPath = "project";

type LastUpdateDetailType = {
  userUuid: string;
  userNickName: string;
  updatedDate: string;
};

type ProjectDetailReponse = {
  projectId: string;
  projectName: string;
  projectContent: string;
  startDate: string;
  endDate: string;
  lastUpdateDetail: LastUpdateDetailType;
  projectTagList: [] | null;
};

// 프로젝트 리스트 조회
export const getProjectList = async (
  userId: string
): Promise<ProjectSummary[]> => {
  if (userId) {
    try {
      const response = await unauthorizedAxios.get(`${projectPath}/list/${userId}`);
      return response.data.data;
    } catch {
      return [];
    }
  } else {
    return [];
  }
};

// 프로젝트 상세조회
export const getProjectDetail = async (
  projectId: string | null
): Promise<ProjectDetailReponse | null> => {
  if (projectId) {
    try {
      const response = await unauthorizedAxios.get(`${projectPath}/${projectId}`);
      return response.data.data;
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

// 메인 프로젝트 변경
export const changeMainProject = async (
  projectId: string | null
): Promise<boolean> => {
  if (projectId !== null) {
    try {
      const response = await unauthorizedAxios.put(
        `${projectPath}/main-project/${projectId}`
      );
      return response.data.isSuccess;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};