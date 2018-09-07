"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = (function () {
    function Event() {
        this._events = {};
    }
    Event.prototype.on = function (name, handler) {
        this._events[name] = this._events[name] ? this._events[name].concat([handler]) : [handler];
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
        this._events[name] = this._events[name] ? this._events[name].concat([wrapperHandler]) : [wrapperHandler];
        return this;
    };
    Event.prototype.off = function (name, handler) {
        if (name in this._events || this._events[name].includes(handler)) {
            var index = this._events[name].indexOf(handler);
            this._events[name].splice(index, 1);
        }
        return this;
    };
    Event.prototype.emit = function (name, data) {
        if (!(name in this._events))
            return;
        var events = this._events[name];
        events.forEach(function (fn) { return fn.call(null, data); });
    };
    return Event;
}());
exports.Event = Event;
