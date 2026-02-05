import React from 'react';
import { Skeleton } from '../../../shadcn-ui/components/ui/skeleton';

export const MapSkeleton: React.FC = () => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md bg-muted/40">
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-px">
        {Array.from({ length: 16 }).map((_, i) => (
          <Skeleton key={i} className="h-full w-full rounded-none" />
        ))}
      </div>

      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-md" />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
};
