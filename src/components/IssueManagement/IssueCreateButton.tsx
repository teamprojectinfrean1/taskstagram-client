import { Button } from "@mui/material";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "react-query";
import { createIssue } from "@/apis/issueApi";

type MutateFunction = (issue: Issue) => void;

type IssueCreateButtonProps = {
  handleFormSubmit: (mutationFunction: MutateFunction) => void;
};

export const IssueCreateButton = ({
  handleFormSubmit,
}: IssueCreateButtonProps) => {
  const {
    mutate: executeCreateIssue,
    data,
    isLoading,
    isSuccess,
    isError,
  } = useMutation((issue: Issue) => createIssue({ issue }));

  useFeedbackHandler({
    isError,
    isLoading,
    isSuccess,
    successMessage: "이슈를 추가했습니다.",
    errorMessage:
      "이슈를 추가하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오.",
  });

  return (
    <Button
      disabled={isLoading}
      onClick={() => handleFormSubmit(executeCreateIssue)}
      startIcon={<AddIcon />}
    >
      추가
    </Button>
  );
};
