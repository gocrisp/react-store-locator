import React, { useEffect, useRef, useState } from 'react';
import {
  createStoreLocatorMap,
  StoreLocatorMap,
  StoreLocatorOptions,
} from '@gocrisp/store-locator';

import '@gocrisp/store-locator/dist/store-locator.css';
import { Loader } from '@googlemaps/js-api-loader';

export type StoreLocatorProps = Omit<StoreLocatorOptions, 'container'> & {
  className?: string;
  style?: React.CSSProperties;
  onMapInit?: (storeLocatorMap: StoreLocatorMap) => void;
};

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
  skipLoadingGoogleMaps,
}) => {
  const [mapsLibraryLoaded, setMapsLibraryLoaded] = useState(skipLoadingGoogleMaps);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skipLoadingGoogleMaps) {
      const loader = new Loader({
        apiKey: loaderOptions.apiKey,
        libraries: ['places', 'geometry'],
      });
      loader
        .load()
        .then(() => setMapsLibraryLoaded(true))
        .catch(err => console.error('Could not load Google Maps', err));
    }
  }, [loaderOptions.apiKey, skipLoadingGoogleMaps]);

  useEffect(() => {
    if (containerRef.current && mapsLibraryLoaded) {
      createStoreLocatorMap({
        container: containerRef.current,
        loaderOptions,
        geoJson,
        mapOptions,
        infoWindowOptions,
        formatLogoPath,
        searchBoxOptions,
        skipLoadingGoogleMaps: true,
      })
        .then(onMapInit)
        .catch(err => console.error('Could not initialize store locator map.', err));
    }
  }, [
    mapsLibraryLoaded,
    loaderOptions,
    geoJson,
    formatLogoPath,
    infoWindowOptions,
    mapOptions,
    searchBoxOptions,
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
