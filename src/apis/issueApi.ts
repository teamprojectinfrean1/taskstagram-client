import { authorizedAxios } from "./domainSettings";

const issuePath = "/issue";

type CreateIssueRequest = {
  issue: Issue;
};

type CreateIssueResponse = {
  isSuccess: boolean;
};

export const createIssue = async ({
  issue,
}: CreateIssueRequest): Promise<CreateIssueResponse> => {
  const {
    writerId,
    assigneeId,
    taskId,
    startDate,
    endDate,
    issueTitle,
    issueContent,
    statusId,
  } = issue;

  const newIssuePayload = {
    creatorId: writerId,
    assigneeId,
    taskId,
    startDate,
    endDate,
    issueTitle,
    issueContent: JSON.stringify(issueContent),
    status: statusId,
  };

  try {
    const response = await authorizedAxios.post(issuePath, newIssuePayload);
    return response.data.isSuccess;
  } catch (error) {
    throw new Error("이슈를 생성하는 중 오류가 발생했습니다.");
  }
};

type UpdateIssueDetailsRequest = {
  issueId: string;
  issue: Issue;
};

type UpdateIssueDetailsResponse = {
  isSuccess: boolean;
};

export const updateIssueDetails = async ({
  issueId,
  issue,
}: UpdateIssueDetailsRequest): Promise<UpdateIssueDetailsResponse> => {
  const {
    writerId,
    assigneeId,
    taskId,
    startDate,
    endDate,
    issueTitle,
    issueContent,
    statusId,
  } = issue;

  const updatedIssuePayload = {
    modifierId: writerId,
    assigneeId,
    taskId,
    startDate,
    endDate,
    issueTitle,
    issueContent,
    status: statusId,
  };

  try {
    const response = await authorizedAxios.put(
      `${issuePath}/detail/${issueId}`,
      updatedIssuePayload
    );
    return response.data.isSuccess;
  } catch (error) {
    throw new Error("이슈 상세 정보를 업데이트하는 중 오류가 발생했습니다.");
  }
};

type UpdateIssueStatusRequest = {
  issue: IssueSummary;
  oldStatus: IssueStatus;
  newStatus: IssueStatus;
};

type UpdateIssueStatusResponse = {
  isSuccess: boolean;
};

export const updateIssueStatus = async ({
  issue,
  newStatus,
}: UpdateIssueStatusRequest): Promise<UpdateIssueStatusResponse> => {
  try {
    const response = await authorizedAxios.put(
      `${issuePath}/status/${issue.issueId}`,
      {
        params: {
          status: newStatus,
        },
      }
    );
    return response.data.isSuccess;
  } catch (error) {
    throw new Error("이슈 상태를 업데이트하는 중 오류가 발생했습니다.");
  }
};

type GetIssueDetailsRequest = {
  issueId: string;
};

type GetIssueDetailsResponse = Issue;

export const getIssueDetails = async ({
  issueId,
}: GetIssueDetailsRequest): Promise<GetIssueDetailsResponse> => {
  try {
    const response = await authorizedAxios.get(
      `${issuePath}/detail/${issueId}`
    );

    console.log(response.data.data);

    const { status, issueContent, ...rest } = response.data.data;

    const statusTitleMap: { [key in IssueStatus]: IssueStatusTitle } = {
      TODO: "할 일",
      INPROGRESS: "진행 중",
      DONE: "완료",
    };


    const issueDetails = {
      statusId: status,
      statusTitle: statusTitleMap[status as IssueStatus],
      issueContent: issueContent ? JSON.parse(issueContent) : null,
      ...rest,
    };


    return issueDetails;
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
    const response = await authorizedAxios.get(
      `${issuePath}/allTickets/${issueStatus}`,
      {
        params: {
          projectId,
          page,
          size,
        },
      }
    );
    console.log(response.data.data);
    // return response.data.data;
    return {
      dataList: response.data.data.dataList,
      totalPage: response.data.data.totalPage,
    };
  } catch (error) {
    throw new Error("이슈 목록을 가져오는 중 오류가 발생했습니다.");
  }
};

type SearchIssueRequest = {
  filter: IssueSearchFilter;
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
        params: { filter, word, projectId, page, size },
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
    const response = await authorizedAxios.delete(`${issuePath}/${issueId}`);
    return response.data.isSuccess;
  } catch (error) {
    throw new Error("이슈를 삭제하는 중 오류가 발생했습니다.");
  }
};
