import { useState, useEffect } from "react";
import { InfiniteData, useMutation, QueryClient } from "react-query";
import { updateIssueStatus } from "@/apis/issueApi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { snackbarState } from "@/stores/snackbarStore";
import {
  issueStatusBoardSearchModeState,
  issueStatusBoardSearchParamsState,
} from "@/stores/issueStore";
import { updateIssueInCacheInvolvingStatusChange } from "@/utils/issue/issueStatusBoardUpdaters";
import { markMemberAsHavingActiveIssue } from "@/utils/issue/userStoryBoardUpdaters";
import { endIssueSearchMode } from "@/stores/issueStore";

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
  const [issueStatusBoardSearchModes, setIssueStatusBoardSearchModes] =
    useRecoilState(issueStatusBoardSearchModeState);
  const [searchParams, setIssueStatusBoardSearchParams] = useRecoilState(
    issueStatusBoardSearchParamsState
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
        const oldStatusBoardQueryKey = issueStatusBoardSearchModes[oldStatus]
          ? "issueSearchResults"
          : "defaultIssueList";
        const newStatusBoardQueryKey = issueStatusBoardSearchModes[newStatus]
          ? "issueSearchResults"
          : "defaultIssueList";

        await queryClient.cancelQueries([
          oldStatusBoardQueryKey,
          projectId,
          oldStatus,
        ]);
        await queryClient.cancelQueries([
          newStatusBoardQueryKey,
          projectId,
          newStatus,
        ]);

        const previousOldStatusIssueList = queryClient.getQueryData<
          InfiniteData<PaginatedResponse<IssueSummary>>
        >([oldStatusBoardQueryKey, projectId, oldStatus]);
        const previousNewStatusIssueList = issueStatusBoardSearchModes[
          newStatus
        ]
          ? undefined
          : queryClient.getQueryData<
              InfiniteData<PaginatedResponse<IssueSummary>>
            >([newStatusBoardQueryKey, projectId, newStatus]);

        const savedSearchParams = issueStatusBoardSearchModes[newStatus]
          ? searchParams[newStatus]
          : undefined;

        updateIssueInCacheInvolvingStatusChange({
          newOrUpdatedIssue: { ...issue, statusId: newStatus },
          oldStatus,
          newStatus,
          projectId,
          queryClient,
          issueStatusBoardSearchModes,
          setIssueStatusBoardSearchModes,
          setIssueStatusBoardSearchParams,
          isOptimisticUpdate: true,
        });

        setRollbackData({
          issue,
          oldStatus,
          oldStatusBoardQueryKey,
          previousOldStatusIssueList,
          newStatus,
          newStatusBoardQueryKey,
          previousNewStatusIssueList,
          savedSearchParams,
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

      endIssueSearchMode(
        setIssueStatusBoardSearchModes,
        setIssueStatusBoardSearchParams,
        newStatus
      );

      if (newStatus === "INPROGRESS") {
        markMemberAsHavingActiveIssue({
          assigneeIdOfNewOrUpdatedIssue: issue.assigneeId!,
          projectId,
          queryClient,
        });
      } else if (newStatus === "TODO" || newStatus === "DONE") {
        queryClient.invalidateQueries(["userStoryList", projectId]);
      }
    }
  }, [isSuccess, setSnackbar]);

  useEffect(() => {
    if (isError && rollbackData) {
      const {
        oldStatus,
        oldStatusBoardQueryKey,
        previousOldStatusIssueList,
        newStatus,
        newStatusBoardQueryKey,
        previousNewStatusIssueList,
        savedSearchParams,
      } = rollbackData;

      queryClient.setQueryData(
        [oldStatusBoardQueryKey, projectId, oldStatus],
        previousOldStatusIssueList
      );

      if (previousNewStatusIssueList) {
        queryClient.setQueryData(
          [newStatusBoardQueryKey, projectId, newStatus],
          previousNewStatusIssueList
        );
      }

      if (savedSearchParams) {
        setIssueStatusBoardSearchParams((prev) => ({
          ...prev,
          [newStatus]: savedSearchParams,
        }));
        setIssueStatusBoardSearchModes((prev) => ({
          ...prev,
          [newStatus]: true,
        }));
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
    setIssueStatusBoardSearchParams,
    setIssueStatusBoardSearchModes,
  ]);

  return executeUpdateIssueStatus;
};

export default useUpdateIssueStatus;
