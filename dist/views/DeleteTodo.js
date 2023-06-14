"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTodoModal = void 0;
var database_1 = require("../controller/database");
var pondlive_1 = require("@eleven-am/pondlive");
var DeleteTodoModal = function (ctx) {
    var _a = __read((0, pondlive_1.useState)(ctx, 0), 3), id = _a[0], __ = _a[1], setIdOnServer = _a[2];
    ctx.onMount(function (req, res) {
        console.log('mounted', req.url, res, setIdOnServer);
    });
    var _b = __read((0, pondlive_1.useAction)(ctx, undefined, {
        closeModal: function (event) { return event.navigateTo('/todo'); },
        deleteTodo: function (event) { return database_1.todoDatabase.remove(event, id); },
    }), 2), _ = _b[0], action = _b[1];
    return (0, pondlive_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <div class=\"flex flex-col items-center justify-center w-full h-full absolute left-0 top-0 bg-cyan-900 bg-opacity-70\">\n            <div class=\"flex flex-col items-center justify-center w-1/2 h-1/2 bg-cyan-100 rounded-lg\">\n                <div class=\"flex items-center justify-between w-full px-4 py-2 border-b border-cyan-200\">\n                    <div class=\"text-lg font-bold text-cyan-900\">Delete Todo</div>\n                    <div class=\"flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200\"\n                         pond-click=\"", "\">\n                        <span class=\"material-symbols-outlined text-cyan-700 cursor-pointer\">close</span>\n                    </div>\n                </div>\n                <div class=\"flex flex-col items-center justify-center w-full px-4 py-2\">\n                    <div class=\"flex items-center justify-center w-full mt-4\">\n                        <button class=\"px-4 py-2 text-sm font-bold text-cyan-100 bg-cyan-500 rounded-lg\"\n                                pond-click=\"", "\">Delete Todo\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "], ["\n        <div class=\"flex flex-col items-center justify-center w-full h-full absolute left-0 top-0 bg-cyan-900 bg-opacity-70\">\n            <div class=\"flex flex-col items-center justify-center w-1/2 h-1/2 bg-cyan-100 rounded-lg\">\n                <div class=\"flex items-center justify-between w-full px-4 py-2 border-b border-cyan-200\">\n                    <div class=\"text-lg font-bold text-cyan-900\">Delete Todo</div>\n                    <div class=\"flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200\"\n                         pond-click=\"", "\">\n                        <span class=\"material-symbols-outlined text-cyan-700 cursor-pointer\">close</span>\n                    </div>\n                </div>\n                <div class=\"flex flex-col items-center justify-center w-full px-4 py-2\">\n                    <div class=\"flex items-center justify-center w-full mt-4\">\n                        <button class=\"px-4 py-2 text-sm font-bold text-cyan-100 bg-cyan-500 rounded-lg\"\n                                pond-click=\"", "\">Delete Todo\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "])), action('closeModal'), action('deleteTodo'));
};
exports.DeleteTodoModal = DeleteTodoModal;
var templateObject_1;
