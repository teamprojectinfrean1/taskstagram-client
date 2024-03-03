import { useState, useEffect, RefObject } from 'react';
import debounce from 'lodash.debounce';

const useOverflowDetection = (ref: RefObject<HTMLElement>, overflowDirection: 'horizontal' | 'vertical') => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const current = ref.current;
      if (current) {
        let overflowCheck = false;

        if (overflowDirection === 'horizontal') {
          overflowCheck = current.scrollWidth > current.clientWidth;
        } else if (overflowDirection === 'vertical') {
          overflowCheck = current.scrollHeight > current.clientHeight;
        }

        setIsOverflowing(overflowCheck);
      }
    };

    const debouncedCheckOverflow = debounce(checkOverflow, 500);
    checkOverflow();

    window.addEventListener('resize', debouncedCheckOverflow);

    return () => {
      window.removeEventListener('resize', debouncedCheckOverflow);
      debouncedCheckOverflow.cancel();
    };
  }, [ref, overflowDirection]); 

  return isOverflowing;
};

export default useOverflowDetection;
