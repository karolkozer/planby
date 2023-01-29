import React from "react";

// Import helpers
import { useIsomorphicLayoutEffect } from "../helpers";

export function useInterval(callback: () => void, delay: number | null) {
  const useIsomorphicEffect = useIsomorphicLayoutEffect();
  const savedCallback = React.useRef(callback);

  useIsomorphicEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}
