// MapComponent.tsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-omnivore";
import KMLLayer from "./KMLLayer";

// Fix for default icon issues in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom hook to load KML data
// const KMLLayer = ({ kmlUrl }: { kmlUrl: string }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!kmlUrl) return;

//     // Load and parse the KML file
//     console.log({ L, omnviore: (L as any).omnivore });
//     const kmlLayer = (L as any).omnivore.kml(kmlUrl);

//     // Add KML layer to the map
//     kmlLayer.addTo(map);

//     return () => {
//       // Clean up on unmount
//       map.removeLayer(kmlLayer);
//     };
//   }, [kmlUrl, map]);

//   return null;
// };

const Map = () => {
  const washingtonDCPosition: [number, number] = [38.9072, -77.0369]; // Latitude and longitude for Washington, D.C.
  const [loaded, setLoaded] = useState(false);

  return (
    <MapContainer
      center={washingtonDCPosition}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"
        // url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <Marker position={washingtonDCPosition}>
        <Popup>Washington, D.C.</Popup>
      </Marker> */}
      <KMLLayer />
      {/* <KMLLayer kmlUrl="/static/1861_Railroad.kml" /> */}
    </MapContainer>
  );
};

export default Map;
