import axios from "axios";
import { BASE_URL } from "./domainSettings";
import ProjectObj from "@/models/ProjectObj";

const projectUrl = `${BASE_URL}/project`;

export const getProjectList = async (userId: string): Promise<ProjectObj[]> => {
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
): Promise<any> => {
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
