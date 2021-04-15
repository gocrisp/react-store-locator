import React from 'react';
import ReactDOM from 'react-dom';
import { StoreLocator } from '../src';

const App = () => (
  <StoreLocator
    geoJson="./sample.json"
    loaderOptions={{ apiKey: 'AIzaSyDdH3QeHDu3XGXwcIF9sMHQmbn2YS4N4Kk' }}
    style={{ margin: 'auto' }}
    mapOptions={{ center: { lat: 52.632469, lng: -1.689423 }, zoom: 7 }}
    formatLogoPath={feature =>
      `img/${feature
        .getProperty('store')
        .toLowerCase()
        // remove after 2nd space
        .split(' ')
        .slice(0, 2)
        .join('')
        // remove special characters
        .replace(/[^a-z0-9]/g, '')}.png`
    }
    searchBoxOptions={{
      autocompleteOptions: {
        componentRestrictions: { country: 'gb' },
      },
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('app'));
