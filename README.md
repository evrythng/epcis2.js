# epcis2.js

EPCIS 2.0 Javascript SDK

`epcis2.js` is a Javascript SDK (client-side & Node.js compatible) to facilitate sending data to [GS1 EPCIS 2.0](https://www.gs1.org/standards/epcis) standard compliant repositories. It provides plenty of helper functions to make pushing standard compliant supply chain events as easy as possible.

This project is jointly supported by [EVRYTHNG](https://evrythng.com) and [Zebra](https://www.zebra.com/).

## Introduction to EPCIS and EPCIS 2.0

EPCIS is a GS1 standard for the integration of supply chain information systems. EPCIS is especially valuable to facilitate the seamless exchange of information in supply chains that span multiple actors and organisations. EPCIS 2.0 is the major update to the GS1 EPCIS standard. It was driven by the need to bring EPCIS to the Web.

EPCIS 2.0 brings the following highlights to the table:

- Support for JSON and JSON-LD (vs XML before)
- A REST API (vs SOAP before)
- Support for IoT data, i.e., sensor information

## Installation

### NPM

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

### CDN

Or use a simple script tag to load it from the CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/epcis2.js@2.4.1/dist/epcis2.browser.js"></script>
```

Then use in a browser `script` tag using the `epcis2` global variable:
```html
<script>
  const doc = new epcis2.EPCISDocument();
</script>
```


## Getting started example

Thanks to our SDK, creating an EPCIS 2.0 document is simple. In this example, we show how to create it 
from a JSON-LD object.

```js
const { EPCISDocument } = require('epcis2.js');

// json object based on which we want to create an EPCIS 2.0 document
const object = {
  "@context": ["https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld",{"example": "http://ns.example.com/epcis/"}],
  "id": "https://id.example.org/document1",
  "type": "EPCISDocument",
  "schemaVersion": "2.0",
  "creationDate": "2021-07-11T11:30:47.0Z",
  "epcisBody": {
    "eventList": [
      {
        "eventID": "ni:///sha-256;4217c6a122625b7b9d8ae4f9b89890df35ffa0c501471a096cbfdeebd7207e45?ver=CBV2.0",
        "type": "ObjectEvent",
        "action": "OBSERVE",
        "bizStep": "receiving",
        "disposition": "in_progress",
        "epcList": [ "https://id.gs1.org/01/70614141123451/21/2018" ],
        "eventTime": "2021-04-04T20:33:31.116-06:00",
        "eventTimeZoneOffset": "-06:00",
        "readPoint": {"id": "urn:epc:id:sgln:0012345.11111.400"},
        "bizLocation": {"id": "urn:epc:id:sgln:0012345.11111.0"},
        "bizTransactionList": [
          { "type": "po", "bizTransaction": "http://transaction.acme.com/po/12345678" }
        ],
      }
    ]
  }
};

const epcisDocument = new EPCISDocument(object);  // instantiate an EPCIS 2.0 document constructed from the given object

console.log(epcisDocument.toString());  // print EPCIS 2.0 document as a string

```

Running this script should result in the following EPCIS 2.0 document (printed as a string):

```json
{
 "@context": [
  "https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld",
  {
   "example": "http://ns.example.com/epcis/"
  }
 ],
 "id": "https://id.example.org/document1",
 "type": "EPCISDocument",
 "schemaVersion": "2.0",
 "creationDate": "2021-07-11T11:30:47.0Z",
 "epcisBody": {
  "eventList": [
   {
    "eventID": "ni:///sha-256;4217c6a122625b7b9d8ae4f9b89890df35ffa0c501471a096cbfdeebd7207e45?ver=CBV2.0",
    "type": "ObjectEvent",
    "action": "OBSERVE",
    "bizStep": "receiving",
    "disposition": "in_progress",
    "eventTime": "2021-04-04T20:33:31.116-06:00",
    "eventTimeZoneOffset": "-06:00",
    "readPoint": {
     "id": "urn:epc:id:sgln:0012345.11111.400"
    },
    "bizLocation": {
     "id": "urn:epc:id:sgln:0012345.11111.0"
    },
    "epcList": [
     "https://id.gs1.org/01/70614141123451/21/2018"
    ],
    "bizTransactionList": [
     {
      "type": "po",
      "bizTransaction": "http://transaction.acme.com/po/12345678"
     }
    ]
   }
  ]
 }
}
```

The `epcisDocument` is an instance of the `EPCISDocument` class which means that you have many methods available 
to easily view or modify the EPCIS 2.0 document. You can view all of them in ./src/entity/epcis/EPCISDocument.js.

```js
console.log(epcisDocument.getType()); // EPCISDocument

console.log(epcisDocument.isValid()); // true

console.log(epcisDocument.getEventList());  // check it out yourself :)
```

The latter line should print an instance of the event `ObjectEvent` which is created automatically based on `object`.
This instance has many methods which can be used to view or modify the EPCIS 2.0 event.
You can view all of them in ./src/entity/events/Event.js.

It is also possible to validate EPCIS events without wrapping them in an EPCIS Document.

```js
const objectEvent = new ObjectEvent();
console.log(objectEvent.isValid());
```

## Building complex EPCIS 2.0 JSON documents

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
const {
  ObjectEvent,
  EPCISDocument,
  cbv
} = require('epcis2.js');

const event = new ObjectEvent();
const event2 = new ObjectEvent();
const epcisDocument = new EPCISDocument();

event
  .setAction(cbv.actionTypes.observe)
  .setEventTime('2005-04-03T20:33:31.116-06:00')
  .setEventTimeZoneOffset('-06:00');

event2
  .setAction(cbv.actionTypes.observe)
  .setEventTime('2005-04-03T21:33:31.116-06:00')
  .setEventTimeZoneOffset('-06:00');

epcisDocument.addEvent(event).addEvent(event2);

console.log(epcisDocument.toString());
```

This example would output (as a string):

```json
{
  "type": "EPCISDocument",
  "@context": "https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld",
  "schemaVersion": "2.0",
  "creationDate": "2022-03-15T13:08:27.309Z",
  "epcisBody": {
    "eventList": [
      {
        "eventTimeZoneOffset": "-06:00",
        "eventTime": "2005-04-03T20:33:31.116-06:00",
        "type": "ObjectEvent",
        "action": "OBSERVE"
      },
      {
        "eventTimeZoneOffset": "-06:00",
        "eventTime": "2005-04-03T21:33:31.116-06:00",
        "type": "ObjectEvent",
        "action": "OBSERVE"
      }
    ]
  }
}
```

### CBV attributes autocomplete

The SDK enables you to easily search among all attributes of each Core Business Vocabulary.
In order to do this, you need to import `cbv` as we did in the script above.
Then, by typing `cbv.actionType.` as a parameter of the `setAction` method of the `ObjectEvent` class, you will be displayed
all the attributes associated to this particular CBV.
The list of all CBVs and the respective attributes can be viewed in ./src/cbv/cbv.js.

### Custom vocabulary attributes

The SDK allows you to easily search among all default vtypes as defined in the GS1 Web Vocabulary.
By typing `vtype.`, you will be displayed all the possible vtypes.
This list can be viewed in ./src/cbv/vtype.js.

### Constants

There are constants that you can find in the `constants.js` file.
There is also an constant object containing all the possible field names for an Entity in the `field-names.js` file.
All these constants can be very useful.
Here is an example of field names: 
```js
const { fieldNames } = require('epcis2.js');
console.log(fieldNames.epcisDocument);
  // {
  //   type: 'type',
  //   context: '@context',
  //   schemaVersion: 'schemaVersion',
  //   creationDate: 'creationDate',
  //   epcisHeader: 'epcisHeader',
  //   epcisBody: 'epcisBody',
  //   sender: 'sender',
  //   receiver: 'receiver',
  //   instanceIdentifier: 'instanceIdentifier',
  // }
```

### Instantiating events from EPCIS 2.0 objects

In case you have an EPCIS 2.0 object and want to instantiate an EPCIS 2.0 event based on it, the SDK
allows you to do so independently
of the particular event type. To create such an event, you can do the following:

```js
const { objectToEvent, ObjectEvent, AggregationEvent } = require('epcis2.js');


const object = {
  type: 'ObjectEvent',
  eventID: 'test-sdk-demo:2',
  action: 'OBSERVE',
  bizStep: 'shipping',
  disposition: 'in_transit',
  epcList: ['urn:epc:id:sgtin:0614141.107346.2017', 'urn:epc:id:sgtin:0614141.107346.2018'],
  eventTime: '2005-04-03T20:33:31.116-06:00',
  eventTimeZoneOffset: '-06:00',
  readPoint: {
    id: 'urn:epc:id:sgln:0614141.07346.1234',
  },
  bizTransactionList: [
    {
      type: 'po',
      bizTransaction: 'http://transaction.acme.com/po/12345678',
    },
  ],
};

const event = objectToEvent(object);

console.log(event instanceof ObjectEvent)       // true
console.log(event instanceof AggregationEvent)  // false

console.log(event.toString());
```

The latter should output (as a string):

```json
{
  "type": "ObjectEvent",
  "eventID": "test-sdk-demo:2",
  "action": "OBSERVE",
  "bizStep": "shipping",
  "disposition": "in_transit",
  "eventTime": "2005-04-03T20:33:31.116-06:00",
  "eventTimeZoneOffset": "-06:00",
  "readPoint": {
    "id": "urn:epc:id:sgln:0614141.07346.1234"
  },
  "epcList": [
    "urn:epc:id:sgtin:0614141.107346.2017",
    "urn:epc:id:sgtin:0614141.107346.2018"
  ],
  "bizTransactionList": [
    {
      "type": "po",
      "bizTransaction": "http://transaction.acme.com/po/12345678"
    }
  ]
}
```

The function `objectToEvent` returns an instance of a different class based on the `type` property of the EPCIS 2.0
object you pass to it as a parameter. In the example above, as `type` is set to `ObjectEvent`, the `objectToEvent` function
returns an instance of the `ObjectEvent` class. 
Other event classes available are: `AggregationEvent`, `AssociationEvent`, `TransactionEvent` and `TransformationEvent`.
In case the `type` property does not match any of these event types, `objectToEvent` will default to an instance of the
`ExtendedEvent` class.

### Default values

You can override the default values of EPCISDocument fields by providing them to the setup function.

You can configure the following fields:

- `EPCISDocumentContext` - the '@context' property of an EPCISDocument. By default, the value is
  `https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld`
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

### Building a digital link from an EPC

The SDK allows developers to build easily a GS1 Digital link from an EPC.

```js
const digitalLink = buildDigitalLinkFromEpc('30740086604E20400000007B');
// digitalLink = 'https://dlnkd.tn.gg/01/00008600800013/21/123'
```

You can also provide a domain, as a parameter, to have more control over the output:
```js
const digitalLink = buildDigitalLinkFromEpc('30740086604E20400000007B', {
  digitalLinkDomain: 'https://evrythng.com',
});
// digitalLink = 'https://evrythng.com/01/00008600800013/21/123'
```

Finally, you can provide the domain in the setup function:
```js
setup({
  digitalLinkDomain: 'https://digimarc.com',
});
const digitalLink = buildDigitalLinkFromEpc('30740086604E20400000007B');
// digitalLink = 'https://digimarc.com/01/00008600800013/21/123'
```

This feature is still experimental, please submit an [issue](https://github.com/evrythng/epcis2.js/issues) if you notice an unexpected behaviour.

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
- `checkExtensions` - if it is set to true the extension of the EPCISDocument will be checked against the EPCIS Document context.
  (e.g check if all prefixes are defined in the context)
  Otherwise, the extensions check will be ignored. By default the value is set to `false`.

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

You can test the built library by first going into the directory: `./example/node_example` and running `npm install`.
Finally run `node example_with_creation_from_setters.js`.

### Deploy

1. Before deploying, make sure to run the linter: `npm run lint`.

2. Make sure to run the unit tests: `npm run test`.

### Versioning

When contributing, please make sure to update the version of the library in the `package.json` file. You'll also need to
update the CDN links in the `README` as well as the `example/web-example/index.html`'s CDN link.
