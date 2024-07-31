import { authorizedAxios, unauthorizedAxios } from "./domainSettings";

const memberPath = "member";

type GetPaginatedProjectMemberListRequest = {
  page: number;
  projectId: string;
  size: number;
};

export const getPaginatedProjectMemberList = async ({
  page,
  projectId,
  size,
}: GetPaginatedProjectMemberListRequest): Promise<
  PaginatedResponse<ProjectMember>
> => {
  try {
    const response = await authorizedAxios.get(
      `${memberPath}/project/user/page`,
      {
        params: {
          page,
          projectId,
          size,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(
      "프로젝트 멤버 목록 페이지를 가져오는 중 오류가 발생했습니다."
    );
  }
};

type GetAllProjectMemberListRequest = {
  projectId: string;
};

type GetAllProjectMemberListResponse = ProjectMember[];

export const getAllProjectMemberList = async ({
  projectId,
}: GetAllProjectMemberListRequest): Promise<GetAllProjectMemberListResponse> => {
  try {
    const response = await authorizedAxios.get(
      `${memberPath}/project/user/list`,
      {
        params: {
          projectId,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(
      "프로젝트 멤버 목록 전체를 가져오는 중 오류가 발생했습니다."
    );
  }
};

type GetAllAppUserListResponse = User[];

export const getAllAppUserList =
  async (): Promise<GetAllAppUserListResponse> => {
    try {
      const response = await unauthorizedAxios.get(
        `${memberPath}/list/test` //추후 api명 변경 필요 (백엔드 요청)
      );
      return response.data.data.members;
    } catch (error) {
      throw new Error("전체 멤버 목록을 가져오는 중 오류가 발생했습니다.");
    }
  };

export const deleteUser = async (memberId: string) => {
  try {
    const response = await authorizedAxios.delete(
      `${memberPath}?memberId=${memberId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

type GetUserInfoResponse = {
  userOauthUuid: string,
  id: string,
  nickname: string,
  email: string,
  profileImage: string,
  weaver: boolean
}

export const getUserInfo = async (): Promise<GetUserInfoResponse | undefined> => {
  try {
    const response = await authorizedAxios.get(`${memberPath}/token`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    });
    return response.data.data;
  } catch (error) {
    throw error
  }
};