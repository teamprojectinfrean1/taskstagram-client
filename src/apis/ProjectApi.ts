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
