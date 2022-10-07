"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoCard = void 0;
var pondsocket_1 = require("pondsocket");
/**
 * Sometimes it is useful to have a component that is not a live component
 * These components are not connected to the websocket and are only updated
 * When the live component it is rendered within is updated.
 *
 * This can be useful for code splitting and readability.
 * @constructor
 */
var TodoCard = function (todo) {
    return (0, pondsocket_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <div class=\"flex items-center justify-between px-4 py-2 border-b border-cyan-200\">\n            <div class=\"flex items-center\">\n                <div class=\"flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200\" pond-click=\"toggleComplete\" pond-data-id=\"", "\">\n                    <span class=\"material-symbols-outlined text-cyan-700 cursor-pointer\">", "</span>\n                </div>\n                <div class=\"flex flex-col\">\n                    <div class=\"text-lg font-bold text-cyan-900 ", "\">", "</div>\n                    <div class=\"text-sm text-cyan-700 ", "\"\">", "</div>\n                </div>\n            </div>\n            <div class=\"flex items-center\">\n                <a class=\"flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200 cursor-pointer\" href=\"/todo/editTodo/", "\">\n                    <span class=\"material-symbols-outlined text-cyan-700\">edit</span>\n                </a>\n                <a class=\"flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200 cursor-pointer\" href=\"/todo/deleteTodo/", "\">\n                    <span class=\"material-symbols-outlined text-cyan-700\">delete</span>\n                </a>\n            </div>\n        </div>\n    "], ["\n        <div class=\"flex items-center justify-between px-4 py-2 border-b border-cyan-200\">\n            <div class=\"flex items-center\">\n                <div class=\"flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200\" pond-click=\"toggleComplete\" pond-data-id=\"", "\">\n                    <span class=\"material-symbols-outlined text-cyan-700 cursor-pointer\">", "</span>\n                </div>\n                <div class=\"flex flex-col\">\n                    <div class=\"text-lg font-bold text-cyan-900 ", "\">", "</div>\n                    <div class=\"text-sm text-cyan-700 ", "\"\">", "</div>\n                </div>\n            </div>\n            <div class=\"flex items-center\">\n                <a class=\"flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200 cursor-pointer\" href=\"/todo/editTodo/", "\">\n                    <span class=\"material-symbols-outlined text-cyan-700\">edit</span>\n                </a>\n                <a class=\"flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200 cursor-pointer\" href=\"/todo/deleteTodo/", "\">\n                    <span class=\"material-symbols-outlined text-cyan-700\">delete</span>\n                </a>\n            </div>\n        </div>\n    "])), todo.id, todo.completed ? 'check_box' : 'check_box_outline_blank', todo.completed ? 'line-through' : '', todo.text, todo.completed ? 'line-through' : '', todo.description, todo.id, todo.id);
};
exports.TodoCard = TodoCard;
var templateObject_1;
