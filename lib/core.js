"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    constructor() {
        this._events = {};
    }
    on(name, handler) {
        this._events[name] = this._events[name] ? [...this._events[name], handler] : [handler];
        return this;
    }
    once(name, handler) {
        const wrapperHandler = (...args) => {
            const index = this._events[name].indexOf(wrapperHandler);
            this._events[name].splice(index, 1);
            handler.call(null, ...args);
        };
        this._events[name] = this._events[name] ? [...this._events[name], wrapperHandler] : [wrapperHandler];
        return this;
    }
    off(name, handler) {
        if (name in this._events || this._events[name].includes(handler)) {
            const index = this._events[name].indexOf(handler);
            this._events[name].splice(index, 1);
        }
        return this;
    }
    emit(name, data) {
        if (!(name in this._events))
            return;
        const events = this._events[name];
        events.forEach(fn => fn.call(null, data));
    }
}
exports.Event = Event;
//# sourceMappingURL=core.js.map