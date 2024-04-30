import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQueryClient } from "react-query";
import { createIssue } from "@/apis/issueApi";
import Spinner from "@/components/Spinner";
import PrimaryButton from "@/components/PrimaryButton";

type MutateFunction = (issue: Issue) => void;

type IssueCreateButtonProps = {
  handleFormSubmit: (mutationFunction: MutateFunction) => void;
  projectId: string;
};

const IssueCreateButton = ({
  handleFormSubmit,
  projectId,
}: IssueCreateButtonProps) => {
  const queryClient = useQueryClient();

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
      "이슈를 추가하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "이슈가 추가되었습니다.",
    // successAction: () => {
    //   const queryKey = ["defaultIssueList", projectId, issueStatus];
    //   queryClient.setQueryData<Issue[]>(queryKey, (prevIssues = []) => {
    //     // Ensure prevIssues is initialized as an empty array if undefined
    //     return [...prevIssues, data];
    //   });
    // },
  });

  return (
    <>
      {isLoading && <Spinner centerInViewport size={70} />}
      <PrimaryButton
        disabled={isLoading}
        onClick={(e) => {
          e.stopPropagation();
          handleFormSubmit(executeCreateIssue);
        }}
        startIcon={<AddIcon />}
      >
        추가
      </PrimaryButton>
    </>
  );
};

export default IssueCreateButton;
