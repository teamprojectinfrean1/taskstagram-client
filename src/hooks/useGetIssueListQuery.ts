import { useInfiniteQuery } from "react-query";
import { getIssueList } from "@/apis/issueApi";

type useGetIssueListQueryProps = {
  projectId: string;
  issueStatus: string;
};

const useGetIssueListQuery = ({projectId, issueStatus}: useGetIssueListQueryProps) => {
  return useInfiniteQuery(
    ["issueList", projectId, issueStatus],
    ({ pageParam = 1 }) => getIssueList(projectId, issueStatus, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return 
      },
    }
  );
};

export default useGetIssueListQuery;
