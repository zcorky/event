export interface EventInterface<T = object> {
    on: On<T>;
    once: Once<T>;
    off: Off<T>;
    emit: Emit<T>;
}
export interface Handler<T> {
    (data: T): void;
}
export interface On<T> {
    (name: string, handler: Handler<T>): EventInterface<T>;
}
export interface Once<T> extends On<T> {
}
export interface Off<T> extends On<T> {
}
export interface Emit<T> {
    (name: string, data: T): void;
}
export interface Events<T> {
    [k: string]: Handler<T>[];
}
export declare class Event<TData> implements EventInterface<TData> {
    private _events;
    on(name: string, handler: Handler<TData>): EventInterface<TData>;
    once(name: string, handler: Handler<TData>): EventInterface<TData>;
    off(name: string, handler: Handler<TData>): EventInterface<TData>;
    emit(name: string, data: TData): void;
    get(): {
        [key: string]: Handler<TData>[];
    };
    get(name: string): Handler<TData>[] | void;
}
export default Event;
