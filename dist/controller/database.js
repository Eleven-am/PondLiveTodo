"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manager = exports.notificationContext = exports.useUpsertHook = exports.homeContext = exports.searchContext = exports.reminderDatabase = exports.todoDatabase = exports.remindersContext = exports.todosContext = exports.getDatabase = void 0;
var pondlive_1 = require("@eleven-am/pondlive");
var testTodo = {
    id: 1,
    text: 'Test Todo',
    description: 'This is a test todo, it is not completed, and it is not important',
    completed: false,
    date: new Date()
};
var testTodo2 = {
    id: 2,
    text: 'Test Todo 2',
    description: 'This is a test todo, it is not completed, and it is not important',
    completed: false,
    date: new Date()
};
var todos = [testTodo, testTodo2];
var testReminder = {
    id: 1,
    text: 'Test Reminder',
    description: 'This is a test reminder, it is not completed, and it is not important',
    elapsed: false,
    completed: false,
    date: new Date('2021-10-07T00:00:00.000Z'),
    countDown: 0
};
var testReminder2 = {
    id: 2,
    text: 'Test Reminder 2',
    description: 'This is a test reminder, it is not completed, and it is not important',
    elapsed: false,
    completed: false,
    date: new Date('2022-10-07T00:00:00.000Z'),
    countDown: 0
};
var reminders = [testReminder, testReminder2];
var getDatabase = function (context) {
    var remove = function (event, id) {
        context.setState(event, function (db) { return db.filter(function (item) { return item.id !== id; }); });
    };
    var upsert = function (event, item) {
        context.setState(event, function (data) {
            var index = data.findIndex(function (i) { return i.id === item.id; });
            if (index === -1) {
                item.id = data.length + 1;
                return __spreadArray(__spreadArray([], __read(data), false), [item], false);
            }
            data[index] = item;
            return data;
        });
    };
    var query = function (event, query) { return context.getState(event)
        .filter(function (item) { return item.text.toLowerCase()
        .includes(query.toLowerCase()); }); };
    var get = function (event, id) { return context.getState(event)
        .find(function (item) { return item.id === id; }); };
    var getAll = function (event) { return context.getState(event); };
    return {
        remove: remove,
        upsert: upsert,
        get: get,
        getAll: getAll,
        query: query
    };
};
exports.getDatabase = getDatabase;
exports.todosContext = (0, pondlive_1.createClientContext)(todos);
exports.remindersContext = (0, pondlive_1.createClientContext)(reminders);
exports.todoDatabase = (0, exports.getDatabase)(exports.todosContext);
exports.reminderDatabase = (0, exports.getDatabase)(exports.remindersContext);
exports.searchContext = (0, pondlive_1.createClientContext)({ query: '' });
exports.homeContext = (0, pondlive_1.createClientContext)({ active: null });
var defaultObject = {
    id: 0,
    text: '',
    description: '',
    completed: false,
    date: new Date()
};
var upsertContext = (0, pondlive_1.createClientContext)(defaultObject);
var useUpsertHook = function (ctx, database, path, onAdd) {
    var _a = __read((0, pondlive_1.useServerInfo)(ctx, upsertContext), 2), obj = _a[0], setObjOnServer = _a[1];
    var _b = __read((0, pondlive_1.useAction)(ctx, undefined, {
        closeModal: function (event) { return event.navigateTo("/".concat(path.toLowerCase())); },
        upsert: function (event) {
            var _a = upsertContext.getState(event), id = _a.id, text = _a.text, description = _a.description, date = _a.date;
            if (!text || !description) {
                return 'Please fill out all fields';
            }
            var dataObject = {
                id: id,
                text: text,
                description: description,
                date: date,
                completed: false,
            };
            database.upsert(event, onAdd(dataObject));
            event.navigateTo("/".concat(path.toLowerCase()));
        }
    }), 3), error = _b[0], action = _b[1], setActionOnServer = _b[2];
    var _c = __read((0, pondlive_1.useAction)(ctx, undefined, {
        setDate: function (event) { var _a; return setObjOnServer(event, { date: new Date((_a = event.data.value) !== null && _a !== void 0 ? _a : '') }); },
        setText: function (event) { var _a; return setObjOnServer(event, { text: (_a = event.data.value) !== null && _a !== void 0 ? _a : '' }); },
        setDescription: function (event) { var _a; return setObjOnServer(event, { description: (_a = event.data.value) !== null && _a !== void 0 ? _a : '' }); },
    }), 2), __ = _c[0], objectAction = _c[1];
    var capitaliseFirstLetter = function (string) { return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); };
    ctx.onMount(function (req, res) {
        var reqId = req.params.id;
        if (reqId) {
            var dataObject = database.get(req, Number(reqId));
            if (dataObject) {
                setObjOnServer(req, dataObject);
                res.setPageTitle("Edit ".concat(capitaliseFirstLetter(path), ": ").concat(dataObject.text));
                return;
            }
            setActionOnServer(req, "No ".concat(capitaliseFirstLetter(path), " with that id found"));
        }
    });
    ctx.onUnmount(function (event) { return setObjOnServer(event, defaultObject); });
    return {
        description: obj.description,
        dueDate: obj.date,
        text: obj.text,
        objectAction: objectAction,
        id: obj.id,
        error: error,
        action: action
    };
};
exports.useUpsertHook = useUpsertHook;
exports.notificationContext = (0, pondlive_1.createClientContext)({ id: null, data: [] });
function notification() {
    var getNotifications = function (event) { return exports.remindersContext.getState(event)
        .filter(function (item) { return !item.completed && !item.elapsed; })
        .filter(function (item) { return item.date.getTime() - Date.now() < 0; })
        .sort(function (a, b) { return a.date.getTime() - b.date.getTime(); })
        .map(function (item) { return (__assign(__assign({}, item), { elapsed: true, text: "".concat(item.text, " is due") })); }); };
    var monitor = function (event) {
        var interval = setInterval(function () {
            var data = getNotifications(event);
            exports.notificationContext.assign(event, { data: data });
        }, 100);
        exports.notificationContext.assign(event, {
            id: interval,
            data: getNotifications(event)
        });
    };
    var clear = function (event) {
        var id = exports.notificationContext.getState(event).id;
        if (id) {
            clearInterval(id);
        }
    };
    return {
        monitor: monitor,
        clear: clear,
    };
}
exports.manager = notification();
