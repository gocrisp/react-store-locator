# @gocrisp/react-store-locator

[![Package Version](https://img.shields.io/npm/v/@gocrisp/react-store-locator.svg)](https://www.npmjs.com/package/@gocrisp/react-store-locator) [![MIT License](https://img.shields.io/npm/l/stack-overflow-copy-paste.svg)](http://opensource.org/licenses/MIT)


React version of Crisp's [store locator component](https://github.com/gocrisp/store-locator). Intended for use with the Crisp GeoJSON connector.

This uses the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) to easily create a simple store locator from any GeoJSON source.

Please refer to [our example page](https://gocrisp.github.io/store-locator/) to see this package in action and for more advanced usage examples. The steps below will provide the minimum for creating a store locator with React.

## Create a Store Locator

### Set up services

First, go set up a GeoJSON outbound connector on https://platform.gocrisp.com/. It will give you a URL to use later. <!--TODO: needs details/link to BYT-573 -->

Create a [Google Maps API Key](https://developers.google.com/maps/gmp-get-started) with the following APIs enabled:
- `Maps JavaScript API`
- `Places API`
- `Distance Matrix API`.
- `Street View Static API`


### Simple Implementation
**Install this package**
```bash
yarn add @gocrisp/react-store-locator
```
or
```bash
npm install @gocrisp/store-locator --save
```

**Include the styles:** We have some minimal styles included as plain css in `@gocrisp/react-store-locator/dist/react-store-locator.css`. You will need to pull this into your site however you are including styles. We've kept the definitions as minimal as possible so that you can easily override or recreate the styles yourself. And every class is namespaced with the `map_` prefix to avoid collisions. 

Then, wherever you want to include the store locator map, insert this snippet:
```jsx
import { StoreLocator } from '@gocrisp/react-store-locator';

<StoreLocator 
  geoJson="<URL from the GeoJSON connector>"
  loaderOptions={{ apiKey: '<your Google Maps API key>' }}
/>
```

Most of the Google Maps JavaScript API options and objects are available for customization as well. More details are available in the [examples and documentation](https://gocrisp.github.io/store-locator/).

