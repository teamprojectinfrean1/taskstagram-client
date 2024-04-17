import { useInfiniteQuery } from "react-query";
import { getUserStoryList } from "@/apis/userApi";

type useGetUserStoryListQueryProps = {
  projectId: string;
};

const useGetUserStoryListQuery = ({
  projectId,
}: useGetUserStoryListQueryProps) => {
  return useInfiniteQuery(
    ["userStoryList", projectId],
    ({ pageParam = 1 }) => getUserStoryList({ projectId, page: pageParam }),
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

export default useGetUserStoryListQuery;
