import { Button } from "@mui/material";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "react-query";
import { createIssue } from "@/apis/issueApi";
import Spinner from "@/components/Spinner";

type MutateFunction = (issue: Issue) => void;

type IssueCreateButtonProps = {
  handleFormSubmit: (mutationFunction: MutateFunction) => void;
};

const IssueCreateButton = ({
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
    errorMessage:
      "이슈를 추가하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "이슈를 추가했습니다.",
  });

  return (
    <>
      {isLoading && <Spinner centerInViewport size={70} />}
      <Button
        disabled={isLoading}
        onClick={() => handleFormSubmit(executeCreateIssue)}
        startIcon={<AddIcon />}
      >
        추가
      </Button>
    </>
  );
};

export default IssueCreateButton;