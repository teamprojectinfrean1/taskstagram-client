import { useQuery } from "react-query";
import { getAllProjectMemberList } from "@/apis/memberApi";
import { getAllTaskList } from "@/apis/TaskApi";

type UseGetMemberAndTaskOptionsParams = { projectId: string };

const useGetMemberAndTaskOptions = ({
  projectId,
}: UseGetMemberAndTaskOptionsParams) => {
  const {
    data: allProjectMemberList,
    isLoading: isLoadingAllProjectMembers,
    isError: isErrorLoadingAllProjectMembers,
    refetch: fetchAllProjectMemberList
  } = useQuery(["allProjectMemberList", projectId], () =>
    getAllProjectMemberList({ projectId }), { enabled: false }
  );

  const { 
    data: allTaskList, 
    isLoading: isLoadingAllTaskList, 
    isError: isErrorLoadingAllTaskList,
    refetch: fetchAllTaskList 
  } = useQuery(["allTaskList", projectId], () => getAllTaskList({ projectId }), {
    enabled: false 
  });

  return {
    allProjectMemberList,
    isLoadingAllProjectMembers,
    isErrorLoadingAllProjectMembers,
    fetchAllProjectMemberList,
    allTaskList,
    isLoadingAllTaskList,
    isErrorLoadingAllTaskList,
    fetchAllTaskList
  };
};

export default useGetMemberAndTaskOptions;
