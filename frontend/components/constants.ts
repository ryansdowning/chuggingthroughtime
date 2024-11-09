import L from "leaflet";

import routes from "../routes.json";
import { Coords, Route } from "./types";

export const WASHINGTON_DC_COORDS: Coords = [38.9072, -77.0369]; // Latitude and longitude for Washington, D.C.
export const NYC_COORDS: Coords = [40.7128, -74.006]; // Latitude and longitude for New York City
export const ROUTES = routes as Route[];

export const TRAIN_ICON = new L.Icon({
  iconUrl: "https://img.icons8.com/ios-filled/50/000000/train--v1.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});
