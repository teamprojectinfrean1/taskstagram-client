import { authorizedAxios } from "./domainSettings";

const issuePath = "/issue";

export const createNewIssue = async (issue: NewIssue): Promise<boolean> => {
  try {
    const response = await authorizedAxios.post(issuePath, issue);
    return response.data.success;
  } catch (error) {
    throw new Error("An unknown error occurred");
  }
};

export const updateIssueStatus = async (payload: UpdateIssuePayload) => {};

type IssueDetailsRequest = {
  issueId: string;
};

type IssueDetailsResponse = {
  issueDetails: IssueDetails;
};

export const getIssueDetails = async ({
  issueId
}: IssueDetailsRequest): Promise<IssueDetailsResponse> => {
  try {
    const response = await authorizedAxios.get(`${issuePath}/${issueId}`);
    return response.data.data;
  } catch (error) {
    throw new Error("An unknown error occurred");
  }
};

type IssueListRequest = {
  issueStatus: string;
  page: number;
  projectId: string;
  size: number;
};

export const getIssueList = async ({
  issueStatus,
  page,
  projectId,
  size,
}: IssueListRequest): Promise<PaginatedResponse<IssueSummary>> => {
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
    throw new Error("An unknown error occurred");
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
    throw new Error("An unknown error occurred");
  }
};
