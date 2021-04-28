# epcis2.js
EPCIS 2.0 Javascript SDK

### The dates

If no time zone is provided, the SDK will take the time zone of the device where it is running.
You can override it by overriding the `timeZoneOffset` property.

## Build and deploy

To build the sdk, you need node >= `v12.0.0`

You need to run: `npm run build`.

Then, you can test the library with: `node example/index.js`
