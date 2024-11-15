import { Polyline } from "react-leaflet";

import { ROUTES } from "./constants";
import { getUniqueRoutes } from "./helpers";

export default function Routes() {
  const routes = getUniqueRoutes(ROUTES);
  return (
    <>
      {routes.map(([departureCoords, arrivalCoords], index) => (
        <Polyline
          key={index}
          positions={[departureCoords, arrivalCoords]}
          color="blue"
          pathOptions={{ opacity: 0.5 }}
        />
      ))}
    </>
  );
}
