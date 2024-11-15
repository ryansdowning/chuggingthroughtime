import { useState } from 'react';

import ReactLeafletKml
  from 'react-leaflet-kml'; // react-leaflet-kml must be loaded AFTER react-leaflet

export default function KMLLayer() {
  const [kml, setKml] = useState<Document | null>(null);

  // Load the KML file on component mount
  // useEffect(() => {
  //   fetch("/static/USA_Railroads.kml")
  //     .then((response) => response.text())
  //     .then((kmlText) => {
  //       const parser = new DOMParser();
  //       const kmlDocument = parser.parseFromString(kmlText, "text/xml");
  //       setKml(kmlDocument);
  //     })
  //     .catch((error) => console.error("Error loading KML file:", error));
  // }, []);

  console.log({ kml: kml?.childNodes.length });
  if (!kml) {
    return null;
  }

  return <ReactLeafletKml kml={kml} />;
}
