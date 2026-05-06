import { useEffect, useState } from "react";
import { formatDuration } from "../utils/timerUtils";

export function useSessionTimer(startedAt) {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    if (!startedAt) return;

    const updateElapsed = () => {
      setElapsedMs(Date.now() - startedAt);
    };

    updateElapsed();

    const intervalId = setInterval(updateElapsed, 1000);

    return () => clearInterval(intervalId);
  }, [startedAt]);

  return {
    elapsedMs,
    formattedTime: formatDuration(elapsedMs),
  };
}
