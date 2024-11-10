import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { Stack } from "@mantine/core";

import { TRAIN_ICON } from "./constants";
import { formatTime } from "./helpers";
import { TimeReducerProps } from "./time-reducer";
import { Coords, Route } from "./types";

const WAIT_BEFORE_AND_AFTER = 300; // seconds

interface RealTimeTrainProps extends TimeReducerProps {
  route: Route;
}

export default function RealTimeTrain({
  route,
  timeState,
}: RealTimeTrainProps) {
  const {
    departureTime,
    departureCoords,
    arrivalTime,
    arrivalCoords,
    trainName,
  } = route;
  const totalDuration = arrivalTime - departureTime;
  const latDiff = arrivalCoords[0] - departureCoords[0];
  const lngDiff = arrivalCoords[1] - departureCoords[1];
  const getCoords = (elapsedTime: number): Coords => {
    const journeyFraction = Math.min(elapsedTime / totalDuration, 1);
    const newPosition = L.latLng(
      departureCoords[0] + journeyFraction * latDiff,
      departureCoords[1] + journeyFraction * lngDiff
    );
    return [newPosition.lat, newPosition.lng];
  };

  const position = (() => {
    const { secondsSinceMidnight } = timeState;
    const elapsedTime = secondsSinceMidnight - departureTime;
    if (elapsedTime < 0) {
      // Train hasn't left yet
      return L.latLng(...departureCoords);
    } else if (elapsedTime >= totalDuration) {
      return L.latLng(...arrivalCoords);
    }

    return L.latLng(...getCoords(elapsedTime));
  })();

  if (
    timeState.secondsSinceMidnight - WAIT_BEFORE_AND_AFTER < departureTime ||
    timeState.secondsSinceMidnight > arrivalTime + WAIT_BEFORE_AND_AFTER
  ) {
    return null;
  }

  return (
    <Marker position={position} icon={TRAIN_ICON}>
      <Popup>
        <Stack gap="xs">
          <h3>{trainName || "Unknown Train"}</h3>
          <div>
            {timeState.secondsSinceMidnight >= departureTime
              ? "Departed"
              : "Departing from"}{" "}
            <span style={{ fontWeight: "bold" }}>
              {route.departureIdentifier ?? "Unknown Station"}
            </span>{" "}
            at {formatTime(departureTime)}
          </div>
          <div>
            {timeState.secondsSinceMidnight >= arrivalTime
              ? "Arrived"
              : "Arriving"}
            {" to "}
            <span style={{ fontWeight: "bold" }}>
              {route.arrivalIdentifier ?? "Unknown Station"}
            </span>{" "}
            at {formatTime(arrivalTime)}
          </div>
          <div>
            Average speed (est.):{" "}
            <span style={{ fontWeight: "bold" }}>{route.mph} MPH</span>
          </div>
        </Stack>
      </Popup>
    </Marker>
  );
}
