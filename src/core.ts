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

    this._events[name] = this._events[name] ? [...this._events[name], wrapperHandler] : [wrapperHandler];
    return this;
  }

  public off(name: string, handler: Handler<TData>): EventInterface<TData> {
    if (name in this._events || this._events[name].includes(handler)) {
      const index = this._events[name].indexOf(handler);
      this._events[name].splice(index, 1);
    }
    return this;
  }

  public emit(name: string, data: TData): void {
    if (!(name in this._events)) return ;

    const events = this._events[name];
    events.forEach(fn => fn.call(null, data));
  }
}
