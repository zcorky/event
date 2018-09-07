# event [![Build Status](https://travis-ci.org/zcorky/event.svg?branch=master)](https://travis-ci.org/zcorky/event)

> A simple event lib

## Install

```
$ npm install @zcorky/event
```


## Usage

```js
const Event = require('@zcorky/event').Event;
// import { Event } from '@zcorky/event'; // ts or es6

const eventBus = new Event();
const handler = data => {
	// save data
};

// register an event
event.on('save', handler);

// trigger an event
event.emit('save', { type: 'image', payload: { id: 111, list: [] } });

// unregister an event
event.off('save', handler);

// register an once event
event.once('save/once', handler);
```

## License

MIT © [Moeover](https://moeover.com)