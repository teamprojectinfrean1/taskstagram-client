type GetQueryKeyParams = {
  issueStatus: IssueStatus;
  issueStatusBoardSearch: IssueStatusBoardSearchState;
  projectId: string;
};

export const createIssueStatusBoardQueryKey = ({
  issueStatus,
  issueStatusBoardSearch,
  projectId,
}: GetQueryKeyParams) => {
  const { isSearchMode, searchParams } = issueStatusBoardSearch[issueStatus];

  return isSearchMode
    ? ["issueSearchResults", projectId, issueStatus, searchParams.filter]
    : ["defaultIssueList", projectId, issueStatus];
};
