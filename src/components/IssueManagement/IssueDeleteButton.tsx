import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteIssue } from "@/apis/issueApi";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import Spinner from "@/components/Spinner";
import PrimaryButton from "@/components/PrimaryButton";
import { InfiniteData, useMutation, useQueryClient } from "react-query";

type IssueDeleteButtonProps = {
  issueId: string;
  projectId: string;
  issueStatus?: IssueStatus | null;
};

const IssueDeleteButton = ({
  issueId,
  projectId,
  issueStatus,
}: IssueDeleteButtonProps) => {
  const queryClient = useQueryClient();

  const {
    mutate: executeDeleteIssue,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(() => deleteIssue({ issueId }));

  const deleteIssueFromList = (issueId: string, issueStatus: IssueStatus) => {
    const queryKey = ["defaultIssueList", projectId, issueStatus];

    console.log("Query key:", queryKey);

    queryClient.setQueryData<
      InfiniteData<PaginatedResponse<Issue>> | undefined
    >(queryKey, (oldData) => {
      if (!oldData) return undefined;

      const newPages = [];
      let issueRemoved = false;
      let carryOverIssue: Issue | undefined;

      for (let i = 0; i < oldData.pages.length; i++) {
        let currentPage = oldData.pages[i];
        let currentPageIssues = currentPage.dataList;

        if (!issueRemoved) {
          currentPageIssues = currentPageIssues.filter(
            (issue) => issue.issueId !== issueId
          );
          issueRemoved =
            currentPageIssues.length !== oldData.pages[i].dataList.length;
        }

        if (carryOverIssue) {
          currentPageIssues = [carryOverIssue, ...currentPageIssues];
        }

        carryOverIssue = currentPageIssues.pop();

        newPages.push({ ...currentPage, dataList: currentPageIssues });
      }

      if (carryOverIssue) {
        newPages.push({
          dataList: [carryOverIssue],
          totalPage: oldData.pages[oldData.pages.length - 1].totalPage,
        });
      }

      if (newPages[newPages.length - 1].dataList.length === 0) {
        newPages.pop();
      }

      return {
        ...oldData,
        pages: newPages,
        pageParams: oldData.pageParams,
      };
    });
  };

  useFeedbackHandler({
    isError,
    isSuccess,
    successMessage: "이슈가 삭제되었습니다.",
    successAction: () => {
      if (issueId && issueStatus) deleteIssueFromList(issueId, issueStatus);
    },
    errorMessage:
      "이슈를 삭제하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
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
