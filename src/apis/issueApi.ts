import { authorizedAxios } from "./domainSettings";

const issuePath = "/issue";




type CreateIssueRequest = {
  issue: NewIssue;
};

type CreateIssueResponse = {
  isSuccess: boolean;
};

export const createIssue = async ({
  issue,
}: CreateIssueRequest): Promise<CreateIssueResponse> => {
  try {
    const response = await authorizedAxios.post(issuePath, issue);
    return response.data.isSuccess;
  } catch (error) {
    throw new Error("이슈를 생성하는 중 오류가 발생했습니다.");
  }
};




type UpdateIssueStatusRequest = {
  issueId: string;
  newStatus: IssueStatus;
};

type UpdateIssueStatusResponse = {
  isSuccess: boolean;
};

export const updateIssueStatus = async ({
  issueId,
  newStatus,
}: UpdateIssueStatusRequest): Promise<UpdateIssueStatusResponse> => {
  try {
    const response = await authorizedAxios.get(
      `${issuePath}/status/${issueId}?=status=${newStatus}`
    );
    return response.data.isSuccess;
  } catch (error) {
    throw new Error("이슈 상태를 업데이트하는 중 오류가 발생했습니다.");
  }
};




type UpdateIssueDetailsRequest = {
  issueId: string;
  issue: UpdatedIssue;
};

type UpdateIssueDetailsResponse = {
  isSuccess: boolean;
};

export const updateIssueDetails = async ({
  issueId,
  issue,
}: UpdateIssueDetailsRequest): Promise<UpdateIssueDetailsResponse> => {
  try {
    const response = await authorizedAxios.put(
      `${issuePath}/detail/${issueId}`,
      issue
    );
    return response.data.isSuccess;
  } catch (error) {
    throw new Error("이슈 상세 정보를 업데이트하는 중 오류가 발생했습니다.");
  }
};





type GetIssueDetailsRequest = {
  issueId: string;
};

type GetIssueDetailsResponse = {
  issueDetails: IssueDetails;
};

export const getIssueDetails = async ({
  issueId,
}: GetIssueDetailsRequest): Promise<GetIssueDetailsResponse> => {
  try {
    const response = await authorizedAxios.get(`${issuePath}/${issueId}`);
    return response.data;
  } catch (error) {
    throw new Error("이슈 상세 정보를 가져오는 중 오류가 발생했습니다.");
  }
};




type GetIssueListRequest = {
  issueStatus: IssueStatus;
  page: number;
  projectId: string;
  size: number;
};

export const getIssueList = async ({
  issueStatus,
  page,
  projectId,
  size,
}: GetIssueListRequest): Promise<PaginatedResponse<IssueSummary>> => {
  try {
    const response = await authorizedAxios.post(
      `${issuePath}/allTickets/${issueStatus}`,
      {
        projectId,
        size,
        page,
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("이슈 목록을 가져오는 중 오류가 발생했습니다.");
  }
};




type SearchIssueRequest = {
  filter: string;
  page: number;
  projectId: string;
  size: number;
  issueStatus: string;
  word: string;
};

export const searchIssue = async ({
  filter,
  projectId,
  page,
  size,
  issueStatus,
  word,
}: SearchIssueRequest): Promise<PaginatedResponse<IssueSummary>> => {
  try {
    const response = await authorizedAxios.get(
      `${issuePath}/search/${issueStatus}`,
      {
        params: { filter, word },
        data: { projectId, page, size },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("이슈를 검색하는 중 오류가 발생했습니다.");
  }
};




type DeleteIssueRequest = {
  issueId: string;
};

type DeleteIssueResponse = {
  isSuccess: boolean;
};

export const deleteIssue = async ({
  issueId,
}: DeleteIssueRequest): Promise<DeleteIssueResponse> => {
  try {
    const response = await authorizedAxios.get(
      `${issuePath}/${issueId}`
    );
    return response.data.isSuccess;
  } catch (error) {
    throw new Error("이슈를 삭제하는 중 오류가 발생했습니다.");
  }
};