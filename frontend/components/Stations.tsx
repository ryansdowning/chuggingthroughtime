import { Marker, Popup } from "react-leaflet";

import { ROUTES } from "./constants";
import { getUniqueStations } from "./helpers";

export default function Stations() {
  const stations = getUniqueStations(ROUTES);

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
