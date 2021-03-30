# @gocrisp/react-store-locator

React component for Crisp's store locator widget. Intended for use with the Crisp GeoJSON connector.

## Add the store locator to your site

1. First, go set up a GeoJSON outbound connector on https://platform.gocrisp.com/. It will give you a URL to use later.
2. Create a [Google Maps API Key](https://developers.google.com/maps/gmp-get-started).
3. Install the package:
```bash
yarn add @gocrisp/react-store-locator
```
4. Use the StoreLocator component:
```javascript
import { StoreLocator } from '@gocrisp/react-store-locator';

<StoreLocator 
  geoJsonUrl="<URL from the GeoJSON connector>"
  loaderOptions={{ apiKey: '<your Google Maps API key>' }}
  style={{ margin: 'auto' }}
  mapOptions={{ center: { lat: 52.632469, lng: -1.689423 }, zoom: 7 }}
  formatLogoPath={feature =>
    `img/${feature.toLowerCase()}.png`
  }
  searchBoxOptions={{
    autocompleteOptions: {
      componentRestrictions: { country: 'gb' },
    },
  }}
/>
```

