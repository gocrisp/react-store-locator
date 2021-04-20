import React from 'react';
import { createStoreLocatorMap } from '@gocrisp/store-locator';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoreLocator } from '../index';

jest.mock('@gocrisp/store-locator');

const options = {
  loaderOptions: { apiKey: 'api-key' },
  geoJson: 'https://platform.gocrisp.com/geojson.json',
  mapOptions: { center: { lat: 52.632469, lng: -1.689423 }, zoom: 7 },
  formatLogoPath: (feature: google.maps.Data.Feature) =>
    `img/${feature
      .getProperty('banner')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')}.png`,
  searchBoxOptions: {
    autocompleteOptions: {
      componentRestrictions: { country: 'gb' },
    },
  },
};

describe('react-store-locator', () => {
  const resolveCreateValue = 14;
  const mockCreateStoreLocatorMap = () => {
    const fn = jest.fn(() => Promise.resolve(resolveCreateValue));
    (createStoreLocatorMap as jest.Mock).mockImplementation(fn);
    return fn;
  };

  beforeEach(mockCreateStoreLocatorMap);

  it('calls createStoreLocatorMap on render', () => {
    render(<StoreLocator onMapInit={jest.fn} {...options} />);
    expect(createStoreLocatorMap).toHaveBeenCalledTimes(1);
    // @ts-expect-error Tuple of type [] has no matching index 0
    expect(createStoreLocatorMap.mock.calls[0][0]).toMatchObject(options);
  });

  it('includes classNames on container', () => {
    const className = 'cls1 cls2 cls3';
    render(<StoreLocator onMapInit={jest.fn} {...options} className={className} />);
    expect(document.getElementsByClassName(className)?.length).toBe(1);
  });

  it('includes style properties on container', () => {
    const style = {
      overflow: 'hidden',
      backgroundColor: 'red',
    };
    const className = 'store-locator';
    render(<StoreLocator onMapInit={jest.fn} {...options} style={style} className={className} />);

    const element = document.getElementsByClassName(className)[0];
    expect(element).toHaveStyle(style);
  });

  it('position and overflow are constant (cannot be overwritten)', () => {
    const style = {
      position: 'absolute',
      overflow: 'auto',
    } as React.CSSProperties;
    const className = 'store-locator';
    render(<StoreLocator onMapInit={jest.fn} {...options} style={style} className={className} />);

    const element = document.getElementsByClassName(className)[0];
    expect(element).toHaveStyle({ position: 'relative', overflow: 'hidden' });
  });

  it('calls onMapInit on initialisation', async () => {
    const onMapInit = jest.fn();
    render(<StoreLocator onMapInit={onMapInit} {...options} />);
    await waitFor(() => onMapInit.mock.calls.length > 0);
    expect(onMapInit).toHaveBeenCalledTimes(1);
    expect(onMapInit).toHaveBeenLastCalledWith(resolveCreateValue);
  });

  it('re-initialises and calls onMapInit when props change', async () => {
    const onMapInit = jest.fn();
    const { rerender } = render(<StoreLocator onMapInit={onMapInit} {...options} />);
    await waitFor(() => onMapInit.mock.calls.length > 0);

    rerender(<StoreLocator onMapInit={onMapInit} {...options} formatLogoPath={() => ''} />);
    await waitFor(() => onMapInit.mock.calls.length > 1);

    expect(onMapInit).toHaveBeenCalledTimes(2);
    expect(onMapInit).toHaveBeenLastCalledWith(resolveCreateValue);

    rerender(<StoreLocator onMapInit={onMapInit} {...options} mapOptions={{}} />);
    await waitFor(() => onMapInit.mock.calls.length > 2);

    expect(onMapInit).toHaveBeenCalledTimes(3);
    expect(onMapInit).toHaveBeenLastCalledWith(resolveCreateValue);
  });
});
