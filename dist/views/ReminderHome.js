"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderHome = void 0;
var database_1 = require("../controller/database");
var pondlive_1 = require("@eleven-am/pondlive");
var ReminderCard_1 = require("./ReminderCard");
var DeleteReminder_1 = require("./DeleteReminder");
var UpdateRminder_1 = require("./UpdateRminder");
var ReminderHome = function (ctx) {
    var _b = __read((0, pondlive_1.useServerInfo)(ctx, database_1.searchContext), 1), search = _b[0];
    var routes = (0, pondlive_1.useRouter)([{
            path: '/deleteReminder',
            component: DeleteReminder_1.DeleteReminderModal
        }, {
            path: '/editReminder/:id',
            component: UpdateRminder_1.UpdateReminderModal
        }, {
            path: '/addReminder/:id',
            component: UpdateRminder_1.UpdateReminderModal
        }]);
    ctx.onMount(function (req, res) {
        res.setPageTitle('PondLive Reminders');
        database_1.homeContext.assign(req, {
            active: true,
        });
    });
    ctx.onUnmount(function (event) {
        database_1.homeContext.assign(event, {
            active: null,
        });
    });
    var _c = __read((0, pondlive_1.useAction)(ctx, undefined, {
        toggleComplete: function (event) {
            var reminder = database_1.reminderDatabase.get(event, Number(event.data.dataId));
            if (reminder) {
                reminder.completed = !reminder.completed;
                database_1.reminderDatabase.upsert(event, reminder);
            }
        }
    }), 2), _a = _c[0], action = _c[1];
    return (0, pondlive_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <div class=\"flex flex-col mt-6\">\n            ", "\n        </div>\n        ", "\n    "], ["\n        <div class=\"flex flex-col mt-6\">\n            ", "\n        </div>\n        ", "\n    "])), database_1.reminderDatabase.query(ctx, search.query)
        .map(function (item) { return (__assign(__assign({}, item), { elapsed: item.date.getTime() - Date.now() < 0 })); })
        .map(function (reminder) { return (0, ReminderCard_1.ReminderCard)(reminder, action('toggleComplete')); }), routes(ctx));
};
exports.ReminderHome = ReminderHome;
var templateObject_1;
