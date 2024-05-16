import { useState, useEffect } from "react";
import { InfiniteData, useMutation, QueryClient } from "react-query";
import { updateIssueStatus } from "@/apis/issueApi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { snackbarState } from "@/stores/snackbarStore";
import { issueStatusBoardSearchState } from "@/stores/issueStore";
import { updateIssueInCacheInvolvingStatusChange } from "@/utils/issue/issueStatusBoardUpdaters";
import { markMemberAsHavingActiveIssue } from "@/utils/issue/userStoryBoardUpdaters";
import { endIssueSearchMode } from "@/stores/issueStore";
import { createIssueStatusBoardQueryKey } from "@/utils/issue/issueStatusBoardQueryKeyGenerator";

type useUpdateIssueStatusParams = {
  projectId: string;
  queryClient: QueryClient;
};

type IssueStatusMutationArgs = {
  modifierId: string;
  issue: IssueSummary;
  oldStatus: IssueStatus;
  newStatus: IssueStatus;
};

const useUpdateIssueStatus = ({
  projectId,
  queryClient,
}: useUpdateIssueStatusParams) => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const [issueStatusBoardSearch, setIssueStatusBoardSearch] = useRecoilState(
    issueStatusBoardSearchState
  );
  const [rollbackData, setRollbackData] = useState<any>(null);

  const {
    mutate: executeUpdateIssueStatus,
    data: updatedIssue,
    isError,
    isSuccess,
  } = useMutation(
    ({ modifierId, issue, newStatus }: IssueStatusMutationArgs) =>
      updateIssueStatus({
        modifierId,
        issueId: issue.issueId,
        newStatus,
      }),
    {
      onMutate: async ({ issue, oldStatus, newStatus }) => {
        const oldStatusBoardQueryKey = createIssueStatusBoardQueryKey({
          issueStatus: oldStatus,
          issueStatusBoardSearch,
          projectId,
        });

        const newStatusBoardQueryKey = createIssueStatusBoardQueryKey({
          issueStatus: newStatus,
          issueStatusBoardSearch,
          projectId,
        });

        await queryClient.cancelQueries([oldStatusBoardQueryKey]);
        await queryClient.cancelQueries([newStatusBoardQueryKey]);

        const previousOldStatusIssueList = queryClient.getQueryData<
          InfiniteData<PaginatedResponse<IssueSummary>>
        >(oldStatusBoardQueryKey);

        const isNewStatusBoardInSearchMode =
          issueStatusBoardSearch[newStatus].isSearchMode;

        const previousNewStatusIssueList = isNewStatusBoardInSearchMode
          ? undefined
          : queryClient.getQueryData<
              InfiniteData<PaginatedResponse<IssueSummary>>
            >(newStatusBoardQueryKey);

        updateIssueInCacheInvolvingStatusChange({
          newOrUpdatedIssue: { ...issue, statusId: newStatus },
          newStatus,
          queryClient,
          oldStatusBoardQueryKey,
          newStatusBoardQueryKey,
          isNewStatusBoardInSearchMode,
          setIssueStatusBoardSearch,
          isOptimisticUpdate: true,
        });

        setRollbackData({
          issue,
          oldStatusBoardQueryKey,
          previousOldStatusIssueList,
          newStatusBoardQueryKey,
          previousNewStatusIssueList,
        });
      },
    }
  );

  useEffect(() => {
    if (isSuccess) {
      const { issue } = rollbackData;

      setSnackbar({
        show: true,
        message: "이슈의 상태가 변경되었습니다.",
        severity: "success",
      });
      const newStatus = updatedIssue.statusId;

      endIssueSearchMode(setIssueStatusBoardSearch, newStatus);

      if (newStatus === "INPROGRESS") {
        markMemberAsHavingActiveIssue({
          assigneeIdOfNewOrUpdatedIssue: issue.assigneeId!,
          projectId,
          queryClient,
        });
      } else if (newStatus === "TODO" || newStatus === "DONE") {
        queryClient.invalidateQueries(["issueStoryList", projectId]);
      }
    }
  }, [isSuccess, setSnackbar]);

  useEffect(() => {
    if (isError && rollbackData) {
      const {
        oldStatusBoardQueryKey,
        previousOldStatusIssueList,
        newStatusBoardQueryKey,
        previousNewStatusIssueList,
      } = rollbackData;

      queryClient.setQueryData(
        oldStatusBoardQueryKey,
        previousOldStatusIssueList
      );

      if (previousNewStatusIssueList) {
        queryClient.setQueryData(
          newStatusBoardQueryKey,
          previousNewStatusIssueList
        );
      }

      setSnackbar({
        show: true,
        message:
          "이슈를 옮기는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        severity: "error",
      });
    }
  }, [
    isError,
    rollbackData,
    queryClient,
    projectId,
    setSnackbar,
    issueStatusBoardSearch,
    setIssueStatusBoardSearch,
  ]);

  return executeUpdateIssueStatus;
};

export default useUpdateIssueStatus;
