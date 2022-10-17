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
exports.todoConsumer = exports.searchConsumer = exports.homeConsumer = exports.Index = void 0;
var live_1 = require("pondsocket/live");
var TodoHome_1 = require("./TodoHome");
var database_1 = require("../controller/database");
var ReminderHome_1 = require("./ReminderHome");
/**
 * This is the context manager for the index page button
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
    name: ''
}), 2), homeConsumer = _a[0], homeProvider = _a[1];
exports.homeConsumer = homeConsumer;
/**
 * This is the context manager for the search bar
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
var _b = __read((0, live_1.createContext)({
    query: ''
}), 2), searchConsumer = _b[0], searchProvider = _b[1];
exports.searchConsumer = searchConsumer;
/**
 * This is the context manager for the to-do provider
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
var _c = __read((0, live_1.createContext)({
    todo: '',
    action: false
}), 2), todoConsumer = _c[0], todoProvider = _c[1];
exports.todoConsumer = todoConsumer;
/**
 * This is the main component for the index page
 * To create a component, you must first import the LiveFactory from pondSocket,
 *
 * The LiveFactory function takes a LiveComponent object as an argument
 * A LiveComponent object has the following properties:
 *
 * routes: The routes defines the different pages that the component can render as nested components
 *
 * providers: The providers array takes in an array of providers that are passed to the component, These providers make the context available to the component and all of its children
 *
 * mount: The mount function is called when the component receives the http request to render the component
 *        The mount function takes in a context object which contains the context of the request, {params, query}
 *        The mount function also takes in a LiveSocket object which is used to send messages to the client and assign states for the client on this component
 *        The mount function also has a router object which is used to navigate to different pages
 *
 * onRendered: The onRendered function is called when the component is rendered on the client
 *             When the client receives the HTML from the mount process, it renders the HTML and calls the onRendered function
 *             The onRendered function takes in a context of the current state of the user on this component, this state must have been predefined in the mount function
 *             The onRendered function also takes in a LiveSocket object which is used to send messages to the client and assign states for the client on this component
 *             The onRendered function also has a router object which is used to navigate to different pages
 *
 * onEvent: The onEvent function is called when the client sends a message to the server,
 *          These events are triggered when the client interacts with the component on the DOM
 *          The onEvent function takes the event object {type: string, value: any, dataId: string | null} as an argument
 *          The onEvent function takes in a context of the current state of the user on this component, this state must have been predefined in the mount function
 *          The onEvent function also takes in a LiveSocket object which is used to send messages to the client and assign states for the client on this component
 *          The onEvent function also has a router object which is used to navigate to different pages
 *
 * onInfo: The onInfo function is called when the component receives a message from the server like a broadcast
 *         The onInfo function takes the info object, could be any type, as an argument
 *         The onInfo function takes in a context of the current state of the user on this component, this state must have been predefined in the mount function
 *         The onInfo function also takes in a LiveSocket object which is used to send messages to the client and assign states for the client on this component
 *         The onInfo function also has a router object which is used to navigate to different pages
 *
 * onContextChange: The onContextChange function is called when the external global context changes
 *                 The onContextChange function takes name of the context that changed as an argument
 *                 The onContextChange function takes value of the context that changed as an argument
 *                 The onContextChange function takes in a context of the current state of the user on this component, this state must have been predefined in the mount function
 *                 The onContextChange function also takes in a LiveSocket object which is used to send messages to the client and assign states for the client on this component
 *                 The onContextChange function also has a router object which is used to navigate to different pages
 *
 * onUnmount: The onUnmount function is called when the component is unmounted from the DOM
 *           This function can be used to clean up any resources that the component is using
 *           The onUnmount function takes in a context of the current state of the user on this component, this state must have been predefined in the mount function
 *           The onUnmount function also takes in a LiveSocket object which is used to send messages to the client and assign states for the client on this component
 *
 * manageStyles: The manageStyles function is called when the component being rendered to the client
 *        It can be used to generate styles for the component
 *        The manageStyles function takes in a context of the current state of the user on this component, this state must have been predefined in the mount function
 *        The function also provides a css generator function that can be used to generate styles
 *
 * render: The render function is called when the component is about to be rendered to the client
 *        The render function takes in a context of the current state of the user on this component, this state must have been predefined in the mount function
 *        The function also provides a css object: Record<string, string> that contains the styles for the component, they can be added to the component using the class property
 *        The render function returns a HtmlSafeString that is rendered to the client
 *
 * To trigger an event on the client, you should add one of these properties to the element you want to trigger the event
 * pond-click: This property triggers is triggered when the element is clicked. the event has for type the value of the property
 * pond-keyup: This property triggers is triggered when the keyup event is triggered on the input. the event has for type the value of the property and has for value the value of the input
 * pond-keydown: This property triggers is triggered when the keydown event is triggered on the input. the event has for type the value of the property and has for value the value of the input
 * pond-change: This property triggers is triggered when the change event is triggered on the input. the event has for type the value of the property and has for value the value of the input
 *
 * There are a lot more properties that can be used to trigger events on the client, check the documentation for more info
 */
