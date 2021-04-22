import React, { useEffect, useRef } from 'react';
import {
  createStoreLocatorMap,
  StoreLocatorMap,
  StoreLocatorOptions,
} from '@gocrisp/store-locator';

import '@gocrisp/store-locator/dist/store-locator.css';

export type StoreLocatorProps = Omit<StoreLocatorOptions, 'container'> & {
  className?: string;
  style?: React.CSSProperties;
  onMapInit?: (storeLocatorMap: StoreLocatorMap) => void;
};

// Re-export type so it is visible when using this package
export { StoreLocatorMap } from '@gocrisp/store-locator';

export const StoreLocator: React.VFC<StoreLocatorProps> = ({
  onMapInit = () => {},
  className,
  style,
  loaderOptions,
  geoJson,
  mapOptions,
  infoWindowOptions,
  formatLogoPath,
  searchBoxOptions,
  storeListOptions,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      createStoreLocatorMap({
        container: containerRef.current,
        loaderOptions,
        geoJson,
        mapOptions,
        infoWindowOptions,
        formatLogoPath,
        searchBoxOptions,
        storeListOptions,
      })
        .then(onMapInit)
        .catch(err => console.error('Could not initialize store locator map.', err));
    }
  }, [
    loaderOptions,
    geoJson,
    formatLogoPath,
    infoWindowOptions,
    mapOptions,
    searchBoxOptions,
    storeListOptions,
    onMapInit,
  ]);

  // Include a default minHeight to prevent confusion over why the map is not visible if no
  // styling is provided.
  const defaultHeight = className ? undefined : { minHeight: 400 };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...defaultHeight, ...style, position: 'relative', overflow: 'hidden' }}
    />
  );
};
