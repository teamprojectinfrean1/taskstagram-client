import { authorizedAxios } from "./domainSettings";

const memberPath = "/member";

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
