# epcis2.js
EPCIS 2.0 Javascript SDK

### The dates

Each time you have to provide a date to the SDK, you have to possibilities:
- provide an `ISO String`. If you want to provide the timezone in the ISO string, it has to be this format : 
`2005-04-03T20:33:31.116-06:00`
- provide a Date object. The SDK will automatically set the timezone of the date to 
the timezone of the device and write the timezone in the ISO string (e.g `2005-04-03T20:33:31.116-02:00`). 

You can override the timezone by providing a second parameter to the functions where you set the date.
For example:

```js
obj.setEventTime('2005-04-03T20:33:31.116-02:00'); // will be '2005-04-03T20:33:31.116-02:00' once converted to json
obj.setEventTime('2005-04-03T20:33:31.116', -2); // an equivalent
obj.setEventTime(new Date('2005-04-03T20:33:31.116'), -2); // an equivalent

obj.setEventTime(new Date('2005-04-03T20:33:31.116')); // will be '2005-04-03T20:33:31.116-02:00' only if your timezone 
// is UTC+2.
```

Alternatively, you can override the timezone properties by providing a timezone to the SDK.

```js
const epcis2 = require('epcis2');

epcis2.setup({
  timezone: -2 // e.g '-02:00', 6,'+06:00' 
});

obj.setEventTime(new Date('2005-04-03T20:33:31.116')); // will be '2005-04-03T20:33:31.116-02:00' no matter your
// timezone


```


If no time zone is provided, the SDK will take the time zone of the device where it is running.
You can override it by overriding the `timeZoneOffset` property.

## Build and deploy

To build the sdk, you need node >= `v12.0.0`

You need to run: `npm run build`.

Then, you can test the library with: `node example/index.js`
