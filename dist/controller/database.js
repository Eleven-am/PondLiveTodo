"use strict";
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
exports.elapsedConsumer = exports.elapsedProvider = exports.ReminderManger = exports.database = void 0;
var live_1 = require("pondsocket/live");
/**
 * This is the context manager for the elapsed reminders
 * The create context function returns a tuple of the consumer and provider
 * The first is the consumer that can be used to modify the state of the context from anywhere
 * The second is the provider that makes the context available to the components
 * @type [ContextConsumer<ContextType>, ContextProvider];
 *
 * The provider is passed to the highest level component that needs access to the context
 * Any component that needs access to the context must be a child of the component that has the provider
 *
 * The consumer is used to modify the state of the context from anywhere
 * To use the consumer, you must first import it from file where it was created
 */
var _a = __read((0, live_1.createContext)({
    data: new Set()
}), 2), elapsedConsumer = _a[0], elapsedProvider = _a[1];
exports.elapsedConsumer = elapsedConsumer;
exports.elapsedProvider = elapsedProvider;
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
exports.database = [testTodo, testTodo2];
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
/**
 * @desc This is the manager factory, Has nothing to do with PondSocket, thus no documentation
 * @param socket
 * @param reminders
 */
var monitorReminders = function (socket, reminders) {
    var now = new Date();
    var set = new Set();
    reminders.forEach(function (reminder) {
        var diff = reminder.date.getTime() - now.getTime();
        reminder.countDown = diff;
        if (diff <= 0 && !reminder.completed) {
            reminder.elapsed = true;
            set.add({
                id: reminder.id,
                elapsed: "".concat(reminder.text, " is elapsed, it was due on ").concat(reminder.date.toDateString())
            });
        }
        else if (reminder.elapsed)
            reminder.elapsed = false;
    });
    elapsedConsumer.assign(socket, { data: set });
};
var ReminderManager = function (socket) {
    var reminders = [testReminder, testReminder2];
    monitorReminders(socket, reminders);
    var interval = setInterval(function () {
        monitorReminders(socket, reminders);
    }, 100);
    return {
        unsubscribe: function () {
            clearInterval(interval);
        },
        addReminder: function (reminder) {
            reminders.push(reminder);
        },
        removeReminder: function (id) {
            reminders = reminders.filter(function (reminder) { return reminder.id !== id; });
        },
        updateReminder: function (id, reminder) {
            reminders = reminders.map(function (data) { return data.id === id ? reminder : data; });
        },
        findReminder: function (id) {
            return reminders.find(function (data) { return data.id === id; });
        },
        getReminders: function () {
            return reminders;
        }
    };
};
var ManagerFactory = function () {
    var managers = new Map();
    return {
        getManager: function (socket) {
            var id = socket.clientId;
            if (!managers.has(id)) {
                managers.set(id, ReminderManager(socket));
            }
            return managers.get(id);
        }
    };
};
exports.ReminderManger = ManagerFactory();
