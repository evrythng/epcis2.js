# epcis2.js
EPCIS 2.0 Javascript SDK

The goal of this SDK is to easily create and send a customizable EPCISDocument.

//todo: add what EPCIS 2.0 is and why this sdk makes life easier, the use cases, ...

## Building an EPCIS document

### Adding events to an EPCIS document
To add an event to an EPCIS document, you can do like this: 
```js
const event = new ObjectEvent();
const event2 = new ObjectEvent();
const epcisDocument = new EPCISDocument();

event
  .setAction('OBSERVE')
  .setEventTime('2005-04-03T20:33:31.116-06:00')
  .setEventTimeZoneOffset('-06:00')

event2
  .setAction('OBSERVE')
  .setEventTime('2005-04-03T21:33:31.116-06:00')
  .setEventTimeZoneOffset('-06:00')

epcisDocument
  .addEvent(event)
  .addEvent(event2);

console.log(epcisDocument.toString());
```

This example would output:

```json
{
   "isA":"EPCISDocument",
   "@context":"https://gs1.github.io/EPCIS/epcis-context.jsonld",
   "schemaVersion":2,
   "epcisBody":{
      "eventList":[
         {
            "isA":"ObjectEvent",
            "action":"OBSERVE",
            "eventTime":"2005-04-03T20:33:31.116-06:00",
            "eventTimeZoneOffset":"-06:00"
         },
         {
            "isA":"ObjectEvent",
            "action":"OBSERVE",
            "eventTime":"2005-04-03T21:33:31.116-06:00",
            "eventTimeZoneOffset":"-06:00"
         }
      ]
   }
}
```

If you provide a single element, by default, it will be in the `eventList` field.

```js
const epcisDocument = new EPCISDocument();
const event = new ObjectEvent();

event
  .setAction('OBSERVE')
  .setEventTime('2005-04-03T20:33:31.116-06:00')
  .setEventTimeZoneOffset('-06:00')

epcisDocument
  .addEvent(event);

console.log(epcisDocument.toString());
```

This example would output:

```json
{
   "isA":"EPCISDocument",
   "@context":"https://gs1.github.io/EPCIS/epcis-context.jsonld",
   "schemaVersion":2,
   "epcisBody":{
      "eventList":[
         {
            "isA":"ObjectEvent",
            "action":"OBSERVE",
            "eventTime":"2005-04-03T20:33:31.116-06:00",
            "eventTimeZoneOffset":"-06:00"
         }
      ]
   }
}
```

However, you can override this default parameter like this:

```js
// to override it globally (it needs to be called before the creation of the EPCISDocument)
setup({useEventListByDefault: false});

const epcisDocument = new EPCISDocument();
const event = new ObjectEvent();


// alternatively, you can override it locally
epcisDocument.setUseEventListByDefault(false);

event
  .setAction('OBSERVE')
  .setEventTime('2005-04-03T20:33:31.116-06:00')
  .setEventTimeZoneOffset('-06:00')

epcisDocument
  .addEvent(event);

console.log(epcisDocument.toString());
```

This example would output:

```json
{
   "isA":"EPCISDocument",
   "@context":"https://gs1.github.io/EPCIS/epcis-context.jsonld",
   "schemaVersion":2,
   "epcisBody":{
      "event":{
         "isA":"ObjectEvent",
         "action":"OBSERVE",
         "eventTime":"2005-04-03T20:33:31.116-06:00",
         "eventTimeZoneOffset":"-06:00"
      }
   }
}
```

### The default values

You can override the default values of EPCISDocument fields by providing them to the setup function.

Here are the fields that you can configure by default:
- `EPCISDocumentContext` - the '@context' property of an EPCIS document. By default, the value is 
`https://gs1.github.io/EPCIS/epcis-context.jsonld`
- `EPCISDocumentSchemaVersion` - the 'schemaVersion' property of an EPCIS document. By default, the value is 2.

