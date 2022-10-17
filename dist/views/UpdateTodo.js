"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoModal = void 0;
var live_1 = require("pondsocket/live");
var database_1 = require("../controller/database");
var index_1 = require("./index");
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
exports.UpdateTodoModal = (0, live_1.LiveFactory)({
    routes: [],
    mount: function (context, socket, router) {
        if (context.params.id) {
            var todo = database_1.database.find(function (todo) { return todo.id === Number(context.params.id); });
            if (todo) {
                /**
                 * The socket.assign function is used to assign a state to the client on this component
                 */
                socket.assign({
                    text: todo.text,
                    description: todo.description,
                    id: todo.id,
                    error: undefined
                });
                /**
                 * The router.pageTitle setter can be used to set the title of the page
                 */
                router.pageTitle = "Edit Todo: ".concat(todo.text);
                return;
            }
        }
        /**
         * The router.pageTitle setter can be used to set the title of the page
         */
        router.pageTitle = 'Add Todo';
        /**
         * The socket.assign function is used to assign a state to the client on this component
         */
        socket.assign({
            text: '',
            description: '',
            error: undefined
        });
    },
    onEvent: function (event, socket, router) {
        var _this = this;
        if (event.type === 'closeModal')
            /**
             * The router.navigateTo function is used to navigate to a different page
             */
            router.navigateTo('/todo');
        if (event.type === 'title')
            socket.assign({
                text: event.value || ''
            });
        if (event.type === 'description')
            socket.assign({
                description: event.value || ''
            });
        if (event.type === 'addTodo') {
            if (!this.text || !this.description) {
                socket.assign({
                    error: 'Please fill out all fields'
                });
                return;
            }
            if (this.id) {
                var todo = database_1.database.find(function (todo) { return todo.id === _this.id; });
                if (todo) {
                    todo.text = this.text;
                    todo.description = this.description;
                }
            }
            else
                database_1.database.push({
                    id: database_1.database.length + 1,
                    text: this.text,
                    description: this.description,
                    completed: false,
                    date: new Date()
                });
            /**
             * The router.navigateTo function is used to navigate to a different page
             */
            router.navigateTo('/todo');
            index_1.todoConsumer.assign(socket, {
                todo: this.text,
                action: true
            });
        }
    },
    render: function () {
        return (0, live_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            <div class=\"flex flex-col items-center justify-center w-full h-full absolute left-0 top-0 bg-cyan-900 bg-opacity-70\">\n                <div class=\"flex flex-col items-center justify-center w-1/2 h-1/2 bg-cyan-100 rounded-lg\">\n                    <div class=\"flex items-center justify-between w-full px-4 py-2 border-b border-cyan-200\">\n                    <div class=\"text-lg font-bold ", "\">", "</div>\n                        <div class=\"flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200\" pond-click=\"closeModal\">\n                            <span class=\"material-symbols-outlined text-cyan-700 cursor-pointer\">close</span>\n                        </div>\n                    </div>\n                    <div class=\"flex flex-col items-center justify-center w-full px-4 py-2\">\n                        <div class=\"flex flex-col w-full\">\n                            <label class=\"text-sm font-bold text-cyan-900\">Todo Title</label>\n                            <input class=\"w-full px-4 py-2 mt-2 border ", " rounded-lg\" pond-keyup=\"title\" type=\"text\" placeholder=\"Todo Title\" value=\"", "\">\n                        </div>\n                        <div class=\"flex flex-col w-full mt-4\">\n                            <label class=\"text-sm font-bold text-cyan-900\">Todo Description</label>\n                            <textarea class=\"w-full px-4 py-2 mt-2 border ", " rounded-lg\" pond-keyup=\"description\" placeholder=\"Todo Description\">", "</textarea>\n                        </div>\n                        <div class=\"flex items-center justify-center w-full mt-4\">\n                            <button class=\"px-4 py-2 text-sm font-bold text-cyan-100 bg-cyan-500 rounded-lg\" pond-click=\"addTodo\">", "</button>\n                        </div>\n                    </div>\n                </div>\n            </div>"], ["\n            <div class=\"flex flex-col items-center justify-center w-full h-full absolute left-0 top-0 bg-cyan-900 bg-opacity-70\">\n                <div class=\"flex flex-col items-center justify-center w-1/2 h-1/2 bg-cyan-100 rounded-lg\">\n                    <div class=\"flex items-center justify-between w-full px-4 py-2 border-b border-cyan-200\">\n                    <div class=\"text-lg font-bold ", "\">", "</div>\n                        <div class=\"flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200\" pond-click=\"closeModal\">\n                            <span class=\"material-symbols-outlined text-cyan-700 cursor-pointer\">close</span>\n                        </div>\n                    </div>\n                    <div class=\"flex flex-col items-center justify-center w-full px-4 py-2\">\n                        <div class=\"flex flex-col w-full\">\n                            <label class=\"text-sm font-bold text-cyan-900\">Todo Title</label>\n                            <input class=\"w-full px-4 py-2 mt-2 border ", " rounded-lg\" pond-keyup=\"title\" type=\"text\" placeholder=\"Todo Title\" value=\"", "\">\n                        </div>\n                        <div class=\"flex flex-col w-full mt-4\">\n                            <label class=\"text-sm font-bold text-cyan-900\">Todo Description</label>\n                            <textarea class=\"w-full px-4 py-2 mt-2 border ", " rounded-lg\" pond-keyup=\"description\" placeholder=\"Todo Description\">", "</textarea>\n                        </div>\n                        <div class=\"flex items-center justify-center w-full mt-4\">\n                            <button class=\"px-4 py-2 text-sm font-bold text-cyan-100 bg-cyan-500 rounded-lg\" pond-click=\"addTodo\">", "</button>\n                        </div>\n                    </div>\n                </div>\n            </div>"])), this.error ? 'error' : 'text-cyan-900', this.error ? this.error : !!this.id ? 'Edit Todo' : 'Add Todo', this.error ? 'error' : 'border-cyan-200', this.text, this.error ? 'error' : 'border-cyan-200', this.description, this.id ? 'Edit Todo' : 'Add Todo');
    }
});
var templateObject_1;
