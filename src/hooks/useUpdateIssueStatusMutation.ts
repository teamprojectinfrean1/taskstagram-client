import { useMutation, useQueryClient, UseMutationOptions } from "react-query";
import { updateIssueStatus } from "@/apis/issueApi";
import { IssueSummary, UpdateIssuePayload } from "@/models/Issue";
import { useRecoilState } from "recoil";
import { snackbarState } from "@/stores/snackbarStore";

type MutationContext = {
  previousData: {
    toDo: IssueSummary[][];
    inProgress: IssueSummary[][];
    done: IssueSummary[][];
  };
};

type MutationOptions = UseMutationOptions<
  void,
  Error,
  UpdateIssuePayload,
  MutationContext
>;

export const useUpdateIssueStatusMutation = (projectId: string) => {
  const [_, setSnackbar] = useRecoilState(snackbarState);

  const queryClient = useQueryClient();

  const mutation = useMutation<
    void,
    Error,
    UpdateIssuePayload,
    MutationContext
  >(updateIssueStatus, {
    onMutate: async (payload) => {
      const { issue, oldStatus, newStatus } = payload;

      const previousData = {
        toDo: queryClient.getQueryData(["issueList", projectId, "toDo"]),
        inProgress: queryClient.getQueryData([
          "issueList",
          projectId,
          "inProgress",
        ]),
        done: queryClient.getQueryData(["issueList", projectId, "done"]),
      };

      const removeIssueFromList = (
        issueList: { pages: IssueSummary[][] },
        issueId: string
      ) => {
        const updatedPages = issueList.pages.map((page) =>
          page.filter((issue) => issue.issueId !== issueId)
        );
        return { pages: updatedPages };
      };

      const addIssueToList = (
        issueList: { pages: IssueSummary[][] } | undefined,
        updatedIssue: IssueSummary
      ) => {
        if (issueList?.pages) {
          return {
            pages: [
              [updatedIssue, ...issueList.pages[0]],
              ...issueList.pages.slice(1),
            ],
          };
        } else {
          return { pages: [[updatedIssue]] };
        }
      };

      queryClient.setQueryData(
        ["issueList", projectId, oldStatus],
        (old: { pages: IssueSummary[][] } | undefined) => {
          return old ? removeIssueFromList(old, issue.issueId) : { pages: [] };
        }
      );

      const updatedIssue = { ...issue, issueStatus: newStatus };

      queryClient.setQueryData<{ pages: IssueSummary[][] } | undefined>(
        ["issueList", projectId, newStatus],
        (old) => {
          return addIssueToList(old, updatedIssue);
        }
      );

      return { previousData };
    },
    onError: (
      err: Error,
      _: UpdateIssuePayload,
      context: MutationContext | undefined
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["issueList", projectId, "toDo"],
          context.previousData.toDo
        );
        queryClient.setQueryData(
          ["issueList", projectId, "inProgress"],
          context.previousData.inProgress
        );
        queryClient.setQueryData(
          ["issueList", projectId, "done"],
          context.previousData.done
        );
      }

      setSnackbar({
        show: true,
        message:
          "이슈를 옮기는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        severity: "error",
      });
    },
  } as MutationOptions);

  return mutation;
};
