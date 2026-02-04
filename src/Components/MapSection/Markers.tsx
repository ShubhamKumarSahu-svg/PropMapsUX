import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

type MarkerItem = {
  name: string;
  rating: number;
  distance_m?: number;
  location: { lat: number; lng: number };
};

export const RenderMarkers = ({
  items,
  icon,
  showDistance = false,
}: {
  items: MarkerItem[];
  icon: L.DivIcon;
  showDistance?: boolean;
}) =>
  items.map((item) => (
    <Marker
      key={item.name}
      position={[item.location.lat, item.location.lng]}
      icon={icon}
    >
      <Popup>
        <strong>{item.name}</strong>
        <br />
        Rating: {item.rating}
        {showDistance && (
          <>
            <br />
            {Math.round(item.distance_m!)} m away
          </>
        )}
      </Popup>
    </Marker>
  ));
