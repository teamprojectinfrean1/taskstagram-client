import { Button } from "@mui/material";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import { useMutation } from "react-query";
import { updateIssueDetails } from "@/apis/issueApi";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Spinner from "@/components/Spinner";

type MutateFunction = (issue: Issue) => void;

type IssueUpdateButtonProps = {
  issueId: string;
  handleFormSubmit: (mutationFunction: MutateFunction) => void;
};

const IssueUpdateButton = ({
  issueId,
  handleFormSubmit,
}: IssueUpdateButtonProps) => {
  const {
    mutate: executeUpdateIssueDetails,
    data,
    isLoading,
    isSuccess,
    isError,
  } = useMutation((issue: Issue) => updateIssueDetails({ issueId, issue }));

  useFeedbackHandler({
    isError,
    isSuccess,
    successMessage: "이슈를 수정했습니다.",
    errorMessage:
      "이슈를 수정하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오.",
  });

  return (
    <>
      {isLoading && <Spinner centerInViewport size={70} />}
      <Button
        disabled={!issueId || isLoading}
        onClick={() => handleFormSubmit(executeUpdateIssueDetails)}
        startIcon={<SaveAsIcon />}
      >
        수정
      </Button>
    </>
  );
};

export default IssueUpdateButton;
