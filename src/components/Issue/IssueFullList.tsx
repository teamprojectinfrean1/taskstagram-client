import { IssueTicket, SkeletonIssueTicket } from "@/components/Issue";
import { getIssueList } from "@/apis/issueApi";
import InfiniteScroller from "@/components/InfiniteScroller";
import { ISSUE_PER_PAGE } from "@/constants";
import { useSetRecoilState } from "recoil";
import { issueFeatureAvailabilityState } from "@/stores/issueStore";

type IssueFullListProps = {
  projectId: string;
  statusId: IssueStatus;
  containerRef: React.RefObject<HTMLDivElement>;
};

const IssueFullList = ({
  projectId,
  statusId,
  containerRef,
}: IssueFullListProps) => {
  const setIssueFeatureAvailability = useSetRecoilState(
    issueFeatureAvailabilityState
  );

  return (
    <InfiniteScroller<IssueSummary>
      queryFunction={getIssueList}
      queryKey={["defaultIssueList", projectId, statusId!]}
      requestOptions={{
        issueStatus: statusId,
        projectId,
        size: ISSUE_PER_PAGE,
      }}
      containerRef={containerRef}
      firstPageErrorMessage={(error: string) => {
        if (error === "태스크를 먼저 생성해야 함") {
          return "현재 프로젝트에 태스크가 없어 불러올 이슈가 없습니다. 원활한 작업 진행을 위해 태스크를 먼저 생성해 주세요.";
        } else {
          return "이슈 목록을 불러오는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.";
        }
      }}
      subsequentPageErrorMessage="이슈 목록을 추가로 불러오는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오."
      noDataToShowMessage="현재 표시할 이슈가 없습니다."
      renderItem={(issue) => (
        <IssueTicket key={issue.issueId} issue={issue} parent={statusId!} />
      )}
      renderSkeleton={(index) => <SkeletonIssueTicket key={index} />}
      handleFirstPageResponse={(status, message) => {
        if (status === "error" && message === "태스크를 먼저 생성해야 함") {
          setIssueFeatureAvailability(false);
        } else {
          setIssueFeatureAvailability(true);
        }
      }}
    />
  );
};

export default IssueFullList;
