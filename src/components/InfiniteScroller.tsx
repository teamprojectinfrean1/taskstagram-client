import { Fragment, useEffect } from "react";
import { Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/stores/snackbarStore";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

type InfiniteScrollerProps<T> = {
  enabled?: boolean;
  queryFunction: (params: any) => Promise<PaginatedResponse<T>>;
  queryKey: string | string[];
  requestOptions: any;
  containerRef: React.RefObject<HTMLDivElement>;
  firstPageErrorMessage: string | ((error: string) => string);
  subsequentPageErrorMessage: string;
  noDataToShowMessage: string;
  renderItem: (item: T) => React.ReactNode;
  renderSkeleton: (index: number) => React.ReactNode;
  numberOfSkeletons?: number;
  handleFirstPageResponse?: (status: string, message?: string) => void;
  triggerRefetch?: boolean;
  successAction?: () => void;
};

const InfiniteScroller = <T,>({
  enabled = true,
  queryFunction,
  queryKey,
  requestOptions,
  firstPageErrorMessage,
  subsequentPageErrorMessage,
  noDataToShowMessage,
  renderItem,
  renderSkeleton,
  numberOfSkeletons = 5,
  handleFirstPageResponse,
  triggerRefetch,
  successAction,
}: InfiniteScrollerProps<T>) => {
  const setSnackbar = useSetRecoilState(snackbarState);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    isError,
    isSuccess,
    hasNextPage,
    refetch,
    fetchNextPage,
    dataUpdatedAt,
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) =>
      queryFunction({ ...requestOptions, page: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.totalPage > allPages.length) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
      refetchOnMount: "always",
      enabled,
    }
  );

  useEffect(() => {
    if (triggerRefetch) {
      refetch();
    }
  }, [triggerRefetch, refetch]);

  const lastItemRef = useIntersectionObserver({
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  const lastSuccessfullyFetchedPage = data?.pages.length || 0;

  useEffect(() => {
    if (handleFirstPageResponse && isError && !data) {
      const currentError = error as { message: string };
      handleFirstPageResponse("error", currentError.message);
    }
    if (isError && lastSuccessfullyFetchedPage > 0) {
      setSnackbar({
        show: true,
        message: subsequentPageErrorMessage,
        severity: "error",
      });
    }
  }, [isError, lastSuccessfullyFetchedPage, setSnackbar]);

  useEffect(() => {
    if (isSuccess) {
      if (successAction) successAction();

      if (handleFirstPageResponse && lastSuccessfullyFetchedPage === 1) {
        handleFirstPageResponse("success");
      }
    }
  }, [
    dataUpdatedAt,
    isSuccess,
    lastSuccessfullyFetchedPage,
    successAction,
    handleFirstPageResponse,
  ]);

  const resolveErrorMessage = () => {
    const currentError = error as { message: string };

    if (typeof firstPageErrorMessage === "function") {
      return firstPageErrorMessage(currentError.message);
    } else {
      return firstPageErrorMessage;
    }
  };

  return (
    <>
      {data?.pages.map((page, pageIndex) => {
        return (
          <Fragment key={pageIndex}>
            {page?.dataList.map((item) => renderItem(item))}
          </Fragment>
        );
      })}
      {(isLoading || isFetchingNextPage) &&
        Array.from({ length: numberOfSkeletons }, (_, index) =>
          renderSkeleton(index)
        )}
      {!isError && hasNextPage && (
        <div
          ref={hasNextPage ? lastItemRef : undefined}
          style={{ display: "none" }}
        />
      )}
      {isError && (
        <Typography variant="caption" sx={{ p: 2 }}>
          {resolveErrorMessage()}
        </Typography>
      )}
      {!isError && data?.pages[0].dataList.length === 0 && (
        <Typography variant="caption" sx={{ p: 2 }}>
          {noDataToShowMessage}
        </Typography>
      )}
    </>
  );
};

export default InfiniteScroller;
