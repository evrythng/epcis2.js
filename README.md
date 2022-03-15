# epcis2.js

EPCIS 2.0 Javascript SDK

`epcis2.js` is a Javascript SDK (client-side & Node.js compatible) to facilitate sending data to GS1 EPCIS 2.0 compliant repositories. It provides plenty of helper function
to make pushing standard compliant supply chain events as easy a possible.

This project is jointly supported by [EVRYTHNG](https://evrythng.com) and [Zebra](https://www.zebra.com/).

## Introduction to EPCIS and EPCIS 2.0

EPCIS is a GS1 standard for the integration of supply chain information systems. EPCIS is especially valuable to facilitate the seamless exchange of information in supply chains that span multiple actors and organisations. EPCIS 2.0 is the work-in-progress major update to the GS1 EPCIS standard. It was driven by the need to bring EPCIS to the Web. EPCIS 2.0 currently being developed by the EPCIS and CBV 2.0 MSWG which EVRYTHNG are Zebra part of. The standard has not been ratified yet, hence consider everything you see here tentative.

EPCIS 2.0 brings the following highlights to the table:

- Support for JSON and JSON-LD (vs XML before)
- A REST API (vs SOAP before)
- Support for IoT data, i.e., sensor information

## Installation

Install as an app dependency:

```
npm install --save epcis2.js
```

or as a development dependency:

```
npm install --save-dev epcis2.js
```

Then require it in any module:

```js
const { setup, actionTypes } = require('epcis2.js');

setup({ apiUrl: 'https://api.evrythng.io/v2/epcis' });
```

Or using ES6 `import` / `export` syntax when available:

```js
import epcis from 'epcis2.js';

// Alternatively
import { setup } from 'epcis2.js';

// Alternatively
import * as epcis from 'epcis2.js';
```

## Building an EPCIS 2.0 JSON document

### Instantiating an EPCIS 2.0 Document

For each object you instantiate with this library, you can create it from setters:

```js
const epcisDocument = new EPCISDocument();

epcisDocument.setCreationDate('2005-07-11T11:30:47+00:00').setSchemaVersion('2.0');
```

Or create it from another object:

```js
const epcisDocument = new EPCISDocument({
  creationDate: '2005-07-11T11:30:47+00:00',
  schemaVersion: '2.0',
});
```

### Adding events to an EPCIS 2.0 document

To add an event to an EPCIS document, you can use the following:

```js
const event = new ObjectEvent();
const event2 = new ObjectEvent();
const epcisDocument = new EPCISDocument();

event
  .setAction(actionTypes.observe)
  .setEventTime('2005-04-03T20:33:31.116-06:00')
  .setEventTimeZoneOffset('-06:00');

event2
  .setAction(actionTypes.observe)
  .setEventTime('2005-04-03T21:33:31.116-06:00')
  .setEventTimeZoneOffset('-06:00');

epcisDocument.addEvent(event).addEvent(event2);

console.log(epcisDocument.toString());
```

This example would output (as a string):

```json
{
  "isA":"EPCISDocument",
  "@context":"https://gs1.github.io/EPCIS/epcis-context.jsonld",
  "schemaVersion":"2",
  "creationDate":"2022-03-15T09:48:06.047Z",
  "epcisBody": {
    "eventList": [ 
      {
        "eventTimeZoneOffset":"-06:00",
        "eventTime":"2005-04-03T20:33:31.116-06:00",
        "isA":"ObjectEvent",
        "action":"OBSERVE" 
      },
      {
        "eventTimeZoneOffset":"-06:00",
        "eventTime":"2005-04-03T21:33:31.116-06:00",
        "isA":"ObjectEvent",
        "action":"OBSERVE"
      }
    ]
  }
}
```

### CBV attributes autocomplete

The latest version of the SDK enables you to easily search among all attributes of each Core Business Vocabulary.
In order to do this, for example, you can import `actionType` as we did in the script above. Then, by typing `actionType.` as a parameter of the `setAction` method of the `ObjectEvent` class, you will be displayed all the attributes associated to this particular CBV.
The list of all CBVs and the respective attributes can be viewed in ./src/cbv/cbv.js.

### Default values

You can override the default values of EPCISDocument fields by providing them to the setup function.

You can configure the following fields:

- `EPCISDocumentContext` - the '@context' property of an EPCISDocument. By default, the value is
  `https://gs1.github.io/EPCIS/epcis-context.jsonld`
- `EPCISDocumentSchemaVersion` - the 'schemaVersion' property of an EPCISDocument. By default, the value is "2.0".

```js
setup({ EPCISDocumentContext: 'value' }); // the '@context' field of the EPCISDocument that you will create will be
// 'value' by default.
```

### The `eventTimeZoneOffset` property

You have multiple ways to set the `eventTimeZoneOffset` property of an event (e.g, `ObjectEvent`).

- You can set it by using its setter: `event.setEventTimeZoneOffset(2)` or `event.setEventTimeZoneOffset('+02:00')`.

- You can set it by providing an offset when you set the `eventTime` property:
  `event.setEventTime('2005-04-03T20:33:31.116-06:00')` will set the `eventTimeZoneOffset` property to `'-06:00'`.

- If you don't want to set the `eventTimeZoneOffset` property for each event you create, you can provide its default
  value to the setup function.

  ```js
  setup({ eventTimeZoneOffset: '-02:00' });
  ```

  Now, the `eventTimeZoneOffset` will be `'-02:00'` by default. However, once you set the `eventTime` field, the
  `eventTimeZoneOffset` will be overridden (except if `overrideTimeZoneOffset` is set to false when you call
  `setEventTime` function).

### Extensions

For each object, you can add extensions. You have two ways to do it:

- by providing them in the constructor

```js
const readPoint = new ReadPoint({ id: 'myID', 'evt:serial_number': 2839472 });
```

- by adding them later

```js
const readPoint = new ReadPoint({ id: 'myID' });
readPoint.addExtension('evt:serial_number', 2839472);

// you can also remove it
readPoint.removeExtension('evt:serial_number');
```

### List Fields

Whenever using fields that are arrays (e.g, `epcList` in an `ObjectEvent`), the list won't be sent in the request by
default. If you add an element to the list, the list will be sent. If you add some elements, and then remove them, the
list will be sent even if it is empty. You can override this and choose to not send the empty list by clearing the list.

```js
const o = new ObjectEvent();
const object = o.toObject(); // { type: 'ObjectEvent' } -> the epcList isn't sent

const o = new ObjectEvent().addEPC('...');
const object = o.toObject(); //{ type: 'ObjectEvent', epcList: [ '...' ] } -> the epcList is sent

const o = new ObjectEvent().addEPC('...').removeEPC('...');
const object = o.toObject(); //{ type: 'ObjectEvent', epcList: [] } -> the epcList is sent as an empty array
o.clearEPCList();
const object = o.toObject(); //{ type: 'ObjectEvent'} -> the epcList isn't sent anymore
```

### Building the URN

The SDK allows developers to build easily a GS1 URI.

For example, you can easily build a SGTIN URI:

```js
const urn = buildSGTINUri('0614141', '112345', '400'); // returns 'urn:epc:id:sgtin:0614141.112345.400'
```

Similar function are available for `SGLN`, `SSCC`, `GRAI`, `GIAI`, `GSRN`, `GSRNP`, `GDTI`, `CPI`, `SGCN`, `GINC`
, `GSIN`, `ITIP`, `GID`.

Each function are based on the fields defined in the [gs1 official documentation](https://www.gs1.org/sites/default/files/docs/epc/GS1_EPC_TDS_i1_11.pdf).

### Generating a hashed ID for an event

You have the possibility to generate a hashed ID for each event you create. The generation algorithm is a pure
implementation of the one defined [here](https://github.com/RalphTro/epcis-event-hash-generator).

Generating a hashed ID allows developers to uniquely identify an EPCIS event or validate the integrity thereof.

To generate a hashed ID of an event, you can call this function:

```js
event.generateHashID(context, throwError);
```

**This method needs to be called once all your field are set since the hash ID is generated according to all your
fields**

- `context` is an object that has to contain all the contexts used in the event. For example, if you have a custom field
  in your event defined like this : `"example:myField": "Example of a vendor/user extension"`, you will need to define a
  context for `example`. It can be done like this :

```js
obj.generateHashID(
  {
    example: 'http://ns.example.com/epcis/',
  },
  throwError,
);
```

- `throwError` is a boolean. If it is set to true, the generation will throw an error if it encounters a problem
  (e.g a context isn't provided for a field). If it is set to false, the generation won't throw any error.

## Sending a capture event

### Setup function

You can override the default settings by providing them to the setup function. For example, you can set a default
`apiUrl` that will be use for each EPCIS request if no `apiUrl` is provided.

```js
setup({ apiUrl: 'https://api.evrythng.io/v2/epcis' });
```

Here are the settings that you can configure by default:

- `timeout` - max wait time for requests. Default value is `undefined`, which means no timeout.
- `apiUrl` - the url that will be used for requests. Default value is `https://api.evrythng.io/v2/epcis`
- `headers` - the headers of your requests. Default value is `{ 'content-type': 'application/json' }`.
- `documentValidation` - whether the EPCISDocument has to be validated or not before sending it via the Capture
  interface. The default value is `true`.

### The capture function

To send a capture request with your EPCISDocument, you'll need to call the `capture` function. It accepts an
`EPCISDocument` as first parameter. The second parameter is optional, and can be used to override the settings of the request.
For example if you want to override the `timeout` for a request, you can use:

```js
capture(myEPCISDocumentInstance, { timeout: 2000 });
```

You can override all the parameters defined in the previous section in the second parameter.

If the `documentValidation` field of the settings is set to `true`, and the EPCISDocument hasn't a valid syntax, the
function throws an error.

## Contributing

### Build

To build the sdk, you'll need `Node.js` >= `v12.0.0`

First, ensure you did not break anything with: `npm run test`.

Then, run: `npm run build`.

Finally, you can test the built library by first going into the directory: `./example/node_example`, running `npm install` and finally `node example_with_creation_from_setters.js`.

### Deploy

1. Before deploying, make sure to run the linter: `npm run lint`.

2. Make sure to run the unit tests: `npm run test`.
