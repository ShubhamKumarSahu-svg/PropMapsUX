import React, { Suspense } from 'react';

export function withLazy<P extends object>(
  loader: () => Promise<{ default: React.ComponentType<P> }>,
  fallback: React.ReactNode
) {
  const LazyComponent = React.lazy(loader);

  const Wrapped: React.FC<P> = (props) => {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  return Wrapped;
}
