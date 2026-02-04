import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

type Item = {
  name: string;
  rating: number;
  distance_m?: number;
  location: { lat: number; lng: number };
};

export const MarkerRenderer = ({
  items,
  icon,
  showDistance = false,
  keyPrefix,
}: {
  items: Item[];
  icon: L.DivIcon;
  showDistance?: boolean;
  keyPrefix: string;
}) => {
  return (
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
            {showDistance && (
              <>
                <br />
                {Math.round(item.distance_m!)} m away
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </>
  );
};
