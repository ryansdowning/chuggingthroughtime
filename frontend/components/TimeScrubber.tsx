import React, { useState } from "react";

import { Slider, Text } from "@mantine/core";

export default function TimeScrubber() {
  // Define the state to store the selected time in seconds (from 0 to 86399)
  const [timeInSeconds, setTimeInSeconds] = useState(0);

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
    <div style={{ textAlign: "center", padding: "1em 2em" }}>
      {/* Display the current time in HH:MM:SS format */}
      <Text style={{ fontWeight: 500, fontSize: "1.2rem" }}>
        {formatTime(timeInSeconds)}
      </Text>
      <Slider
        min={0}
        max={86399} // 23 hours, 59 minutes, and 59 seconds in total seconds
        value={timeInSeconds}
        onChange={setTimeInSeconds}
        marks={[
          { value: 0, label: "00:00:00" },
          { value: 21600, label: "06:00:00" }, // 6 AM
          { value: 43200, label: "12:00:00" }, // 12 PM
          { value: 64800, label: "18:00:00" }, // 6 PM
          { value: 86399, label: "23:59:59" }, // 11:59:59 PM
        ]}
        step={1} // Set step to 1 second for finer control
      />
    </div>
  );
}
