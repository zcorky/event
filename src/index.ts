export interface EventInterface<TData = object> {
  on: On<TData>;
  once: Once<TData>;
  off: Off<TData>;
  emit: Emit<TData>;
}

// export type Handler = <TData>(data: TData) => void
export interface Handler<TData> {
  (data: TData): void
}

export interface On<TData> {
  (name: string, handler: Handler<TData>): EventInterface<TData>
}

export interface Once<TData> extends On<TData> {}

export interface Off<TData> extends On<TData> {}

export interface Emit<TData> {
  (name: string, data: TData): void
}

// export interface GetEvent<TData> {
//   (): { [key: string]: Handler<TData>[]; }
//   (key: string): Handler<TData>[] | void;
//   (key?: string): { [key: string]: Handler<TData>[]; } | Handler<TData>[] | void;
// }

export class Event<TData> implements EventInterface<TData> {
  private _events: Object = {};

  public on(name: string, handler: Handler<TData>): EventInterface<TData> {
    this._events[name] = this._events[name] ? [...this._events[name], handler] : [handler];
    return this;
  }

  public once(name: string, handler: Handler<TData>): EventInterface<TData> {
    const wrapperHandler = (...args) => {
      const index = this._events[name].indexOf(wrapperHandler);
      this._events[name].splice(index, 1);
      handler.call(null, ...args);
    };

    (wrapperHandler as any)._origin = handler;

    this._events[name] = this._events[name] ? [...this._events[name], wrapperHandler] : [wrapperHandler];
    this._events[name]._once = true; // tag once event
    return this;
  }

  public off(name: string, handler: Handler<TData>): EventInterface<TData> {
    if (name in this._events) {
      if (this._events[name].indexOf(handler) !== -1) {
        const index = this._events[name].indexOf(handler);
        this._events[name].splice(index, 1);
        return this;
      }

      if (this._events[name]._once && this._events[name].some(h => h._origin === handler)) {
        const index = this._events[name].findIndex(h => h._origin === handler);
        this._events[name].splice(index, 1);
        return this;
      }
    }

    return this;
  }

  public emit(name: string, data: TData): void {
    if (!(name in this._events)) return ;

    const events = this._events[name];
    events.forEach(fn => fn.call(null, data));
  }

  public get(): { [key: string]: Handler<TData>[]; }
  public get(name: string): Handler<TData>[] | void
  public get(name?: string): any  {
    if (typeof name === 'undefined') {
      return this._events;
    }

    return this._events[name];
  }
}
