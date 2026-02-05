import type { MapProps } from '../MapSection/Map';
import { MapSkeleton } from './MapSkeleton';
import { withLazy } from './withLazy';

export const LazyMap = withLazy<MapProps>(
  () => import('../MapSection/Map').then((m) => ({ default: m.Map })),
  <MapSkeleton />
);
