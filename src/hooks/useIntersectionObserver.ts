import { useRef, useCallback, useEffect } from "react";

type UseIntersectionObserverParams = {
  containerElement: Element | null;  
  isError: boolean;
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

const useIntersectionObserver = ({
  containerElement,
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
          root: containerElement, 
          rootMargin: "-100px",
          threshold: 0,
        }
      );
      observer.current.observe(targetElementRef.current);
    }
  }, [containerElement, isError, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    observeElement();
    return () => observer.current?.disconnect();
  }, [observeElement]);

  return targetElementRef;
};

export default useIntersectionObserver;
