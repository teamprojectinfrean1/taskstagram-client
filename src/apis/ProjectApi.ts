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
