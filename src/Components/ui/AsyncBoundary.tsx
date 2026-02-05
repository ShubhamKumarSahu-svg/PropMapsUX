import React from 'react';

type Props<T> = {
  data: T | null | undefined;
  isLoading: boolean;
  error?: unknown;
  fallback?: React.ReactNode;
  children: (data: T) => React.ReactNode;
};

export function AsyncBoundary<T>({
  data,
  isLoading,
  error,
  fallback = <span>Loading...</span>,
  children,
}: Props<T>) {
  if (isLoading) return <>{fallback}</>;
  if (error || !data) return <span>Something went wrong</span>;
  return <>{children(data)}</>;
}
