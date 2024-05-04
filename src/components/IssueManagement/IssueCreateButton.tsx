import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import AddIcon from "@mui/icons-material/Add";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
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
  } = useMutation((newIssue: Issue) => createIssue({ issue: newIssue }));

  const addNewIssueToList = (newIssue: Issue) => {
    const queryKey = ["defaultIssueList", projectId, newIssue?.statusId];

    // console.log("New issue:", newIssue);
    // console.log("Query key:", queryKey);

    queryClient.setQueryData<InfiniteData<PaginatedResponse<Issue>> | undefined>(
      queryKey,
      (oldData) => {
        if (newIssue && oldData) {
          let newPages = [];
          let carryOverIssue: Issue | undefined = newIssue;

          for (const page of oldData.pages) {
            const currentPageIssues = [carryOverIssue, ...page.dataList].filter(Boolean) as Issue[];
            carryOverIssue = currentPageIssues.pop(); 

            newPages.push({ ...page, dataList: currentPageIssues });

            if (!carryOverIssue) break; 
          }

          if (carryOverIssue) {
            newPages.push({
              dataList: [carryOverIssue],
              totalPage: oldData.pages[oldData.pages.length - 1].totalPage + 1,
            });
          }

          return {
            ...oldData,
            pages: newPages,
            pageParams: oldData.pageParams,
          } as InfiniteData<PaginatedResponse<Issue>>;
        } else {
          return oldData;
        }
      }
    );
  };

  useFeedbackHandler({
    isError,
    errorMessage:
      "이슈를 추가하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "이슈가 추가되었습니다.",
    successAction: () => {if(data) addNewIssueToList(data)},
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
        startIcon={<AddIcon />}
      >
        추가
      </PrimaryButton>
    </>
  );
};

export default IssueCreateButton;
