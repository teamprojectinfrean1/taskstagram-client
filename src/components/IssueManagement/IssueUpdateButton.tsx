import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateIssueDetails } from "@/apis/issueApi";
import EditIcon from "@mui/icons-material/Edit";
import Spinner from "@/components/Spinner";
import PrimaryButton from "@/components/PrimaryButton";
import {
  issueStatusBoardSearchModeState,
  issueStatusBoardSearchParamsState,
} from "@/stores/issueStore";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  updateIssueInCacheInvolvingStatusChange,
  updateIssueInCacheUninvolvingStatusChange,
} from "@/utils/issue/issueStatusBoardUpdaters";
import { markMemberAsHavingActiveIssue } from "@/utils/issue/userStoryBoardUpdaters";

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
  const [issueStatusBoardSearchModes, setIssueStatusBoardSearchModes] =
    useRecoilState(issueStatusBoardSearchModeState);
  const setIssueStatusBoardSearchParams = useSetRecoilState(
    issueStatusBoardSearchParamsState
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
      const involvedIssueStatusChange =
        oldIssueStatus !== updatedIssue!.statusId;

      const { statusId, assigneeId } = updatedIssue;

      if (involvedIssueStatusChange) {
        updateIssueInCacheInvolvingStatusChange({
          newOrUpdatedIssue: updatedIssue!,
          oldStatus: oldIssueStatus!,
          newStatus: updatedIssue!.statusId,
          projectId,
          queryClient,
          issueStatusBoardSearchModes,
          setIssueStatusBoardSearchModes,
          setIssueStatusBoardSearchParams,
        });
        queryClient.invalidateQueries(["userStoryList", projectId]);
      } else {
        updateIssueInCacheUninvolvingStatusChange({
          isIssueStatusBoardInSearchMode:
            issueStatusBoardSearchModes[updatedIssue?.statusId!],
          issueStatus: updatedIssue?.statusId!,
          projectId,
          queryClient,
          updatedIssue: updatedIssue!,
        });
        if (statusId === "INPROGRESS" && assigneeId !== oldAssigneeId) {
          queryClient.invalidateQueries(["userStoryList", projectId]);
        }
      }
      handleCloseIssueFormModal();
    }
  }, [
    updatedIssue,
    oldIssueStatus,
    projectId,
    queryClient,
    issueStatusBoardSearchModes,
    setIssueStatusBoardSearchModes,
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