exports.Index = (0, live_1.LiveFactory)({
    routes: [{
            path: '/todo',
            Component: TodoHome_1.TodoHome
        }, {
            path: '/reminder',
            Component: ReminderHome_1.ReminderHome
        }],
    providers: [homeProvider, searchProvider, database_1.elapsedProvider, todoProvider],
    mount: function (_context, socket, _router) {
        var manager = database_1.ReminderManger.getManager(socket);
        var todos = database_1.database.map(function (todo) { return todo.text; });
        var reminders = manager.getReminders().filter(function (reminder) { return !reminder.completed; }).map(function (reminder) { return reminder.text; });
        homeConsumer.assign(socket, {
            name: '',
        });
        /**
         * The socket.assign function is used to assign a state to the client on this component
         */
        socket.assign({
            todos: todos,
            reminders: reminders,
            manager: manager,
            name: null,
            notificationCount: 0,
            notifications: []
        });
    },
    onContextChange: function (context, socket, _router) {
        var _this = this;
        homeConsumer.handleContextChange(context, function (provider) {
            socket.assign({ name: provider.name });
        });
        database_1.elapsedConsumer.handleContextChange(context, function (provider) {
            socket.assign({
                notificationCount: provider.data.size,
                notifications: Array.from(provider.data.values()).map(function (notification) { return notification.elapsed; }),
                reminders: _this.manager.getReminders().filter(function (reminder) { return !reminder.completed; }).map(function (reminder) { return reminder.text; })
            });
        });
        todoConsumer.handleContextChange(context, function (provider) {
            var todos = _this.todos.filter(function (todo) { return todo !== provider.todo; });
            if (provider.action)
                todos.push(provider.todo);
            socket.assign({
                todos: todos
            });
        });
    },
    onEvent: function (event, socket, _router) {
        if (event.type === 'search')
            /**
             * Every global context manager has a function called assigns that can be used to modify the global context.
             * The assigns function takes in a socket object and a data object
             * The data object is the data that will be assigned to the global context
             */
            searchConsumer.assign(socket, {
                query: event.value || ''
            });
    },
    onUnmount: function () {
        var _a;
        (_a = this.manager) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    },
    render: function (renderRoutes) {
        return (0, live_1.html)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n            <div class=\"container mx-auto\">\n                <div class=\"flex relative justify-between items-center py-4\">\n                    <div class=\"flex items-center\">\n                        <a class=\"text-2xl font-bold text-cyan-900 mr-2\" href=\"/\">PondLive Todos</a>\n\n                        <div class=\"flex items-center ml-6 sm:w-68 md:w-96\">\n                            <div class=\"flex items-center relative w-full\">\n                                <input type=\"text\"\n                                       class=\"h-10 px-5 w-full pr-10 text-sm bg-white border-2 border-cyan-600 rounded-lg focus:outline-none focus:border-cyan-900\"\n                                       pond-keyup=\"search\" placeholder=\"Search\">\n                                <button type=\"submit\" class=\"absolute focus:outline-none mt-1.5 right-3\">\n                                    <span class=\"material-symbols-outlined text-cyan-700\">search</span>\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"flex items-center ml-6 right-0\">\n                        <ul class=\"flex items-center\">\n                            <li class=\"mr-3 relative\">\n                                <a class=\"flex items-center focus:outline-none cursor-pointer\">\n                                    <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">notifications</span>\n                                    <span class=\"absolute top-0 right-0 w-4 h-4 bg-cyan-900 rounded-full text-xs text-white text-center bg-red-500\"\n                                          style=\"display: ", "\">\n                                        ", "\n                                    </span>\n                                </a>\n                            </li>\n                            <li class=\"mr-3\">\n                                ", "\n                            </li>\n                            <li class=\"mr-3\">\n                                ", "\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n\n                <div class=\"grid grid-cols-1 md:grid-cols-3 gap-4\">\n                    <div class=\"bg-white rounded-lg shadow-lg p-4\">\n                        <a class=\"flex items-center justify-between\" href=\"/reminder\">\n                            <h1 class=\"text-xl font-bold text-cyan-900\">Reminders</h1>\n                            <div class=\"flex items-center focus:outline-none cursor-pointer\">\n                                <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">event</span>\n                            </div>\n                        </a>\n                        ", "\n                    </div>\n\n                    <div class=\"bg-white rounded-lg shadow-lg p-4\">\n                        <a class=\"flex items-center justify-between\" href=\"/todo\">\n                            <h1 class=\"text-xl font-bold text-cyan-900\">Todos</h1>\n                            <div class=\"flex items-center focus:outline-none cursor-pointer\">\n                                <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">calendar_view_day</span>\n                            </div>\n                        </a>\n                        ", "\n                    </div>\n\n                    <div class=\"bg-white rounded-lg shadow-lg p-4\">\n                        <a class=\"flex items-center justify-between\" href=\"/reminder\">\n                            <h1 class=\"text-xl font-bold text-cyan-900\">Notifications</h1>\n                            <div class=\"flex items-center focus:outline-none cursor-pointer\">\n                                <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">notifications</span>\n                            </div>\n                        </a>\n                        ", "\n                    </div>\n                </div>\n\n                <!--\n                  The context during the render contains a function called renderRoutes, \n                  this function can be used to render the nested routes at the current path on the position of the function call\n                -->\n                ", "\n\n            </div>\n        "], ["\n            <div class=\"container mx-auto\">\n                <div class=\"flex relative justify-between items-center py-4\">\n                    <div class=\"flex items-center\">\n                        <a class=\"text-2xl font-bold text-cyan-900 mr-2\" href=\"/\">PondLive Todos</a>\n\n                        <div class=\"flex items-center ml-6 sm:w-68 md:w-96\">\n                            <div class=\"flex items-center relative w-full\">\n                                <input type=\"text\"\n                                       class=\"h-10 px-5 w-full pr-10 text-sm bg-white border-2 border-cyan-600 rounded-lg focus:outline-none focus:border-cyan-900\"\n                                       pond-keyup=\"search\" placeholder=\"Search\">\n                                <button type=\"submit\" class=\"absolute focus:outline-none mt-1.5 right-3\">\n                                    <span class=\"material-symbols-outlined text-cyan-700\">search</span>\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"flex items-center ml-6 right-0\">\n                        <ul class=\"flex items-center\">\n                            <li class=\"mr-3 relative\">\n                                <a class=\"flex items-center focus:outline-none cursor-pointer\">\n                                    <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">notifications</span>\n                                    <span class=\"absolute top-0 right-0 w-4 h-4 bg-cyan-900 rounded-full text-xs text-white text-center bg-red-500\"\n                                          style=\"display: ", "\">\n                                        ", "\n                                    </span>\n                                </a>\n                            </li>\n                            <li class=\"mr-3\">\n                                ", "\n                            </li>\n                            <li class=\"mr-3\">\n                                ", "\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n\n                <div class=\"grid grid-cols-1 md:grid-cols-3 gap-4\">\n                    <div class=\"bg-white rounded-lg shadow-lg p-4\">\n                        <a class=\"flex items-center justify-between\" href=\"/reminder\">\n                            <h1 class=\"text-xl font-bold text-cyan-900\">Reminders</h1>\n                            <div class=\"flex items-center focus:outline-none cursor-pointer\">\n                                <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">event</span>\n                            </div>\n                        </a>\n                        ", "\n                    </div>\n\n                    <div class=\"bg-white rounded-lg shadow-lg p-4\">\n                        <a class=\"flex items-center justify-between\" href=\"/todo\">\n                            <h1 class=\"text-xl font-bold text-cyan-900\">Todos</h1>\n                            <div class=\"flex items-center focus:outline-none cursor-pointer\">\n                                <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">calendar_view_day</span>\n                            </div>\n                        </a>\n                        ", "\n                    </div>\n\n                    <div class=\"bg-white rounded-lg shadow-lg p-4\">\n                        <a class=\"flex items-center justify-between\" href=\"/reminder\">\n                            <h1 class=\"text-xl font-bold text-cyan-900\">Notifications</h1>\n                            <div class=\"flex items-center focus:outline-none cursor-pointer\">\n                                <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">notifications</span>\n                            </div>\n                        </a>\n                        ", "\n                    </div>\n                </div>\n\n                <!--\n                  The context during the render contains a function called renderRoutes, \n                  this function can be used to render the nested routes at the current path on the position of the function call\n                -->\n                ", "\n\n            </div>\n        "])), this.notificationCount > 0 ? 'block' : 'none', this.notificationCount, this.name === 'Add Reminder' ? (0, live_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                                    <a class=\"flex overflow-clip items-center justify-center ml-6 w-36 h-10 rounded-lg bg-cyan-900 text-white focus:outline-none hover:bg-cyan-700 drop-shadow-lg hover:drop-shadow-xl\"\n                                       href=\"/reminder/addReminder\">\n                                        <span class=\"material-symbols-outlined\">add</span>\n                                        Add Reminder\n                                    </a>"], ["\n                                    <a class=\"flex overflow-clip items-center justify-center ml-6 w-36 h-10 rounded-lg bg-cyan-900 text-white focus:outline-none hover:bg-cyan-700 drop-shadow-lg hover:drop-shadow-xl\"\n                                       href=\"/reminder/addReminder\">\n                                        <span class=\"material-symbols-outlined\">add</span>\n                                        Add Reminder\n                                    </a>"]))) : (0, live_1.html)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                                    <a class=\"flex items-center focus:outline-none cursor-pointer\" href=\"/reminder\">\n                                        <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">event</span>\n                                    </a>\n                                "], ["\n                                    <a class=\"flex items-center focus:outline-none cursor-pointer\" href=\"/reminder\">\n                                        <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">event</span>\n                                    </a>\n                                "]))), this.name === 'Add Todo' ? (0, live_1.html)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                                    <a class=\"flex overflow-clip items-center justify-center ml-6 w-36 h-10 rounded-lg bg-cyan-900 text-white focus:outline-none hover:bg-cyan-700 drop-shadow-lg hover:drop-shadow-xl\"\n                                       href=\"/todo/addTodo\">\n                                        <span class=\"material-symbols-outlined\">add</span>\n                                        Add Todo\n                                    </a>"], ["\n                                    <a class=\"flex overflow-clip items-center justify-center ml-6 w-36 h-10 rounded-lg bg-cyan-900 text-white focus:outline-none hover:bg-cyan-700 drop-shadow-lg hover:drop-shadow-xl\"\n                                       href=\"/todo/addTodo\">\n                                        <span class=\"material-symbols-outlined\">add</span>\n                                        Add Todo\n                                    </a>"]))) : (0, live_1.html)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n                                    <a class=\"flex items-center focus:outline-none cursor-pointer\" href=\"/todo\">\n                                        <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">calendar_view_day</span>\n                                    </a>\n                                "], ["\n                                    <a class=\"flex items-center focus:outline-none cursor-pointer\" href=\"/todo\">\n                                        <span class=\"material-symbols-outlined text-cyan-700 hover:text-cyan-900\">calendar_view_day</span>\n                                    </a>\n                                "]))), this.reminders.map(function (reminder) { return (0, live_1.html)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n                            <div class=\"flex items-center justify-between mt-4\">\n                                <div class=\"flex items-center\">\n                                    <span class=\"material-symbols-outlined text-cyan-700\">event</span>\n                                    <span class=\"ml-2 text-sm text-cyan-900\">", "</span>\n                                </div>\n                            </div>\n                        "], ["\n                            <div class=\"flex items-center justify-between mt-4\">\n                                <div class=\"flex items-center\">\n                                    <span class=\"material-symbols-outlined text-cyan-700\">event</span>\n                                    <span class=\"ml-2 text-sm text-cyan-900\">", "</span>\n                                </div>\n                            </div>\n                        "])), reminder); }), this.todos.map(function (todo) { return (0, live_1.html)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n                            <div class=\"flex items-center justify-between mt-4\">\n                                <div class=\"flex items-center\">\n                                    <span class=\"material-symbols-outlined text-cyan-700\">calendar_view_day</span>\n                                    <span class=\"ml-2 text-sm text-cyan-900\">", "</span>\n                                </div>\n                            </div>\n                        "], ["\n                            <div class=\"flex items-center justify-between mt-4\">\n                                <div class=\"flex items-center\">\n                                    <span class=\"material-symbols-outlined text-cyan-700\">calendar_view_day</span>\n                                    <span class=\"ml-2 text-sm text-cyan-900\">", "</span>\n                                </div>\n                            </div>\n                        "])), todo); }), this.notifications.map(function (notification) { return (0, live_1.html)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n                            <div class=\"flex items-center justify-between mt-4\">\n                                <div class=\"flex items-center\">\n                                    <span class=\"material-symbols-outlined text-cyan-700\">notifications</span>\n                                    <span class=\"ml-2 text-sm text-cyan-900\">", "</span>\n                                </div>\n                            </div>\n                        "], ["\n                            <div class=\"flex items-center justify-between mt-4\">\n                                <div class=\"flex items-center\">\n                                    <span class=\"material-symbols-outlined text-cyan-700\">notifications</span>\n                                    <span class=\"ml-2 text-sm text-cyan-900\">", "</span>\n                                </div>\n                            </div>\n                        "])), notification); }), renderRoutes());
    }
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
