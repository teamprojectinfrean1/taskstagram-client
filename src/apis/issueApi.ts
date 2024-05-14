import { authorizedAxios } from "./domainSettings";

const issuePath = "/issue";

const statusTitleMap: { [key in IssueStatus]: IssueStatusTitle } = {
  TODO: "할 일",
  INPROGRESS: "진행 중",
  DONE: "완료",
};

type CreateIssueRequest = {
  issue: Issue;
};

type CreateIssueResponse = IssueSummary;

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

    const { status, ...rest } = response.data.data;

    const issueSummary = {
      statusId: status,
      ...rest,
    };

    return issueSummary;
  } catch (error) {
    throw new Error("이슈를 생성하는 중 오류가 발생했습니다.");
  }
};

type UpdateIssueDetailsRequest = {
  issueId: string;
  issue: Issue;
};

type UpdateIssueDetailsResponse = IssueSummary;

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
    issueContent: JSON.stringify(issueContent),
    status: statusId,
  };

  try {
    const response = await authorizedAxios.put(
      `${issuePath}/detail/${issueId}`,
      updatedIssuePayload
    );

    const { status, ...rest } = response.data.data;

    const issueSummary = {
      statusId: status,
      ...rest,
    };

    return issueSummary;
  } catch (error) {
    throw new Error("이슈 상세 정보를 업데이트하는 중 오류가 발생했습니다.");
  }
};

type UpdateIssueStatusRequest = {
  modifierId: string;
  issueId: string;
  newStatus: IssueStatus;
};

type UpdateIssueStatusResponse = {
  issueId: string;
  statusId: IssueStatus;
};

export const updateIssueStatus = async ({
  modifierId,
  issueId,
  newStatus,
}: UpdateIssueStatusRequest): Promise<UpdateIssueStatusResponse> => {
  try {
    const response = await authorizedAxios.put(
      `${issuePath}/status/${issueId}`,
      {
        memberId: modifierId,
        status: newStatus,
      }
    );
    const data = response.data.data;
    return { issueId, statusId: data.status };
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

    const { status, issueContent, ...rest } = response.data.data;

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

    return {
      dataList: response.data.data.dataList,
      totalPage: response.data.data.totalPage,
    };
  } catch (error) {
    if (error === 422) {
      throw new Error("태스크를 먼저 생성해야 함");
    } else {
      throw new Error("이슈 목록을 가져오는 중 오류가 발생했습니다.");
    }
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
  issueId: string;
};

export const deleteIssue = async ({
  issueId,
}: DeleteIssueRequest): Promise<DeleteIssueResponse> => {
  try {
    const response = await authorizedAxios.delete(`${issuePath}/${issueId}`);
    return { issueId: response.data.data };
  } catch (error) {
    throw new Error("이슈를 삭제하는 중 오류가 발생했습니다.");
  }
};
