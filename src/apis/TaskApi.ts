import axios from "axios";
import { BASE_URL } from "./domainSettings";

const taskUrl = `${BASE_URL}/task`;

type getTaskListprops = {
  page: number;
  size: number;
  projectId: string | null;
};

export const getTaskList = async ({
  page,
  size,
  projectId,
}: getTaskListprops) => {
  let response = [];

  if (page && size && projectId !== null) {
    response = await axios
      .get(`${taskUrl}`, {
        params: {
          page: page,
          size: size,
          projectId: projectId,
        },
      })
      .then((res) => {
        if (res.data && res.data.data) {
          return res.data.data.dataList;
        }
      });
  }

  return response;
};
