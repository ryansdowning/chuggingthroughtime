import "leaflet/dist/leaflet.css";
import "leaflet-omnivore";

import React from "react";

import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import { WASHINGTON_DC_COORDS } from "./constants";
import Routes from "./Routes";
import Stations from "./Stations";
import { TimeReducerProps } from "./time-reducer";
import Trains from "./Trains";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Map(props: TimeReducerProps) {
  return (
    <MapContainer
      center={WASHINGTON_DC_COORDS}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Stations />
      <Routes />
      <Trains {...props} />
    </MapContainer>
  );
}
