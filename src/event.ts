export type On = (name: string, handler: Function) => EventInterface;
export type Off = On;
export type Emit = (name: string, ...args: any[]) => EventInterface;

export interface EventInterface {
  on: On;
  off: Off;
  emit: Emit;
}

export default class Event implements EventInterface {
  private _events: Object = {};

  public on(name: string, handler: Function): EventInterface {
    this._events[name] = this._events[name] ? [...this._events[name], handler] : [handler];
    return this;
  }

  public once(name: string, handler: Function): EventInterface {
    const wrapperHandler = (...args) => {
      const index = this._events[name].indexOf(wrapperHandler);
      this._events[name].splice(index, 1);
      handler.call(null, ...args);
    };

    this._events[name] = this._events[name] ? [...this._events[name], wrapperHandler] : [wrapperHandler];
    return this;
  }

  public off(name: string, handler: Function): EventInterface {
    if (name in this._events || this._events[name].includes(handler)) {
      const index = this._events[name].indexOf(handler);
      this._events[name].splice(index, 1);
    }
    return this;
  }

  public emit(name: string, ...args: any[]): EventInterface {
    if (!(name in this._events)) return this;

    const events = this._events[name];
    events.forEach(fn => fn.call(null, ...args));
    return this;
  }
}
