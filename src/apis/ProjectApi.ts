import axios from "axios";
import { BASE_URL } from "./domainSettings";
import ProjectObj from "@/models/ProjectObj";

const projectUrl = `${BASE_URL}/project`;

export const getProjectList = async (userId: string): Promise<ProjectObj[]> => {
  let response = [];

  if (userId) {
    response = await axios.get(`${projectUrl}/list/${userId}`).then((res) => {
      if (res.data) {
        return res.data.data;
      }
    });
  }
  return response;
};
