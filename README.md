# epcis2.js
EPCIS 2.0 Javascript SDK

## The setup function

You can override the default settings by providing them to the setup function. For example, you can set a default 
endpoint that will be use for each EPCIS request if none endpoint is provided.

```js
setup({endpoint: 'example.com'});
```

## The eventTimeZoneOffset property

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

## Build and deploy

To build the sdk, you need node >= `v12.0.0`

You need to run: `npm run build`.

Then, you can test the library with: `node example/index.js`
