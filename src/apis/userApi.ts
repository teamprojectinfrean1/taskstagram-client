import axios from "axios";
import baseAxios from "./domainSettings";
import { UserStory } from "@/models/User";

const userUrl = "/users";

type UserStoryListRequest = {
  projectId: string;
  page: number;
};

type UserStoryListResponse = {
  dataList: UserStory[];
  hasMore: boolean;
};

export const getUserStoryList = async ({
  projectId,
  page,
}: UserStoryListRequest): Promise<UserStoryListResponse> => {
  const USER_PER_PAGE = 15;

  try {
    const response = await baseAxios.post(`${userUrl}/project/user-list`, {
      projectId,
      USER_PER_PAGE,
      page,
    });
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
