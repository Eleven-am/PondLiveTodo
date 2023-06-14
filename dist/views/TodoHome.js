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
exports.TodoHome = void 0;
var pondlive_1 = require("@eleven-am/pondlive");
var database_1 = require("../controller/database");
var UpdateTodo_1 = require("./UpdateTodo");
var TodoCard_1 = require("./TodoCard");
var DeleteTodo_1 = require("./DeleteTodo");
var TodoHome = function (ctx) {
    var _b = __read((0, pondlive_1.useState)(ctx, []), 3), todos = _b[0], _ = _b[1], setTodosOnServer = _b[2];
    var _c = __read((0, pondlive_1.useServerInfo)(ctx, database_1.searchContext), 3), _y = _c[0], _yy = _c[1], effect = _c[2];
    var _d = __read((0, pondlive_1.useServerInfo)(ctx, database_1.todosContext), 3), _x = _d[0], _xx = _d[1], todosEffect = _d[2];
    var routes = (0, pondlive_1.useRouter)([{
            path: '/addTodo',
            component: UpdateTodo_1.UpdateTodoModal
        }, {
            path: '/deleteTodo/:id',
            component: DeleteTodo_1.DeleteTodoModal
        }, {
            path: '/editTodo/:id',
            component: UpdateTodo_1.UpdateTodoModal
        }]);
    ctx.onMount(function (req, res) {
        res.setPageTitle('PondLive Todo');
        setTodosOnServer(req, database_1.todoDatabase.getAll(req));
        database_1.homeContext.assign(req, {
            active: false,
        });
    });
    ctx.onUnmount(function (event) {
        database_1.homeContext.assign(event, {
            active: null,
        });
    });
    var _e = __read((0, pondlive_1.useAction)(ctx, undefined, {
        toggleComplete: function (event) {
            var todo = database_1.todoDatabase.get(event, Number(event.data.dataId));
            if (todo) {
                todo.completed = !todo.completed;
                database_1.todoDatabase.upsert(event, todo);
                setTodosOnServer(event, database_1.todoDatabase.getAll(event));
            }
        }
    }), 2), _a = _e[0], action = _e[1];
    effect(function (data, event) {
        if (data.query !== '') {
            var todos_1 = database_1.todoDatabase.query(event, data.query);
            setTodosOnServer(event, todos_1);
        }
        else {
            setTodosOnServer(event, database_1.todoDatabase.getAll(event));
        }
    });
    todosEffect(function (change, event) {
        setTodosOnServer(event, change);
    });
    return (0, pondlive_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <div class=\"flex flex-col mt-6\">\n            ", "\n        </div>\n        ", "\n    "], ["\n        <div class=\"flex flex-col mt-6\">\n            ", "\n        </div>\n        ", "\n    "])), todos.map(function (todo) { return (0, TodoCard_1.TodoCard)(todo, action('toggleComplete')); }), routes(ctx));
};
exports.TodoHome = TodoHome;
var templateObject_1;
