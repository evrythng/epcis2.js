# epcis2.js
EPCIS 2.0 Javascript SDK

The goal of this SDK is to easily create and send a customizable EPCISDocument.

### The setup function

You can override the default settings by providing them to the setup function. For example, you can set a default 
endpoint that will be use for each EPCIS request if none endpoint is provided.

```js
setup({endpoint: 'example.com'});
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

### The extensions

For each object, you can add extensions. You have two ways to do it:
- by providing them in the constructor
```js
let readPoint = new ReadPoint({'id': 'myID', 'extension': 'value'});
```
- by adding them later
```js
let readPoint = new ReadPoint({'id': 'myID'});
readPoint.addExtension('extension', 'value')

// you can also remove it
readPoint.removeExtension('extension')
```

### The lists

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

## Build and deploy

### Build

To build the sdk, you need node >= `v12.0.0`

You need to run: `npm run build`.

Then, you can test the library with: `node example/index.js`

### Deploy

Before deploying, make sure to run the linter:
`npm run lint`

And make sure to run the unit tests:
`npm run test`
