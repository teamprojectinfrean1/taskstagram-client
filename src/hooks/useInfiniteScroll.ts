import { useCallback, useEffect, useRef } from "react";

type UseScrollBasedDataLoaderProps = {
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

const useInfiniteScroll = ({
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseScrollBasedDataLoaderProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const targetElementRef = useRef<HTMLDivElement | null>(null);

  const observeElement = useCallback(() => {
    if (
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
        { threshold: 1.0 }
      );
      observer.current.observe(targetElementRef.current);
    }
  }, [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    observeElement();
    return () => observer.current?.disconnect(); 
  }, [observeElement]);

  return targetElementRef;
};

export default useInfiniteScroll;
