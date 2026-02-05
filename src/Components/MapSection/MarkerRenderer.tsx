import L from 'leaflet';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

type Item = {
  name: string;
  rating: number;
  distance_m?: number;
  location: { lat: number; lng: number };
};

type MarkerRendererProps = {
  items: Item[];
  icon: L.DivIcon;
  showDistance?: boolean;
  keyPrefix: string;
};

export const MarkerRenderer: React.FC<MarkerRendererProps> = ({
  items,
  icon,
  showDistance = false,
  keyPrefix,
}) => (
  <>
    {items.map((item) => (
      <Marker
        key={`${keyPrefix}-${item.name}`}
        position={[item.location.lat, item.location.lng]}
        icon={icon}
      >
        <Popup>
          <strong>{item.name}</strong>
          <br />
          Rating: {item.rating}
          {showDistance && item.distance_m !== undefined && (
            <>
              <br />
              {Math.round(item.distance_m)} m away
            </>
          )}
        </Popup>
      </Marker>
    ))}
  </>
);
