import axios from "axios";
import { authorizedAxios, unauthorizedAxios } from "./domainSettings";
import { IssueStory } from "@/models/Issue";

const userPath = "/users";

type UserStoryListRequest = {
  projectId: string;
  page: number;
};

type UserStoryListResponse = {
  dataList: IssueStory[];
  hasMore: boolean;
};


export const getUserInfo = async () => {
  let userInfo = null;
  try {
    const response = await unauthorizedAxios.get(`${userPath}/token`, {
      headers: {
        Authorization: sessionStorage.getItem('accessToken')
      }
    });
    if (response.data) {
      userInfo = response.data.data
    }
    return userInfo
  } catch (err) {
    console.error(err);
  }
};

export const getUserStoryList = async ({
  projectId,
  page,
}: UserStoryListRequest): Promise<UserStoryListResponse> => {
  const USER_PER_PAGE = 15;

  try {
    const response = await authorizedAxios.post(
      `${userPath}/project/user-list`,
      {
        projectId,
        USER_PER_PAGE,
        page,
      }
    );
    const data = response.data;
    return { dataList: data.data, hasMore: data.hasMore };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
