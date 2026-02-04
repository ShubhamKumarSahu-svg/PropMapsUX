import * as React from 'react';
import { useFetchMapData } from '../../Hooks/useFetchMapData';
import { CardList } from '../CardList/CardList';
import type { PropertyCardProps } from '../PropCard/PropertyCard';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { Map } from './Map';

export const MapSection = () => {
  const [data, _error, isLoading] = useFetchMapData();

  const [curSelectedCardIndex, setCurSelectedCardIndex] =
    React.useState<number>(0);

  const onCardClick = (cardIndex: number, _card: PropertyCardProps) => {
    setCurSelectedCardIndex(cardIndex);
  };

  return (
    <main className="flex flex-row h-screen w-screen">
      {/* Left side bar */}
      <div className="w-1/4 h-full">
        <CardList
          cards={data ?? []}
          onCardClick={onCardClick}
          selectedCardIndex={curSelectedCardIndex}
          className="p-5"
        ></CardList>
      </div>
      {/* Map Area */}
      <div className="w-3/4 h-full">
        {data && !isLoading ? (
          <ErrorBoundary>
            <Map
              currCenterPos={[
                data[curSelectedCardIndex].location.lat,
                data[curSelectedCardIndex].location.lng,
              ]}
              currZoomLevel={15}
            />
          </ErrorBoundary>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </main>
  );
};
