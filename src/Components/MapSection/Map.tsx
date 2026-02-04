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

const categoryIcon = L.divIcon({
  html: renderToStaticMarkup(
    <MapPin color="#dc2626" size={28} fill="#dc2626" fillOpacity={0.3} />
  ),
  className: 'bg-transparent',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
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

type NearbyCategory = 'schools' | 'hospitals' | 'offices' | 'parks' | 'malls';

export const Map: React.FC<MapProps> = ({ currCenterPos, currZoomLevel }) => {
  const [mapData, error, isLoading] = useFetchMapData();

  const [activeCategory, setActiveCategory] =
    React.useState<NearbyCategory | null>(null);

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
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1000,
          display: 'flex',
          gap: 8,
        }}
      >
        {(
          [
            'schools',
            'hospitals',
            'offices',
            'parks',
            'malls',
          ] as NearbyCategory[]
        ).map((category) => (
          <button
            key={category}
            onClick={() =>
              setActiveCategory(activeCategory === category ? null : category)
            }
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: '1px solid #ccc',
              background: activeCategory === category ? '#2563eb' : 'white',
              color: activeCategory === category ? 'white' : 'black',
              cursor: 'pointer',
            }}
          >
            {category}
          </button>
        ))}
      </div>
      {activeCategory &&
        mapData?.flatMap(
          (project) =>
            project.nearby?.[activeCategory]?.items?.map((item) => (
              <Marker
                key={`${project.name}-${item.name}`}
                position={[item.location.lat, item.location.lng]}
                icon={categoryIcon}
              >
                <Popup>
                  <strong>{item.name}</strong>
                  <br />
                  Rating: {item.rating}
                  <br />
                  {Math.round(item.distance_m)} m away
                </Popup>
              </Marker>
            )) ?? []
        )}
    </MapContainer>
  );
};
