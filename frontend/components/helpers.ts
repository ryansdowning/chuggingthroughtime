import { Coords, Route } from "./types";

export const getSecondsSinceMidnight = (): number => {
  const now = new Date();
  return (
    now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds()
  );
};

export function getUniqueRoutes(routes: Route[]): [Coords, Coords][] {
  const uniqueRoutes = new Set<string>();
  const result: [Coords, Coords][] = [];

  for (const route of routes) {
    const [coord1, coord2] = [route.departureCoords, route.arrivalCoords];
    // Sort the coordinates to ensure [departure, arrival] and [arrival, departure] are treated the same
    const sortedCoords = [coord1, coord2].sort((a, b) =>
      a[0] !== b[0] ? a[0] - b[0] : (a[1] || 0) - (b[1] || 0)
    );

    // Convert the sorted coordinates to a string for unique checking
    const coordString = JSON.stringify(sortedCoords);

    if (!uniqueRoutes.has(coordString)) {
      uniqueRoutes.add(coordString);
      result.push([sortedCoords[0], sortedCoords[1]]);
    }
  }

  return result;
}

function addUniqueStation(
  coords: Coords,
  identifier: string | undefined,
  map: Map<string, { coords: Coords; stationIdentifier: string }>
): void {
  const key = JSON.stringify(coords);
  if (!map.has(key) || map.get(key)!.stationIdentifier === "Unknown Station") {
    map.set(key, {
      coords,
      stationIdentifier: identifier || "Unknown Station",
    });
  }
}

export function getUniqueStations(
  routes: Route[]
): { coords: Coords; stationIdentifier: string }[] {
  const uniqueStations = new Map<
    string,
    { coords: Coords; stationIdentifier: string }
  >();

  for (const route of routes) {
    // Use helper function to add unique departure and arrival stations
    addUniqueStation(
      route.departureCoords,
      route.departureIdentifier,
      uniqueStations
    );
    addUniqueStation(
      route.arrivalCoords,
      route.arrivalIdentifier,
      uniqueStations
    );
  }

  // Convert the map values to an array
  return Array.from(uniqueStations.values());
}

export function formatTime(secondsSinceMidnight: number) {
  const hours = Math.floor(secondsSinceMidnight / 3600);
  const mins = Math.floor((secondsSinceMidnight % 3600) / 60);
  const secs = secondsSinceMidnight % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
