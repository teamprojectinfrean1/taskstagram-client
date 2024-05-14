import { IssueTicket, SkeletonIssueTicket } from "@/components/IssueManagement";
import { searchIssue } from "@/apis/issueApi";
import InfiniteScroller from "@/components/InfiniteScroller";
import { ISSUE_PER_PAGE } from "@/constants";

type IssueSearchResultsProps = {
  projectId: string;
  containerId: IssueStatus;
  containerRef: React.RefObject<HTMLDivElement>;
  searchParams: IssueSearchParams;
};

export const IssueSearchResults = ({
  projectId,
  containerId,
  containerRef,
  searchParams,
}: IssueSearchResultsProps) => {
  return (
    <InfiniteScroller<IssueSummary>
      queryFunction={searchIssue}
      queryKey={["issueSearchResults", projectId, containerId!]}
      requestOptions={{
        filter: searchParams.filter,
        issueStatus: containerId,
        projectId,
        size: ISSUE_PER_PAGE,
        word: searchParams.keyword,
      }}
      containerRef={containerRef}
      firstPageErrorMessage="검색 결과를 불러오는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오."
      subsequentPageErrorMessage="검색 결과를 추가로 불러오는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오."
      noDataToShowMessage="해당 검색 조건에 맞는 결과가 없습니다."
      renderItem={(issue) => (
        <IssueTicket
          key={issue.issueId}
          issue={issue}
          parent={containerId!}
        />
      )}
      renderSkeleton={(index) => <SkeletonIssueTicket key={index} />}
    />
  );
};
