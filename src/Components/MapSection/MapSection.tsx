import React from 'react';
import { useFetchMapData } from '../../Hooks/useFetchMapData';
import { CardList } from '../CardList/CardList';
import { AsyncBoundary } from '../ui/AsyncBoundary';
import { LazyMap } from '../ui/LazyMap';

export const MapSection = () => {
  const [data, error, isLoading] = useFetchMapData();
  const [idx, setIdx] = React.useState(0);

  return (
    <main className="flex h-screen w-screen">
      <div className="w-1/4">
        <AsyncBoundary data={data} isLoading={isLoading} error={error}>
          {(cards) => (
            <CardList
              cards={cards}
              selectedCardIndex={idx}
              onCardClick={(i) => setIdx(i)}
            />
          )}
        </AsyncBoundary>
      </div>

      <div className="w-3/4">
        <AsyncBoundary data={data} isLoading={isLoading} error={error}>
          {(cards) => (
            <LazyMap
              currCenterPos={[cards[idx].location.lat, cards[idx].location.lng]}
              currZoomLevel={15}
            />
          )}
        </AsyncBoundary>
      </div>
    </main>
  );
};
