import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useFetchMapData } from '../../Hooks/useFetchMapData';
const icon = L.divIcon({
  html: renderToStaticMarkup(
    <MapPin color="#2563eb" size={32} fill="#2563eb" fillOpacity={0.2} />
  ),
  className: 'bg-transparent',
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
  const [mapData, error, isLoading] = useFetchMapData();

  React.useEffect(() => {
    if (mapData) {
      console.log(mapData);
    }
    if (error) {
      console.error(error);
    }
  }, [mapData, error]);

  if (isLoading) return <div>Loading map...</div>;
  if (error) return <div>Failed to load map data</div>;

  return (
    <MapContainer
      center={currCenterPos}
      zoom={currZoomLevel}
      style={{ height: '100vh', width: '100%' }}
    >
      <MapController center={currCenterPos} zoom={currZoomLevel} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {mapData?.map((project) => (
        <Marker
          key={project.name}
          position={[project.location.lat, project.location.lng]}
          icon={icon}
        >
          <Popup>
            <strong>{project.name}</strong>
            <br />
            Rating: {project.rating}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
