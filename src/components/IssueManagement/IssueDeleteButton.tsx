import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteIssue } from "@/apis/issueApi";
import { useMutation } from "react-query";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import Spinner from "@/components/Spinner";
import PrimaryButton from "@/components/PrimaryButton";

type IssueDeleteButtonProps = {
  issueId: string;
};

const IssueDeleteButton = ({ issueId }: IssueDeleteButtonProps) => {
  const {
    mutate: executeDeleteIssue,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(() => deleteIssue({ issueId }));

  useFeedbackHandler({
    isError,
    isSuccess,
    successMessage: "이슈가 삭제되었습니다.",
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
