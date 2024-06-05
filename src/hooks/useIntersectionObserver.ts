import { useRef, useCallback, useEffect } from "react";

type UseIntersectionObserverParams = {
  isError: boolean;
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

const useIntersectionObserver = ({
  isError,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseIntersectionObserverParams) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const targetElementRef = useRef<HTMLDivElement | null>(null);

  const observeElement = useCallback(() => {
    if (
      !isError &&
      targetElementRef.current &&
      !isLoading &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        {
          rootMargin: "100px",
          threshold: 0,
        }
      );
      observer.current.observe(targetElementRef.current);
    }
  }, [isError, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    observeElement();
    return () => observer.current?.disconnect();
  }, [observeElement]);

  return targetElementRef;
};

export default useIntersectionObserver;
