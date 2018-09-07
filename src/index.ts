export interface EventInterface<T = object> {
  on: On<T>;
  once: Once<T>;
  off: Off<T>;
  emit: Emit<T>;
}

// export type Handler = <TData>(data: TData) => void
export interface Handler<T> {
  (data: T): void
}

export interface On<T> {
  (name: string, handler: Handler<T>): EventInterface<T>
}

export interface Once<T> extends On<T> {}

export interface Off<T> extends On<T> {}

export interface Emit<T> {
  (name: string, data: T): void
}

export interface Events<T> {
  [k: string]: Handler<T>[];
}

// export interface GetEvent<TData> {
//   (): { [key: string]: Handler<TData>[]; }
//   (key: string): Handler<TData>[] | void;
//   (key?: string): { [key: string]: Handler<TData>[]; } | Handler<TData>[] | void;
// }

export class Event<TData> implements EventInterface<TData> {
  private _events: Events<TData> = {};

  public on(name: string, handler: Handler<TData>): EventInterface<TData> {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    this._events[name].push(handler);

    return this;
  }

  public once(name: string, handler: Handler<TData>): EventInterface<TData> {
    const wrapperHandler = (...args) => {
      const index = this._events[name].indexOf(wrapperHandler);
      this._events[name].splice(index, 1);
      handler.call(null, ...args);
    };

    (wrapperHandler as any)._origin = handler;

    if (!this._events[name]) {
      this._events[name] = [];
    }
    this._events[name].push(wrapperHandler);

    if (!(this._events[name] as any)._once) (this._events[name] as any)._once = true; // tag once event
    return this;
  }

  public off(name: string, handler: Handler<TData>): EventInterface<TData> {
    if (name in this._events) {
      if (this._events[name].indexOf(handler) !== -1) {
        const index = this._events[name].indexOf(handler);
        this._events[name].splice(index, 1);
        return this;
      }

      if ((this._events[name] as any)._once && this._events[name].some(h => (h as any)._origin === handler)) {
        const index = this._events[name].findIndex(h => (h as any)._origin === handler);
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

export default Event;
