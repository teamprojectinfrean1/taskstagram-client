import { authorizedAxios, unauthorizedAxios } from "./domainSettings";

const userPath = "/users";



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

type UserStoryListRequest = {
  page: number;
  projectId: string;
  size: number;
};

export const getUserStoryList = async ({
  page,
  projectId,
  size
}: UserStoryListRequest): Promise<PaginatedResponse<UserInfo>> => {
  try {
    const response = await authorizedAxios.post(
      `${userPath}/project/user-list`,
      {
        page,
        projectId,
        size
      }
    );
    return response.data.data;
  } catch (error) {
      throw new Error("An unknown error occurred");
  }
};
