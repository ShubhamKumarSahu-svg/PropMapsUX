import React from 'react';

type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Map error:', error);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong while loading the map.</div>;
    }
    return this.props.children;
  }
}
