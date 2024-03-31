import { useInfiniteQuery } from "react-query";
import { getIssueList } from "@/apis/issueApi";

type useGetIssueListQueryProps = {
  projectId: string;
  issueStatus: string;
};

const useGetIssueListQuery = ({
  projectId,
  issueStatus,
}: useGetIssueListQueryProps) => {
  return useInfiniteQuery(
    ["issueList", projectId, issueStatus],
    ({ pageParam = 1 }) => getIssueList({projectId, issueStatus, page: pageParam}),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasMore) {
          return allPages.length + 1; 
        } else {
          return undefined; 
        }
      },
    }
  );
};

export default useGetIssueListQuery;
