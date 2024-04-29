import { authorizedAxios, unauthorizedAxios } from "./domainSettings";

const userPath = "users";

export const getUserInfo = async () => {
  let userInfo = null;
  try {
    const response = await unauthorizedAxios.get(`${userPath}/token`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    });
    if (response.data) {
      userInfo = response.data.data;
    }
    return userInfo;
  } catch (err) {
    console.error(err);
  }
};

type UserStoryListRequest = {
  projectId: string;
  page: number;
};

type UserStoryListResponse = {
  dataList: IssueStory[];
  hasMore: boolean;
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
    throw new Error("이슈 스토리 목록을 가져오는 중 오류가 발생했습니다");
  }
};
