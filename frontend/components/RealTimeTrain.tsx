import { useEffect, useState } from "react";

import L from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";

import { TRAIN_ICON } from "./constants";
import { TimeReducerProps } from "./time-reducer";
import { Coords, Route } from "./types";

const PAUSE_AFTER_ARRIVAL = 30; // seconds

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
    trainIdentifier,
  } = route;
  const map = useMap();
  const [position, setPosition] = useState(L.latLng(...departureCoords));
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

  useEffect(() => {
    let animationFrameId: number;

    const animateTrain = () => {
      const { secondsSinceMidnight } = timeState;
      const elapsedTime = secondsSinceMidnight - departureTime;
      if (elapsedTime < 0) {
        // Train hasn't left yet
        return;
      } else if (elapsedTime >= totalDuration) {
        setPosition(L.latLng(...arrivalCoords));
      }

      setPosition(L.latLng(...getCoords(elapsedTime)));

      // Request the next animation frame and save its ID
      animationFrameId = requestAnimationFrame(animateTrain);
    };

    // Start the animation
    animateTrain();

    // Cleanup: stop animation if the component unmounts
    return () => cancelAnimationFrame(animationFrameId);
  }, [
    map,
    departureTime,
    departureCoords,
    arrivalTime,
    arrivalCoords,
    timeState.secondsSinceMidnight,
  ]);

  if (timeState.secondsSinceMidnight > arrivalTime + PAUSE_AFTER_ARRIVAL) {
    return null;
  }

  return (
    <Marker position={position} icon={TRAIN_ICON}>
      <Popup>{trainIdentifier || "Unknown Train"}</Popup>
    </Marker>
  );
}
