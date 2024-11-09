import 'leaflet/dist/leaflet.css';
import 'leaflet-omnivore';

import React from 'react';

import L from 'leaflet';
// MapComponent.tsx
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';

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

type Coords = [number, number, number?];
const WASHINGTON_DC_COORDS: Coords = [38.9072, -77.0369]; // Latitude and longitude for Washington, D.C.
const NYC_COORDS: Coords = [40.7128, -74.006]; // Latitude and longitude for New York City

const Map = () => {
  return (
    <MapContainer
      center={WASHINGTON_DC_COORDS}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png"
        // url="https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"
        // url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={WASHINGTON_DC_COORDS}>
        <Popup>Washington, D.C.</Popup>
      </Marker>
      <Marker position={NYC_COORDS}>
        <Popup>New York City</Popup>
      </Marker>
      {/* <KMLLayer /> */}
      {/* <KMLLayer kmlUrl="/static/1861_Railroad.kml" /> */}
    </MapContainer>
  );
};

export default Map;
