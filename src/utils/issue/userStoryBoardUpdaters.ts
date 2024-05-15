import { InfiniteData, QueryClient } from "react-query";

type MarkMemberAsHavingActiveIssueParmas = {
  assigneeIdOfNewOrUpdatedIssue: string;
  projectId: string;
  queryClient: QueryClient;
};

export const markMemberAsHavingActiveIssue = ({
  assigneeIdOfNewOrUpdatedIssue,
  projectId,
  queryClient,
}: MarkMemberAsHavingActiveIssueParmas) => {
  const queryKey = ["issueStoryList", projectId];

  queryClient.setQueryData<
    InfiniteData<PaginatedResponse<ProjectMember>> | undefined
  >(queryKey, (oldData) => {
    if (!oldData) return undefined;

    let foundAndUpdatePerformed = false;

    const updatedPages = oldData.pages.map((page) => {
      if (foundAndUpdatePerformed) return page;

      const updatedDataList = page.dataList.map((member) => {
        if (
          member.memberId === assigneeIdOfNewOrUpdatedIssue &&
          !member.hasAssigneeIssueInProgress
        ) {
          foundAndUpdatePerformed = true;
          return { ...member, hasAssigneeIssueInProgress: true };
        }
        return member;
      });

      return { ...page, dataList: updatedDataList };
    });

    return foundAndUpdatePerformed
      ? { ...oldData, pages: updatedPages }
      : oldData;
  });
};
