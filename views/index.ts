import {createContext, html, LiveFactory} from "@eleven-am/pondlive";
import {TodoHome} from "./TodoHome";
import {elapsedProvider, elapsedConsumer, ReminderManger, database, ReminderManagerType} from "../controller/database";
import {ReminderHome} from "./ReminderHome";

interface IndexContext {
    name: string | null;
    notificationCount: number;
    todos: string[];
    reminders: string[];
    manager: ReminderManagerType;
    notifications: string[];
}

interface SearchContext {
    query: string;
}

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
const [homeConsumer, homeProvider] = createContext<{ name: string }>({
    name: ''
});

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
const [searchConsumer, searchProvider] = createContext<SearchContext>({
    query: ''
});

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
const [todoConsumer, todoProvider] = createContext<{todo: string, action: boolean}>({
    todo: '',
    action: false
});

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
export const Index = LiveFactory<IndexContext>({
    routes: [{
        path: '/todo',
        Component: TodoHome
    }, {
        path: '/reminder',
        Component: ReminderHome
    }],

    providers: [homeProvider, searchProvider, elapsedProvider, todoProvider],

    mount(_context, socket, _router) {
        const manager = ReminderManger.getManager(socket);
        const todos = database.map(todo => todo.text);
        const reminders = manager.getReminders().filter(reminder => !reminder.completed).map(reminder => reminder.text);
        homeConsumer.assign(socket, {
            name: '',
        })

        /**
         * The socket.assign function is used to assign a state to the client on this component
         */
        socket.assign({
            todos,
            reminders,
            manager,
            name: null,
            notificationCount: 0,
            notifications: []
        });
    },

    onContextChange(context, socket, _router) {
        homeConsumer.handleContextChange(context, provider => {
            socket.assign({name: provider.name});
        })

        elapsedConsumer.handleContextChange(context, provider => {
            socket.assign({
                notificationCount: provider.data.size,
                notifications: Array.from(provider.data.values()).map((notification: any) => notification.elapsed),
                reminders: this.manager.getReminders().filter(reminder => !reminder.completed).map(reminder => reminder.text)
            });
        });

        todoConsumer.handleContextChange(context, provider => {
            const todos = this.todos.filter(todo => todo !== provider.todo);
            if (provider.action)
                todos.push(provider.todo);

            socket.assign({
                todos: todos
            });
        });
    },

    onEvent(event, socket, _router) {
        if (event.type === 'search')
            /**
             * Every global context manager has a function called assigns that can be used to modify the global context.
             * The assigns function takes in a socket object and a data object
             * The data object is the data that will be assigned to the global context
             */
            searchConsumer.assign(socket, {
                query: event.value || ''
            })
    },

    onUnmount() {
        this.manager?.unsubscribe();
    },

    render(renderRoutes) {
        return html`
            <div class="container mx-auto">
                <div class="flex relative justify-between items-center py-4">
                    <div class="flex items-center">
                        <a class="text-2xl font-bold text-cyan-900 mr-2" href="/">PondLive Todos</a>

                        <div class="flex items-center ml-6 sm:w-68 md:w-96">
                            <div class="flex items-center relative w-full">
                                <input type="text"
                                       class="h-10 px-5 w-full pr-10 text-sm bg-white border-2 border-cyan-600 rounded-lg focus:outline-none focus:border-cyan-900"
                                       pond-keyup="search" placeholder="Search">
                                <button type="submit" class="absolute focus:outline-none mt-1.5 right-3">
                                    <span class="material-symbols-outlined text-cyan-700">search</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center ml-6 right-0">
                        <ul class="flex items-center">
                            <li class="mr-3 relative">
                                <a class="flex items-center focus:outline-none cursor-pointer">
                                    <span class="material-symbols-outlined text-cyan-700 hover:text-cyan-900">notifications</span>
                                    <span class="absolute top-0 right-0 w-4 h-4 bg-cyan-900 rounded-full text-xs text-white text-center bg-red-500"
                                          style="display: ${this.notificationCount > 0 ? 'block' : 'none'}">
                                        ${this.notificationCount}
                                    </span>
                                </a>
                            </li>
                            <li class="mr-3">
                                ${this.name === 'Add Reminder' ? html`
                                    <a class="flex overflow-clip items-center justify-center ml-6 w-36 h-10 rounded-lg bg-cyan-900 text-white focus:outline-none hover:bg-cyan-700 drop-shadow-lg hover:drop-shadow-xl"
                                       href="/reminder/addReminder">
                                        <span class="material-symbols-outlined">add</span>
                                        Add Reminder
                                    </a>` : html`
                                    <a class="flex items-center focus:outline-none cursor-pointer" href="/reminder">
                                        <span class="material-symbols-outlined text-cyan-700 hover:text-cyan-900">event</span>
                                    </a>
                                `}
                            </li>
                            <li class="mr-3">
                                ${this.name === 'Add Todo' ? html`
                                    <a class="flex overflow-clip items-center justify-center ml-6 w-36 h-10 rounded-lg bg-cyan-900 text-white focus:outline-none hover:bg-cyan-700 drop-shadow-lg hover:drop-shadow-xl"
                                       href="/todo/addTodo">
                                        <span class="material-symbols-outlined">add</span>
                                        Add Todo
                                    </a>` : html`
                                    <a class="flex items-center focus:outline-none cursor-pointer" href="/todo">
                                        <span class="material-symbols-outlined text-cyan-700 hover:text-cyan-900">calendar_view_day</span>
                                    </a>
                                `}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white rounded-lg shadow-lg p-4">
                        <a class="flex items-center justify-between" href="/reminder">
                            <h1 class="text-xl font-bold text-cyan-900">Reminders</h1>
                            <div class="flex items-center focus:outline-none cursor-pointer">
                                <span class="material-symbols-outlined text-cyan-700 hover:text-cyan-900">event</span>
                            </div>
                        </a>
                        ${this.reminders.map(reminder => html`
                            <div class="flex items-center justify-between mt-4">
                                <div class="flex items-center">
                                    <span class="material-symbols-outlined text-cyan-700">event</span>
                                    <span class="ml-2 text-sm text-cyan-900">${reminder}</span>
                                </div>
                            </div>
                        `)}
                    </div>

                    <div class="bg-white rounded-lg shadow-lg p-4">
                        <a class="flex items-center justify-between" href="/todo">
                            <h1 class="text-xl font-bold text-cyan-900">Todos</h1>
                            <div class="flex items-center focus:outline-none cursor-pointer">
                                <span class="material-symbols-outlined text-cyan-700 hover:text-cyan-900">calendar_view_day</span>
                            </div>
                        </a>
                        ${this.todos.map(todo => html`
                            <div class="flex items-center justify-between mt-4">
                                <div class="flex items-center">
                                    <span class="material-symbols-outlined text-cyan-700">calendar_view_day</span>
                                    <span class="ml-2 text-sm text-cyan-900">${todo}</span>
                                </div>
                            </div>
                        `)}
                    </div>

                    <div class="bg-white rounded-lg shadow-lg p-4">
                        <a class="flex items-center justify-between" href="/reminder">
                            <h1 class="text-xl font-bold text-cyan-900">Notifications</h1>
                            <div class="flex items-center focus:outline-none cursor-pointer">
                                <span class="material-symbols-outlined text-cyan-700 hover:text-cyan-900">notifications</span>
                            </div>
                        </a>
                        ${this.notifications.map(notification => html`
                            <div class="flex items-center justify-between mt-4">
                                <div class="flex items-center">
                                    <span class="material-symbols-outlined text-cyan-700">notifications</span>
                                    <span class="ml-2 text-sm text-cyan-900">${notification}</span>
                                </div>
                            </div>
                        `)}
                    </div>
                </div>

                <!--
                  The context during the render contains a function called renderRoutes, 
                  this function can be used to render the nested routes at the current path on the position of the function call
                -->
                ${renderRoutes()}

            </div>
        `;
    }
})

export {homeConsumer, searchConsumer, todoConsumer};
