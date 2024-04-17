import { useState, useEffect, RefObject } from "react";
import debounce from "lodash.debounce";

const useOverflowDetection = (
  ref: RefObject<HTMLElement>,
  overflowDirection: "horizontal" | "vertical"
) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = () => {
    const current = ref.current;
    if (current) {
      const overflowCheck =
        overflowDirection === "horizontal"
          ? current.scrollWidth > current.clientWidth
          : current.scrollHeight > current.clientHeight;

      setIsOverflowing(overflowCheck);
    }
  };

  useEffect(() => {
    const current = ref.current;
    if (!current) return;

    const debouncedCheckOverflow = debounce(checkOverflow, 500);

    const mutationObserver = new MutationObserver(debouncedCheckOverflow);
    mutationObserver.observe(current, { childList: true, subtree: true });

    const resizeObserver = new ResizeObserver(debouncedCheckOverflow);
    resizeObserver.observe(current);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [ref, overflowDirection]);

  return isOverflowing;
};

export default useOverflowDetection;
