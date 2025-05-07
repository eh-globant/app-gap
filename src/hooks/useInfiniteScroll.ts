import { useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = (
  onIntersect: () => void,
  hasMore: boolean,
  isLoading: boolean
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoading) {
        onIntersect();
      }
    },
    [hasMore, isLoading, onIntersect]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observerRef.current.observe(currentTarget);
    }

    return () => {
      if (observerRef.current && currentTarget) {
        observerRef.current.unobserve(currentTarget);
      }
    };
  }, [handleIntersection]);

  return targetRef;
};

export default useInfiniteScroll;
