import { useEffect } from "react";
import { useQuery } from "react-query";
import { getIssueDetails } from "@/apis/issueApi";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import { issueIdToShowInModalState } from "@/stores/issueStore";
import { useSetRecoilState } from "recoil";

type UseGetIssueDetailsParams = {
  currentIssueId: string;
  isNewIssue: boolean;
  setFormData: (value: Issue | ((prevIssue: Issue) => Issue)) => void;
};

const useGetIssueDetails = ({
  currentIssueId,
  isNewIssue,
  setFormData,
}: UseGetIssueDetailsParams) => {
  const setIssueIdToShowInModal = useSetRecoilState(issueIdToShowInModalState);

  const {
    data: issueDetails,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(
    ["issueDetails", currentIssueId], 
    () => getIssueDetails({ issueId: currentIssueId }),
    {
      enabled: !isNewIssue,
    }
  );

  useEffect(() => {
    if (isSuccess && issueDetails) {
      setFormData((prev) => ({
        ...prev,
        taskId: issueDetails.taskId,
        taskTitle: issueDetails.taskTitle,
        assigneeId: issueDetails.assigneeId,
        assigneeNickname: issueDetails.assigneeNickname,
        assigneeProfileImage: issueDetails.assigneeProfileImage,
        issueTitle: issueDetails.issueTitle,
        issueContent: issueDetails.issueContent,
        statusId: issueDetails.statusId,
        statusTitle: issueDetails.statusTitle,
        startDate: issueDetails.startDate,
        endDate: issueDetails.endDate,
      }));
    }
  }, [isSuccess, issueDetails, setFormData]);

  useFeedbackHandler({
    isError,
    errorAction: () => setIssueIdToShowInModal(null),
    errorMessage:
      "이슈를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오.",
  });

  return { issueDetails, isLoading };
};

export default useGetIssueDetails;
