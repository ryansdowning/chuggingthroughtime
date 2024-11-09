import React from "react";

import { Button, Group, Slider, Text } from "@mantine/core";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";

import { TimeReducerProps } from "./time-reducer";

export default function TimeScrubber({
  timeState,
  dispatchTime,
}: TimeReducerProps) {
  const { secondsSinceMidnight } = timeState;
  const setTime = (secondsSinceMidnight: number) => {
    dispatchTime({ type: "set-time", payload: { secondsSinceMidnight } });
  };
  // Helper function to format seconds into HH:MM:SS format
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", width: "100%", padding: "1em 2em" }}>
      {/* Display the current time in HH:MM:SS format */}
      <Group w="100%" justify="center">
        <Text style={{ fontWeight: 500, fontSize: "1.2rem" }}>
          {formatTime(secondsSinceMidnight)}
        </Text>
        <Button
          onClick={() => dispatchTime({ type: "toggle-pause" })}
          variant="outline"
          size="xs"
        >
          {timeState.paused ? (
            <IconPlayerPlay size={16} />
          ) : (
            <IconPlayerPause size={16} />
          )}
        </Button>
      </Group>
      <Slider
        min={0}
        max={86399}
        value={secondsSinceMidnight}
        onChange={setTime}
        marks={[
          { value: 0, label: "00:00:00" },
          { value: 21600, label: "06:00:00" },
          { value: 43200, label: "12:00:00" },
          { value: 64800, label: "18:00:00" },
          { value: 86399, label: "23:59:59" },
        ]}
        step={1}
      />
    </div>
  );
}
