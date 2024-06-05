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
  const { isSearchMode } = issueStatusBoardSearch[issueStatus];

  return isSearchMode
    ? ["issueSearchResults", projectId, issueStatus]
    : ["issueFullList", projectId, issueStatus];
};
