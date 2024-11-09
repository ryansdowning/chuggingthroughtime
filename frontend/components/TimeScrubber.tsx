import React from "react";

import { useDebouncedCallback } from "use-debounce";

import { Button, Group, Select, Slider, Text } from "@mantine/core";
import {
  IconEye,
  IconEyeOff,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";

import { TimeReducerProps } from "./time-reducer";

export default function TimeScrubber({
  timeState,
  dispatchTime,
}: TimeReducerProps) {
  const { secondsSinceMidnight } = timeState;
  const unpause = () =>
    dispatchTime({ type: "set-pause", payload: { paused: false } });
  const debouncedUnpause = useDebouncedCallback(unpause, 1000);
  const setTime = (secondsSinceMidnight: number) => {
    if (!timeState.paused) {
      dispatchTime({ type: "set-pause", payload: { paused: true } });
      debouncedUnpause();
    }
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
    <div style={{ textAlign: "center", width: "95%", padding: "1em 2em" }}>
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
        <Select
          value={timeState.incrementMultiplier.toString()}
          onChange={(value) =>
            value &&
            dispatchTime({
              type: "set-increment-multiplier",
              payload: { incrementMultiplier: parseInt(value) },
            })
          }
          data={[
            { value: "1", label: "1x" },
            { value: "2", label: "2x" },
            { value: "4", label: "4x" },
            { value: "8", label: "8x" },
            { value: "16", label: "16x" },
            { value: "30", label: "30x" },
            { value: "60", label: "60x" },
            { value: "900", label: "900x" },
          ]}
          size="xs"
          style={{ width: "70px" }}
          styles={{
            dropdown: { zIndex: 1000 },
          }}
        />
        <Button
          onClick={() => dispatchTime({ type: "toggle-popups" })}
          variant="outline"
          size="xs"
        >
          {timeState.showPopups ? (
            <IconEye size={16} />
          ) : (
            <IconEyeOff size={16} />
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
        label={(value) => formatTime(value)}
      />
    </div>
  );
}
