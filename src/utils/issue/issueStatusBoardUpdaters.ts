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
  isIssueStatusBoardInSearchMode: boolean;
  issueStatus: IssueStatus;
  newOrUpdatedIssue: IssueSummary;
  queryClient: QueryClient;
  queryKey: string[];
  setIssueStatusBoardSearch: SetterOrUpdater<IssueStatusBoardSearchState>;
  isOptimisticUpdate?: boolean;
};

export const addIssueToCache = ({
  isIssueStatusBoardInSearchMode,
  issueStatus,
  newOrUpdatedIssue,
  queryClient,
  queryKey,
  setIssueStatusBoardSearch,
  isOptimisticUpdate = false,
}: AddIssueToCacheParams) => {
  if (isIssueStatusBoardInSearchMode && !isOptimisticUpdate) {
    endIssueSearchMode(setIssueStatusBoardSearch, issueStatus);
  } else {
    if (newOrUpdatedIssue) {
      addItemToCache<IssueSummary>({
        queryClient,
        queryKey,
        newItem: newOrUpdatedIssue,
        pageSize: ISSUE_PER_PAGE,
      });
    }
  }
};

type RemoveIssueFromCacheParams = {
  issueIdToRemove: string;
  queryClient: QueryClient;
  queryKey: string[];
};

export const removeIssueFromCache = ({
  issueIdToRemove,
  queryClient,
  queryKey,
}: RemoveIssueFromCacheParams) => {
  removeItemFromCache<IssueSummary>({
    idOfElementToRemove: issueIdToRemove,
    idPropertyName: "issueId",
    queryClient,
    queryKey,
  });
};

type UpdateIssueFromCachedStatusBoardParams = {
  queryClient: QueryClient;
  queryKey: string[];
  updatedIssue: IssueSummary;
};

export const updateIssueInCacheUninvolvingStatusChange = ({
  queryClient,
  queryKey,
  updatedIssue,
}: UpdateIssueFromCachedStatusBoardParams) => {
  updateItemInCache<IssueSummary>({
    idPropertyName: "issueId",
    moveToFront: true,
    queryClient,
    queryKey,
    updatedItem: updatedIssue,
  });
};

type UpdateIssueInvolvingStatusChangeParams = {
  newOrUpdatedIssue: IssueSummary;
  newStatus: IssueStatus;
  queryClient: QueryClient;
  oldStatusBoardQueryKey: string[];
  newStatusBoardQueryKey: string[];
  isNewStatusBoardInSearchMode: boolean;
  setIssueStatusBoardSearch: SetterOrUpdater<IssueStatusBoardSearchState>;
  isOptimisticUpdate?: boolean;
};

export const updateIssueInCacheInvolvingStatusChange = ({
  newOrUpdatedIssue,
  newStatus,
  queryClient,
  oldStatusBoardQueryKey,
  newStatusBoardQueryKey,
  isNewStatusBoardInSearchMode,
  setIssueStatusBoardSearch,
  isOptimisticUpdate = false,
}: UpdateIssueInvolvingStatusChangeParams) => {
  removeIssueFromCache({
    issueIdToRemove: newOrUpdatedIssue.issueId,
    queryKey: oldStatusBoardQueryKey,
    queryClient,
  });

  addIssueToCache({
    issueStatus: newStatus,
    newOrUpdatedIssue: newOrUpdatedIssue,
    queryClient,
    queryKey: newStatusBoardQueryKey,
    isIssueStatusBoardInSearchMode:
    isNewStatusBoardInSearchMode,
    setIssueStatusBoardSearch,
    isOptimisticUpdate,
  });
};
