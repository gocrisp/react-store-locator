import React from 'react';
import { createStoreLocatorMap } from '@gocrisp/store-locator';
import { render, waitFor } from '@testing-library/react';
import { Loader } from '@googlemaps/js-api-loader';
import '@testing-library/jest-dom';
import { mocked } from 'ts-jest/utils';
import { StoreLocator } from '../index';

jest.mock('@gocrisp/store-locator');

jest.mock('@googlemaps/js-api-loader');
const mockLoader = mocked(Loader, true);

const options = {
  loaderOptions: { apiKey: 'AIzaSyDdH3QeHDu3XGXwcIF9sMHQmbn2YS4N4Kk' },
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
  const onMapInit = jest.fn();

  const resolveCreateValue = 14;
  const mockCreateStoreLocatorMap = () => {
    const fn = jest.fn(() => Promise.resolve(resolveCreateValue));
    (createStoreLocatorMap as jest.Mock).mockImplementation(fn);
    return fn;
  };

  beforeEach(mockCreateStoreLocatorMap);
  beforeEach(() => {
    // @ts-expect-error: not mocking the whole thing
    mockLoader.mockImplementation(() => ({ load: () => Promise.resolve() }));

    onMapInit.mockReset();
  });

  it('calls createStoreLocatorMap on render', async () => {
    render(<StoreLocator onMapInit={onMapInit} {...options} />);
    await waitFor(() => onMapInit.mock.calls.length > 0);

    expect(createStoreLocatorMap).toHaveBeenCalledTimes(1);
    // @ts-expect-error Tuple of type [] has no matching index 0
    expect(createStoreLocatorMap.mock.calls[0][0]).toMatchObject(options);
  });

  it('includes classNames on container', async () => {
    const className = 'cls1 cls2 cls3';
    render(<StoreLocator onMapInit={jest.fn} {...options} className={className} />);
    await waitFor(() => onMapInit.mock.calls.length > 0);

    expect(document.getElementsByClassName(className)?.length).toBe(1);
  });

  it('includes style properties on container', async () => {
    const style = {
      overflow: 'hidden',
      backgroundColor: 'red',
    };
    const className = 'store-locator';
    render(<StoreLocator onMapInit={jest.fn} {...options} style={style} className={className} />);

    await waitFor(() => onMapInit.mock.calls.length > 0);

    const element = document.getElementsByClassName(className)[0];
    expect(element).toHaveStyle(style);
  });

  it('position and overflow are constant (cannot be overwritten)', async () => {
    const style = {
      position: 'absolute',
      overflow: 'auto',
    } as React.CSSProperties;
    const className = 'store-locator';

    render(<StoreLocator onMapInit={jest.fn} {...options} style={style} className={className} />);
    await waitFor(() => onMapInit.mock.calls.length > 0);

    const element = document.getElementsByClassName(className)[0];
    expect(element).toHaveStyle({ position: 'relative', overflow: 'hidden' });
  });

  it('calls onMapInit on initialisation', async () => {
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
