import { authorizedAxios } from "./domainSettings";

const memberPath = "/member";

type ProjectMemberListRequest = {
  page: number;
  projectId: string;
  size: number;
};

export const getProjectMemberList = async ({
  page,
  projectId,
  size,
}: ProjectMemberListRequest): Promise<PaginatedResponse<ProjectMember>> => {
  try {
    const response = await authorizedAxios.post(
      `${memberPath}/project/user-list`,
      {
        page,
        projectId,
        size,
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("An unknown error occurred");
  }
};