```js
setup({ EPCISDocumentContext: 'value' }); // the '@context' field of the EPCISDocument that you will create will be 
// 'value' by default.
```

### The eventTimeZoneOffset property

You have multiple ways to set the `eventTimeZoneOffset` property of an event (e.g an ObjectEvent).

- You can set it with its setter: `event.setEventTimeZoneOffset(2)` or `event.setEventTimeZoneOffset('+02:00')`.

- You can set it by providing an offset when you set the `eventTime` property:
`event.setEventTime('2005-04-03T20:33:31.116-06:00')` will set the `eventTimeZoneOffset` property to `'-06:00'`.

- If you don't want to set the `eventTimeZoneOffset` property for each event you create, you can provide its default 
value to the setup function.

    ```js
    setup({eventTimeZoneOffset: '-02:00'});
    ```
    
    Now, the `eventTimeZoneOffset` will be `'-02:00'` by default.

### Extensions

For each object, you can add extensions. You have two ways to do it:
- by providing them in the constructor
```js
const readPoint = new ReadPoint({'id': 'myID', 'evt:serial_number': 2839472});
```
- by adding them later
```js
const readPoint = new ReadPoint({'id': 'myID'});
readPoint.addExtension('evt:serial_number', 2839472)

// you can also remove it
readPoint.removeExtension('evt:serial_number')
```

### List Fields

Each time you have a list object (e.g epcList in an ObjectEvent), the list won't be sent in the request by default.
If you add an element to the list, the list will be sent. If you add some elements, and then remove then, the list will
be sent even if it is empty. You can override this and choose to not send the empty list by clearing the list. 

```js
const o = new ObjectEvent();
const object = o.toObject(); // { isA: 'ObjectEvent' } -> the epcList isn't sent

const o = new ObjectEvent().addEPC('...');
const object = o.toObject(); //{ isA: 'ObjectEvent', epcList: [ '...' ] } -> the epcList is sent

const o = new ObjectEvent().addEPC('...').removeEPC('...');
const object = o.toObject(); //{ isA: 'ObjectEvent', epcList: [] } -> the epcList is sent as an empty array
o.clearEPCList();
const object = o.toObject(); //{ isA: 'ObjectEvent'} -> the epcList isn't sent anymore
```

## Sending a capture event

### The setup function

You can override the default settings by providing them to the setup function. For example, you can set a default 
`apiUrl` that will be use for each EPCIS request if none `apiUrl` is provided.

```js
setup({ apiUrl: 'https://api.evrythng.io/v2/epcis' });
```

Here are the settings that you can configure by default:
- `timeout` - max wait time on requests. Its default value is `undefined`, which means no timeout.
- `apiUrl` - the url that will be used for requests. Its default value is `https://api.evrythng.io/v2/epcis`
- `headers` - the headers of your requests. Its default value is `{ 'content-type': 'application/json' }`.
- `documentValidation` - whether the EPCISDocument has to be validated or not before sending it via the capture 
interface. Its default value is `true`.

### The capture function

To send a capture request with your EPCISDocument, you need to call the `capture` function. It accepts an 
`EPCISDocument` as first parameter. The second parameter is optional, you can override the settings of the request with 
it. For example, if for this particular request, you want to override the `timeout`, you can do this:

```js
capture(myEPCISDocumentInstance, { 'timeout': 2000 });
```

You can override all the parameters defined in the previous section in the second parameter.

If the `documentValidation` field of the settings is set to true, and the EPCISDocument hasn't a valid syntax, the 
function throws an error.

## Build and deploy

### Build

To build the sdk, you need node >= `v12.0.0`

First, you need to test if you didn't break the functionalities of the library with: `npm run test`.

Then, you need to run: `npm run build`.

Finally, you can test the built library with: `node example/index.js`

### Deploy

1. Before deploying, make sure to run the linter: `npm run lint`.

2. Make sure to run the unit tests: `npm run test`.
