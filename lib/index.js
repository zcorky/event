"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = (function () {
    function Event() {
        this._events = {};
    }
    Event.prototype.on = function (name, handler) {
        if (!this._events[name]) {
            this._events[name] = [];
        }
        this._events[name].push(handler);
        return this;
    };
    Event.prototype.once = function (name, handler) {
        var _this = this;
        var wrapperHandler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var index = _this._events[name].indexOf(wrapperHandler);
            _this._events[name].splice(index, 1);
            handler.call.apply(handler, [null].concat(args));
        };
        wrapperHandler._origin = handler;
        if (!this._events[name]) {
            this._events[name] = [];
        }
        this._events[name].push(wrapperHandler);
        if (!this._events[name]._once)
            this._events[name]._once = true;
        return this;
    };
    Event.prototype.off = function (name, handler) {
        if (name in this._events) {
            if (this._events[name].indexOf(handler) !== -1) {
                var index = this._events[name].indexOf(handler);
                this._events[name].splice(index, 1);
                return this;
            }
            if (this._events[name]._once && this._events[name].some(function (h) { return h._origin === handler; })) {
                var index = this._events[name].findIndex(function (h) { return h._origin === handler; });
                this._events[name].splice(index, 1);
                return this;
            }
        }
        return this;
    };
    Event.prototype.emit = function (name, data) {
        if (!(name in this._events))
            return;
        var events = this._events[name];
        events.forEach(function (fn) { return fn.call(null, data); });
    };
    Event.prototype.get = function (name) {
        if (typeof name === 'undefined') {
            return this._events;
        }
        return this._events[name];
    };
    return Event;
}());
exports.Event = Event;
exports.default = Event;
