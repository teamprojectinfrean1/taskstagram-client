import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateIssueDetails } from "@/apis/issueApi";
import EditIcon from "@mui/icons-material/Edit";
import Spinner from "@/components/Spinner";
import PrimaryButton from "@/components/PrimaryButton";
import { issueStatusBoardSearchState } from "@/stores/issueStore";
import { useRecoilState } from "recoil";
import {
  updateIssueInCacheInvolvingStatusChange,
  updateIssueInCacheUninvolvingStatusChange,
} from "@/utils/issue/issueStatusBoardUpdaters";
import { createIssueStatusBoardQueryKey } from "@/utils/issue/issueStatusBoardQueryKeyGenerator";

type MutateFunction = (issue: Issue) => void;

type IssueUpdateButtonProps = {
  handleCloseIssueFormModal: () => void;
  handleFormSubmit: (mutationFunction: MutateFunction) => void;
  issueId: string;
  oldAssigneeId: string;
  oldIssueStatus: IssueStatus | null;
  projectId: string;
};

const IssueUpdateButton = ({
  handleCloseIssueFormModal,
  handleFormSubmit,
  issueId,
  oldAssigneeId,
  oldIssueStatus,
  projectId,
}: IssueUpdateButtonProps) => {
  const queryClient = useQueryClient();
  const [issueStatusBoardSearch, setIssueStatusBoardSearch] = useRecoilState(
    issueStatusBoardSearchState
  );

  const {
    mutate: executeUpdateIssueDetails,
    data: updatedIssue,
    isLoading,
    isSuccess,
    isError,
  } = useMutation((issue: Issue) => updateIssueDetails({ issueId, issue }));

  const successAction = useCallback(() => {
    if (updatedIssue) {
      const newStatus = updatedIssue!.statusId;

      const involvedIssueStatusChange = oldIssueStatus !== newStatus;

      const { statusId, assigneeId } = updatedIssue;

      if (involvedIssueStatusChange) {
        updateIssueInCacheInvolvingStatusChange({
          newOrUpdatedIssue: updatedIssue!,
          newStatus: newStatus,
          queryClient,
          oldStatusBoardQueryKey: createIssueStatusBoardQueryKey({
            issueStatus: oldIssueStatus!,
            issueStatusBoardSearch,
            projectId,
          }),
          newStatusBoardQueryKey: createIssueStatusBoardQueryKey({
            issueStatus: newStatus,
            issueStatusBoardSearch,
            projectId,
          }),
          isNewStatusBoardInSearchMode:
            issueStatusBoardSearch[newStatus].isSearchMode,
          setIssueStatusBoardSearch,
        });
        queryClient.invalidateQueries(["issueStoryList", projectId]);
      } else {
        updateIssueInCacheUninvolvingStatusChange({
          queryClient,
          queryKey: createIssueStatusBoardQueryKey({
            issueStatus: updatedIssue?.statusId!,
            issueStatusBoardSearch,
            projectId,
          }),
          updatedIssue: updatedIssue!,
        });

        if (statusId === "INPROGRESS" && assigneeId !== oldAssigneeId) {
          queryClient.invalidateQueries(["issueStoryList", projectId]);
        }
      }
      handleCloseIssueFormModal();
    }
  }, [
    updatedIssue,
    oldIssueStatus,
    projectId,
    queryClient,
    issueStatusBoardSearch,
    oldAssigneeId,
  ]);

  useFeedbackHandler({
    isError,
    errorMessage:
      "이슈를 수정하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "이슈가 수정되었습니다.",
    successAction,
  });

  return (
    <>
      {isLoading && <Spinner centerInViewport size={70} />}
      <PrimaryButton
        disabled={!issueId || isLoading}
        onClick={() => handleFormSubmit(executeUpdateIssueDetails)}
        startIcon={<EditIcon />}
      >
        저장
      </PrimaryButton>
    </>
  );
};

export default IssueUpdateButton;
