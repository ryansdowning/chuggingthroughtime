export type Coords = [number, number, number?]; // [x, y, z?]
export type Route = {
  departureTime: number; // seconds since midnight UTC
  departureCoords: Coords;
  arrivalTime: number; // seconds since midnight UTC
  arrivalCoords: Coords;
  trainName?: string;
  trainNumber?: string;
  departureIdentifier?: string;
  arrivalIdentifier?: string;
};
