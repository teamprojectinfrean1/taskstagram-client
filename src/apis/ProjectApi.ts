import { unauthorizedAxios } from "./domainSettings";
import { ProjectSummary } from "@/models/Project";

const projectPath = "project";

type LastUpdateDetailType = {
  memeberUuid: string;
  userNickname: string;
  updatedDate: string;
};

type PrjectListResponse = {
  mainProject: ProjectSummary[];
  noMainProject: ProjectSummary[];
};

type ProjectDetailReponse = {
  projectId: string;
  projectName: string;
  projectContent: string;
  projectImage: string | null;
  startDate: string;
  endDate: string;
  lastUpdateDetail: LastUpdateDetailType;
  projectTags: string | null;
};

export type CreateProjectRequest = {
  projectName: string | null;
  writerUuid: string | null;
  projectContent: string | null;
  projectImageFile: File | null;
  projectTagList: string[] | null;
  memberUuidList: string[] | null;
  startDate: string | null;
  endDate: string | null;
  createDate: string | null;
};

export type ReplaceProjectRequest = {
  projectId: string;
  projectName: string | null;
  projectContent: string | null;
  projectImageFile: File | null;
  updaterUuid: string;
  projectTagList: string[] | null;
  startDate: string | null;
  endDate: string | null;
  memberUuidList: string[] | null;
};

// 프로젝트 리스트 조회
export const getProjectList = async (
  userUuid: string
): Promise<PrjectListResponse | null> => {
  if (userUuid) {
    try {
      const response = await unauthorizedAxios.get(
        `${projectPath}/list/${userUuid}`
      );
      return response.data.data;
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

// 프로젝트 상세조회
export const getProjectDetail = async (
  projectId: string | null
): Promise<ProjectDetailReponse | null> => {
  if (projectId) {
    try {
      const response = await unauthorizedAxios.get(
        `${projectPath}/${projectId}`
      );
      return response.data.data;
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

//프로젝트 생성
export const createOneProject = async ({
  projectName,
  writerUuid,
  projectContent,
  projectImageFile,
  projectTagList,
  memberUuidList,
  startDate,
  endDate,
  createDate,
}: CreateProjectRequest): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append(
      "project",
      new Blob(
        [
          JSON.stringify({
            projectName,
            writerUuid,
            projectContent,
            projectTagList,
            memberUuidList,
            startDate,
            endDate,
            createDate,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    if (projectImageFile) {
      formData.append("multipartFile", projectImageFile);
    }
    const response = await unauthorizedAxios.post(`${projectPath}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.isSuccess;
  } catch {
    return false;
  }
};

//프로젝트 수정
export const replaceOneProject = async ({
  projectId,
  projectName,
  updaterUuid,
  projectContent,
  projectImageFile,
  projectTagList,
  memberUuidList,
  startDate,
  endDate,
}: ReplaceProjectRequest): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append(
      "project",
      new Blob(
        [
          JSON.stringify({
            projectName,
            updaterUuid,
            projectContent,
            projectTagList,
            memberUuidList,
            startDate,
            endDate,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    if (projectImageFile) {
      formData.append("multipartFile", projectImageFile);
    }
    const response = await unauthorizedAxios.put(
      `${projectPath}/${projectId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.isSuccess;
  } catch {
    return false;
  }
};

//프로젝트 삭제
export const deleteOneProject = async (projectId: string): Promise<boolean> => {
  try {
    const response = await unauthorizedAxios.delete(
      `${projectPath}/${projectId}`
    );
    return response.data.isSuccess; //추후 변경 필요
  } catch {
    return false;
  }
};

// 메인 프로젝트 변경
export const changeMainProject = async (
  projectId: string | null
): Promise<boolean> => {
  if (projectId !== null) {
    try {
      const response = await unauthorizedAxios.put(
        `${projectPath}/main-project/${projectId}`
      );
      return response.data.isSuccess;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};
