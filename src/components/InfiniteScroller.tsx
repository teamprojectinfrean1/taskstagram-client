import { Fragment, useEffect } from "react";
import { Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/stores/snackbarStore";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

type InfiniteScrollerProps<T> = {
  queryFunction: (params: any) => Promise<PaginatedResponse<T>>;
  queryKey: string | string[];
  requestOptions: any;
  containerRef: React.RefObject<HTMLDivElement>;
  firstPageErrorMessage: string;
  subsequentPageErrorMessage: string;
  noDataToShowMessage: string;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderSkeleton: (index: number) => React.ReactNode;
  numberOfSkeletons?: number;
};

const InfiniteScroller = <T,>({
  queryFunction,
  queryKey,
  requestOptions,
  containerRef,
  firstPageErrorMessage,
  subsequentPageErrorMessage,
  noDataToShowMessage,
  renderItem,
  renderSkeleton,
  numberOfSkeletons = 3,
}: InfiniteScrollerProps<T>) => {
  const setSnackbar = useSetRecoilState(snackbarState);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage,
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
    }
  );

  const lastItemRef = useIntersectionObserver({
    containerElement: containerRef.current,
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  const lastSuccessfullyFetchedPage = data?.pages.length || 0;

  useEffect(() => {
    if (isError && lastSuccessfullyFetchedPage > 0) {
      setSnackbar({
        show: true,
        message: subsequentPageErrorMessage,
        severity: "error",
      });
    }
  }, [isError, lastSuccessfullyFetchedPage, setSnackbar]);

  return (
    <>
      {data?.pages.map((page, pageIndex) => (
        <Fragment key={pageIndex}>
          {page.dataList.map((item, itemIndex) => renderItem(item, itemIndex))}
        </Fragment>
      ))}
      {(isLoading || isFetchingNextPage) &&
        Array.from({ length: numberOfSkeletons }, (_, index) => renderSkeleton(index))}
      {!isError && hasNextPage && (
        <div
          ref={hasNextPage ? lastItemRef : undefined}
          style={{ display: "none" }}
        />
      )}
      {isError && (
        <Typography variant="caption" sx={{ p: 2 }}>
          {firstPageErrorMessage}
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
