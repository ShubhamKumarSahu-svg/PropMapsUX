/*eslint-disable*/

import 'leaflet/dist/leaflet.css';
import * as React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useFetchMapData } from '../../Hooks/useFetchMapData';
import type { NearbyCategory } from '../types/maps';
import { categoryIcons, projectIcon } from '../ui/mapIcons';
import { CategoryOverlay } from './CategoryOverlay';
import { MarkerRenderer } from './MarkerRenderer';
const MapController = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
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

      <MarkerRenderer
        items={mapData ?? []}
        icon={projectIcon}
        keyPrefix="project"
      />

      <CategoryOverlay
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      {activeCategory &&
        mapData?.flatMap((project) =>
          project.nearby?.[activeCategory]?.items ? (
            <MarkerRenderer
              key={project.name}
              items={project.nearby[activeCategory].items}
              icon={categoryIcons[activeCategory]}
              showDistance
              keyPrefix={`${project.name}-${activeCategory}`}
            />
          ) : null
        )}
    </MapContainer>
  );
};
