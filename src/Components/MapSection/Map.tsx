import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useFetchMapData } from '../../Hooks/useFetchMapData';
import { CategoryOverlay } from './CategoryOverlay';
import { MarkerRenderer } from './MarkerRenderer';

const projectIcon = L.divIcon({
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

const MapController = ({ center, zoom }: any) => {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
};

type NearbyCategory = 'schools' | 'hospitals' | 'offices' | 'parks' | 'malls';

export type MapProps = {
  currCenterPos: [number, number];
  currZoomLevel: number;
};

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

      <MarkerRenderer items={mapData} icon={projectIcon} keyPrefix="project" />

      <CategoryOverlay
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {activeCategory &&
        mapData.flatMap((project) =>
          project.nearby?.[activeCategory]?.items ? (
            <MarkerRenderer
              key={project.name}
              items={project.nearby[activeCategory].items}
              icon={categoryIcon}
              showDistance
              keyPrefix={`${project.name}-${activeCategory}`}
            />
          ) : null
        )}
    </MapContainer>
  );
};
