import React from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef(callback);

  React.useLayoutEffect(() => {
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
