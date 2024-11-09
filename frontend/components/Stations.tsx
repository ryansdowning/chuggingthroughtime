import { Marker, Popup } from "react-leaflet";

import { ROUTES } from "./constants";
import { getUniqueStations } from "./helpers";
import { TimeReducerProps } from "./time-reducer";

export default function Stations({ timeState }: TimeReducerProps) {
  const stations = getUniqueStations(ROUTES);

  if (!timeState.showPopups) {
    return null;
  }

  return (
    <>
      {stations.map(({ coords, stationIdentifier }, index) => (
        <Marker key={index} position={coords}>
          <Popup>{stationIdentifier}</Popup>
        </Marker>
      ))}
    </>
  );
}
