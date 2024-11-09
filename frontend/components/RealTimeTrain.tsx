import { PropsWithChildren, useEffect, useState } from "react";

import L from "leaflet";
import { Marker, Polyline, Popup, useMap } from "react-leaflet";

import { TRAIN_ICON } from "./constants";
import { getSecondsSinceMidnight } from "./helpers";
import { Coords, Route } from "./types";

interface RealTimeTrainProps {
  route: Route;
}

function RouteWithoutTrain({
  route: { departureCoords, arrivalCoords, departureIdentifier },
  children,
}: PropsWithChildren<RealTimeTrainProps>) {
  return (
    <>
      <Marker position={departureCoords}>
        <Popup>{departureIdentifier || "Unknown Station"}</Popup>
      </Marker>
      <Polyline positions={[departureCoords, arrivalCoords]} color="red" />
      {children}
    </>
  );
}

export default function RealTimeTrain({ route }: RealTimeTrainProps) {
  const {
    departureTime,
    departureCoords,
    arrivalTime,
    arrivalCoords,
    trainIdentifier,
    departureIdentifier,
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
      const secondsSinceMidnight = getSecondsSinceMidnight();
      const elapsedTime = secondsSinceMidnight - departureTime;
      if (elapsedTime < 0) {
        // Train hasn't left yet
        return;
      } else if (elapsedTime >= totalDuration) {
        // Stop animation when train reaches destination
        setPosition(L.latLng(...arrivalCoords));
        return cancelAnimationFrame(animationFrameId);
      }

      setPosition(L.latLng(...getCoords(elapsedTime)));

      // Request the next animation frame and save its ID
      animationFrameId = requestAnimationFrame(animateTrain);
    };

    // Start the animation
    animateTrain();

    // Cleanup: stop animation if the component unmounts
    return () => cancelAnimationFrame(animationFrameId);
  }, [map, departureTime, departureCoords, arrivalTime, arrivalCoords]);

  if (getSecondsSinceMidnight() > arrivalTime) {
    return <RouteWithoutTrain route={route} />;
  }

  return (
    <RouteWithoutTrain route={route}>
      <Marker position={position} icon={TRAIN_ICON}>
        <Popup>{trainIdentifier || "Unknown Train"}</Popup>
      </Marker>
    </RouteWithoutTrain>
  );
}
