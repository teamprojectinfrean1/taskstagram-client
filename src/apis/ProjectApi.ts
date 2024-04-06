import axios from "axios";
import { BASE_URL } from "./domainSettings";
import Project from "@/models/Project";

const projectUrl = `${BASE_URL}/project`;

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
export const getProjectList = async (userId: string): Promise<Project[]> => {
  if (userId) {
    try {
      let projectList = [];
      const response = await axios.get(`${projectUrl}/list/${userId}`);
      if (response.data) {
        projectList = response.data.data;
      }
      return projectList;
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
      let projectDetail = null;
      const response = await axios.get(`${projectUrl}/${projectId}`);
      if (response.data) {
        projectDetail = response.data.data;
      }
      return projectDetail;
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
      const response = await axios.put(
        `${projectUrl}/main-project/${projectId}`
      );
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
