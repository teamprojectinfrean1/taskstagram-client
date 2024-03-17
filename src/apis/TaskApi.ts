import axios from "axios";
import { BASE_URL } from "./domainSettings";

const taskUrl = `${BASE_URL}/task`;

type getTaskListProps = {
  page: number;
  size: number;
  projectId: string | null;
};

//프로젝트에 생성된 테스크들 조회
export const getTaskList = async ({
  page,
  size,
  projectId,
}: getTaskListProps) => {
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

//task 상세조회
export const getTaskDetail = async (taskId: string) => {
  let response = null;

  if (taskId) {
    response = await axios.get(`${taskUrl}/${taskId}`).then((res) => {
      if (res.data) {
        return res.data.data;
      }
    });
  }

  return response;
};
