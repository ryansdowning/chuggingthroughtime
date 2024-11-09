import { useEffect, useReducer } from "react";

import dynamic from "next/dynamic";

import { Stack } from "@mantine/core";

import { getSecondsSinceMidnight } from "../components/helpers";
import { timeReducer } from "../components/time-reducer";
import TimeScrubber from "../components/TimeScrubber";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const INTERVAL_MS = 1000;

export default function IndexPage() {
  const [timeState, dispatchTime] = useReducer(timeReducer, {
    secondsSinceMidnight: getSecondsSinceMidnight(),
    paused: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!timeState.paused) {
        dispatchTime({
          type: "increment-time",
          payload: { seconds: INTERVAL_MS / 1000 },
        });
      }
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [timeState.paused]);

  return (
    <Stack gap="md" w="100%">
      <TimeScrubber timeState={timeState} dispatchTime={dispatchTime} />
      <Map timeState={timeState} dispatchTime={dispatchTime} />
    </Stack>
  );
}
