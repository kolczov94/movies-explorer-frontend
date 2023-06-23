import { useCallback, useEffect, useState } from "react"
import { COUNTER_CARD } from "../utils/counterCardSettings";

export default function useCounterCard(defaultCount) {
  const [count, setCount] = useState(defaultCount);
  const [stepSize, setStepSize] = useState(0);

  const step = () => {
    setCount(count + stepSize);
  }

  const handleResize = useCallback(() => {
    if (window.innerWidth >= COUNTER_CARD['4'].minWidth) {
      setCount(COUNTER_CARD['4'].defaultCount);
      setStepSize(COUNTER_CARD['4'].step);
    }
    if (window.innerWidth >= COUNTER_CARD['3'].minWidth && window.innerWidth < COUNTER_CARD['3'].maxWidth) {
      setCount(COUNTER_CARD['3'].defaultCount);
      setStepSize(COUNTER_CARD['3'].step);
    }
    if (window.innerWidth >= COUNTER_CARD['2'].minWidth && window.innerWidth < COUNTER_CARD['2'].maxWidth) {
      setCount(COUNTER_CARD['2'].defaultCount);
      setStepSize(COUNTER_CARD['2'].step);
    }
    if (window.innerWidth >= COUNTER_CARD['1'].minWidth && window.innerWidth < COUNTER_CARD['1'].maxWidth) {
      setCount(COUNTER_CARD['1'].defaultCount);
      setStepSize(COUNTER_CARD['1'].step);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize])

  return { count, step }
};
