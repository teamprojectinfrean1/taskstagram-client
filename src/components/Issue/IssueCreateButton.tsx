import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createIssue } from "@/apis/issueApi";
import { PrimaryButton, Spinner } from "@/components";
import { issueStatusBoardSearchState } from "@/stores/issueStore";
import { useRecoilState } from "recoil";
import { addIssueToCache } from "@/utils/issue/issueStatusBoardUpdaters";
import { markMemberAsHavingActiveIssue } from "@/utils/issue/userStoryBoardUpdaters";
import { createIssueStatusBoardQueryKey } from "@/utils/issue/issueStatusBoardQueryKeyGenerator";

type MutateFunction = (issue: Issue) => void;

type IssueCreateButtonProps = {
  handleCloseIssueFormModal: () => void;
  handleFormSubmit: (mutationFunction: MutateFunction) => void;
  projectId: string;
};

const IssueCreateButton = ({
  handleCloseIssueFormModal,
  handleFormSubmit,
  projectId,
}: IssueCreateButtonProps) => {
  const queryClient = useQueryClient();
  const [issueStatusBoardSearch, setIssueStatusBoardSearch] = useRecoilState(
    issueStatusBoardSearchState
  );

  const {
    mutate: executeCreateIssue,
    data: newIssue,
    isLoading,
    isSuccess,
    isError,
  } = useMutation((newIssue: Issue) => createIssue({ issue: newIssue }));

  const successAction = useCallback(() => {
    if (newIssue) {
      addIssueToCache({
        issueStatus: newIssue.statusId!,
        newOrUpdatedIssue: newIssue,
        queryKey: createIssueStatusBoardQueryKey({
          issueStatus: newIssue.statusId!,
          issueStatusBoardSearch,
          projectId,
        }),
        queryClient,
        isIssueStatusBoardInSearchMode:
          issueStatusBoardSearch[newIssue?.statusId!].isSearchMode,
        setIssueStatusBoardSearch,
      });
      if (newIssue.statusId === "INPROGRESS") {
        markMemberAsHavingActiveIssue({
          assigneeIdOfNewOrUpdatedIssue: newIssue.assigneeId!,
          projectId,
          queryClient,
        });
      }
      handleCloseIssueFormModal();
    }
  }, [newIssue, projectId, queryClient, setIssueStatusBoardSearch]);

  useFeedbackHandler({
    isError,
    errorMessage:
      "이슈를 추가하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "이슈가 추가되었습니다.",
    successAction,
  });

  return (
    <>
      {isLoading && <Spinner centerInViewport size={70} />}
      <PrimaryButton
        disabled={isLoading}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          handleFormSubmit(executeCreateIssue);
        }}
        startIcon={<EditIcon />}
      >
        저장
      </PrimaryButton>
    </>
  );
};

export default IssueCreateButton;
