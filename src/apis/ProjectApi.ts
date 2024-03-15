import axios from "axios";
import { BASE_URL } from "./domainSettings";

const projectUrl = `${BASE_URL}/project`;

export const getProjectList = async (userId: string) => {
  const response = await axios
    .get(`${projectUrl}/list/${userId}`)
    .then((res) => {
      if (res.data) {
        return res.data.data;
      }
    });

  return response;
};
