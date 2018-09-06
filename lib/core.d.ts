export interface EventInterface<TData = object> {
    on: On<TData>;
    once: Once<TData>;
    off: Off<TData>;
    emit: Emit<TData>;
}
export interface Handler<TData> {
    (data: TData): void;
}
export interface On<TData> {
    (name: string, handler: Handler<TData>): EventInterface<TData>;
}
export interface Once<TData> extends On<TData> {
}
export interface Off<TData> extends On<TData> {
}
export interface Emit<TData> {
    (name: string, data: TData): void;
}
export declare class Event<TData> implements EventInterface<TData> {
    private _events;
    on(name: string, handler: Handler<TData>): EventInterface<TData>;
    once(name: string, handler: Handler<TData>): EventInterface<TData>;
    off(name: string, handler: Handler<TData>): EventInterface<TData>;
    emit(name: string, data: TData): void;
}
