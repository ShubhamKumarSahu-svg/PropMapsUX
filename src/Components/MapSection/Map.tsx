import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { MapPin } from "lucide-react";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

const icon = L.divIcon({
  html: renderToStaticMarkup(<MapPin color="#2563eb" size={32} fill="#2563eb" fillOpacity={0.2} />),
  className: "bg-transparent",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export type MapProps = {
  currCenterPos: [number, number];
  currZoomLevel: number;
};

export const Map: React.FC<MapProps> = ({ currCenterPos, currZoomLevel }) => {
  return (
    <MapContainer
      center={currCenterPos}
      zoom={currZoomLevel}
      style={{ height: "100vh", width: "100%" }}
    >
      <MapController center={currCenterPos} zoom={currZoomLevel} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Marker position={currCenterPos} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
