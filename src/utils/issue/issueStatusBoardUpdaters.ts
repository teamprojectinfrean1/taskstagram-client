import { QueryClient } from "react-query";
import {
  addItemToCache,
  removeItemFromCache,
  updateItemInCache,
} from "@/utils/reactQueryCacheUpdaters";
import { ISSUE_PER_PAGE } from "@/constants";
import { SetterOrUpdater } from "recoil";
import { endIssueSearchMode } from "@/stores/issueStore";


type AddIssueToCacheParams = {
  issueStatus: IssueStatus;
  newOrUpdatedIssue: IssueSummary;
  projectId: string;
  queryClient: QueryClient;
  isIssueStatusBoardInSearchMode: boolean;
  setIssueStatusBoardSearchModes: SetterOrUpdater<StatusBoardSearchModes>;
  setIssueStatusBoardSearchParams: SetterOrUpdater<StatusBoardSearchParams>;
  isOptimisticUpdate?: boolean;
};

export const addIssueToCache = ({
  issueStatus,
  newOrUpdatedIssue,
  projectId,
  queryClient,
  isIssueStatusBoardInSearchMode,
  setIssueStatusBoardSearchModes,
  setIssueStatusBoardSearchParams,
  isOptimisticUpdate = false,
}: AddIssueToCacheParams) => {

  if (isIssueStatusBoardInSearchMode && !isOptimisticUpdate) {
    endIssueSearchMode(
      setIssueStatusBoardSearchModes,
      setIssueStatusBoardSearchParams,
      issueStatus
    );
    // setIssueStatusBoardSearchModes((prev) => ({
    //   ...prev,
    //   [issueStatus]: false,
    // }));
  } else {
    if (newOrUpdatedIssue) {
      addItemToCache<IssueSummary>({
        queryClient,
        queryKey: ["defaultIssueList", projectId, issueStatus],
        newItem: newOrUpdatedIssue,
        pageSize: ISSUE_PER_PAGE,
      });
    }
  }
};

type RemoveIssueFromCacheParams = {
  isIssueStatusBoardInSearchMode: boolean;
  issueStatus: string;
  issueIdToRemove: string;
  projectId: string;
  queryClient: QueryClient;
};

export const removeIssueFromCache = ({
  isIssueStatusBoardInSearchMode,
  issueStatus,
  issueIdToRemove,
  projectId,
  queryClient,
}: RemoveIssueFromCacheParams) => {
  removeItemFromCache<IssueSummary>({
    queryClient,
    queryKey: [
      isIssueStatusBoardInSearchMode
        ? "issueSearchResults"
        : "defaultIssueList",
      projectId,
      issueStatus,
    ],
    idOfElementToRemove: issueIdToRemove,
    idPropertyName: "issueId",
  });
};

type UpdateIssueFromCachedStatusBoardParams = {
  isIssueStatusBoardInSearchMode: boolean;
  issueStatus: IssueStatus;
  projectId: string;
  queryClient: QueryClient;
  updatedIssue: IssueSummary;
};

export const updateIssueInCacheUninvolvingStatusChange = ({
  isIssueStatusBoardInSearchMode,
  issueStatus,
  projectId,
  queryClient,
  updatedIssue,
}: UpdateIssueFromCachedStatusBoardParams) => {
  updateItemInCache<IssueSummary>({
    idPropertyName: "issueId",
    moveToFront: true,
    queryClient,
    queryKey: [
      isIssueStatusBoardInSearchMode
        ? "issueSearchResults"
        : "defaultIssueList",
      projectId,
      issueStatus,
    ],
    updatedItem: updatedIssue,
  });
};

type UpdateIssueInvolvingStatusChangeParams = {
  newOrUpdatedIssue: IssueSummary;
  oldStatus: IssueStatus;
  newStatus: IssueStatus;
  projectId: string;
  queryClient: QueryClient;
  issueStatusBoardSearchModes: Record<IssueStatus, boolean>;
  setIssueStatusBoardSearchModes: SetterOrUpdater<StatusBoardSearchModes>;
  setIssueStatusBoardSearchParams: SetterOrUpdater<StatusBoardSearchParams>;
  isOptimisticUpdate?: boolean;
};

export const updateIssueInCacheInvolvingStatusChange = ({
  newOrUpdatedIssue,
  oldStatus,
  newStatus,
  projectId,
  queryClient,
  issueStatusBoardSearchModes,
  setIssueStatusBoardSearchModes,
  setIssueStatusBoardSearchParams,
  isOptimisticUpdate = false,
}: UpdateIssueInvolvingStatusChangeParams) => {
  removeIssueFromCache({
    issueStatus: oldStatus,
    issueIdToRemove: newOrUpdatedIssue.issueId,
    projectId,
    queryClient,
    isIssueStatusBoardInSearchMode: issueStatusBoardSearchModes[oldStatus],
  });

  addIssueToCache({
    issueStatus: newStatus,
    newOrUpdatedIssue: newOrUpdatedIssue,
    projectId,
    queryClient,
    isIssueStatusBoardInSearchMode: issueStatusBoardSearchModes[newStatus],
    setIssueStatusBoardSearchModes,
    setIssueStatusBoardSearchParams,
    isOptimisticUpdate,
  });
};
