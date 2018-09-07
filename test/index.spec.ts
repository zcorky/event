import { expect } from 'chai';

import { Event, Handler } from '../src';

describe('Event', () => {
  interface Data {
    type: string;
    payload: {
      name: string;
    };
  };

  const eventBus = new Event<Data>();

  const data = {
    type: 'type',
    payload: {
      name: 'payload',
    },
  };

  const onHandler: Handler<Data> = d => {
    expect(d.type).to.equal('type');
    expect(d.payload.name).to.equal('payload');
  }

  // beforeEach(() => {
  //   val = 0;
  // });

  it('on', () => {
    eventBus.on('save', onHandler);

    expect(eventBus.get()['save'].length).to.equal(1);
  });

  it('once', () => {
    eventBus.once('save2', onHandler);
    eventBus.once('save3', onHandler);

    expect(eventBus.get()['save2'].length).to.equal(1);
    expect(eventBus.get()['save3'].length).to.equal(1);
  });

  it('emit', () => {
    eventBus.emit('save', data);
    eventBus.emit('save2', data);

    expect(eventBus.get()['save'].length).to.equal(1);
    expect(eventBus.get()['save2'].length).to.equal(0);
    expect(eventBus.get()['save3'].length).to.equal(1);
  })

  it('off', () => {
    eventBus.off('save', onHandler);
    eventBus.off('save3', onHandler); // once event handle have be wrapper, should do more if need off.
    eventBus.off('save4', onHandler);

    expect(eventBus.get()['save'].length).to.equal(0);
    expect(eventBus.get()['save2'].length).to.equal(0);
    expect(eventBus.get()['save3'].length).to.equal(0);
  });

  it('get', () => {
    expect((eventBus.get('save') as Handler<Data>[]).length).to.equal(0);
    expect((eventBus.get('save2') as Handler<Data>[]).length).to.equal(0);
    expect((eventBus.get('save3') as Handler<Data>[]).length).to.equal(0);
    expect(eventBus.get('save4')).to.equal(undefined);
  })
})
