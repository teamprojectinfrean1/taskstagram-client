import { authorizedAxios } from "./domainSettings";
import ProjectObj from "@/models/ProjectObj";

const projectUrl = "project";

export const getProjectList = async (userId: string): Promise<ProjectObj[]> => {
  if (userId) {
    try {
      let projectList = [];
      const response = await authorizedAxios.get(
        `${projectUrl}/list/${userId}`
      );
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
