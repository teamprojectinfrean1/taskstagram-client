import { IssueTicket, SkeletonIssueTicket } from "@/components/IssueManagement";
import { getIssueList } from "@/apis/issueApi";
import InfiniteScroller from "@/components/InfiniteScroller";

const ISSUE_PER_PAGE = 15;

type DefaultIssueListProps = {
  projectId: string;
  containerId: IssueStatus;
  containerRef: React.RefObject<HTMLDivElement>;
};

export const DefaultIssueList = ({
  projectId,
  containerId,
  containerRef,
}: DefaultIssueListProps) => {
  return (
    <InfiniteScroller<IssueSummary>
      queryFunction={getIssueList}
      queryKey={["defaultIssueList", projectId, containerId!]}
      requestOptions={{
        issueStatus: containerId,
        projectId,
        size: ISSUE_PER_PAGE,
      }}
      containerRef={containerRef}
      firstPageErrorMessage="이슈 목록을 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오."
      subsequentPageErrorMessage="이슈 목록을 추가로 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오."
      noDataToShowMessage="현재 표시할 이슈가 없습니다."
      renderItem={(issue, index) => (
        <IssueTicket
          key={issue.issueId}
          index={index}
          issue={issue}
          parent={containerId!}
        />
      )}
      renderSkeleton={(index) => <SkeletonIssueTicket key={index} />}
    />
  );
};
