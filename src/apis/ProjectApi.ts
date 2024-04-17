import { authorizedAxios } from "./domainSettings";
import ProjectObj from "@/models/ProjectObj";

const projectPath = "project";

export const getProjectList = async (userId: string): Promise<ProjectObj[]> => {
  if (userId) {
    try {
      let projectList = [];
      const response = await authorizedAxios.get(
        `${projectPath}/list/${userId}`
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
