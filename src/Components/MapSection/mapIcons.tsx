import L from 'leaflet';
import {
  Building2,
  GraduationCap,
  Hospital,
  MapPin,
  ShoppingBag,
  Trees,
} from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

type NearbyCategory = 'schools' | 'hospitals' | 'offices' | 'parks' | 'malls';

const baseIconConfig = {
  className: 'bg-transparent',
  iconSize: [28, 28] as [number, number],
  iconAnchor: [14, 28] as [number, number],
};

export const projectIcon = L.divIcon({
  ...baseIconConfig,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  html: renderToStaticMarkup(
    <MapPin color="#2563eb" size={32} fill="#2563eb" fillOpacity={0.2} />
  ),
});

export const categoryIcons: Record<NearbyCategory, L.DivIcon> = {
  schools: L.divIcon({
    ...baseIconConfig,
    html: renderToStaticMarkup(<GraduationCap color="#16a34a" size={28} />),
  }),

  hospitals: L.divIcon({
    ...baseIconConfig,
    html: renderToStaticMarkup(<Hospital color="#dc2626" size={28} />),
  }),

  offices: L.divIcon({
    ...baseIconConfig,
    html: renderToStaticMarkup(<Building2 color="#4f46e5" size={28} />),
  }),

  parks: L.divIcon({
    ...baseIconConfig,
    html: renderToStaticMarkup(<Trees color="#15803d" size={28} />),
  }),

  malls: L.divIcon({
    ...baseIconConfig,
    html: renderToStaticMarkup(<ShoppingBag color="#ea580c" size={28} />),
  }),
};
