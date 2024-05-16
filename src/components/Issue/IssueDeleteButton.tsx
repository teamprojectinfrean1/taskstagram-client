import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback } from "react";
import { deleteIssue } from "@/apis/issueApi";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import Spinner from "@/components/Spinner";
import PrimaryButton from "@/components/PrimaryButton";
import { useMutation, useQueryClient } from "react-query";
import { issueStatusBoardSearchState } from "@/stores/issueStore";
import { useRecoilValue } from "recoil";
import { removeIssueFromCache } from "@/utils/issue/issueStatusBoardUpdaters";
import { createIssueStatusBoardQueryKey } from "@/utils/issue/issueStatusBoardQueryKeyGenerator";

type IssueDeleteButtonProps = {
  handleCloseIssueFormModal: () => void;
  issueId: string;
  projectId: string;
  issueStatus?: IssueStatus | null;
};

const IssueDeleteButton = ({
  handleCloseIssueFormModal,
  issueId,
  projectId,
  issueStatus,
}: IssueDeleteButtonProps) => {
  const queryClient = useQueryClient();
  const issueStatusBoardSearch = useRecoilValue(issueStatusBoardSearchState);

  const {
    mutate: executeDeleteIssue,
    data: removedIssue,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(() => deleteIssue({ issueId }));

  const successAction = useCallback(() => {
    if (removedIssue) {
      removeIssueFromCache({
        issueIdToRemove: removedIssue.issueId,
        queryClient,
        queryKey: createIssueStatusBoardQueryKey({
          issueStatus: issueStatus!,
          issueStatusBoardSearch,
          projectId,
        }),
      });
      if (issueStatus === "INPROGRESS") {
        queryClient.invalidateQueries(["issueStoryList", projectId]);
      }
      handleCloseIssueFormModal();
    }
  }, [removedIssue, issueStatus, projectId, queryClient]);

  useFeedbackHandler({
    isError,
    errorMessage:
      "이슈를 삭제하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "이슈가 삭제되었습니다.",
    successAction,
  });

  return (
    <>
      {isLoading && <Spinner centerInViewport size={70} />}
      <PrimaryButton
        disabled={!issueId || isLoading}
        onClick={(event) => {
          event.preventDefault();
          if (issueId) {
            executeDeleteIssue();
          }
        }}
        startIcon={<DeleteIcon />}
      >
        삭제
      </PrimaryButton>
    </>
  );
};

export default IssueDeleteButton;
