import {html, LiveFactory} from "@eleven-am/pondlive";
import {database, Todo} from "../controller/database";
import {UpdateTodoModal} from "./UpdateTodo";
import {TodoCard} from "./TodoCard";
import {DeleteTodoModal} from "./DeleteTodo";
import {homeConsumer, searchConsumer} from "./index";

interface TodoContext {
    todos: Todo[];
}

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
export const TodoHome = LiveFactory<TodoContext>({
    routes: [{
        path: '/addTodo',
        Component: UpdateTodoModal
    }, {
        path: '/deleteTodo/:id',
        Component: DeleteTodoModal
    }, {
        path: '/editTodo/:id',
        Component: UpdateTodoModal
    }],

    mount(_context, socket, router) {
        /**
         * The router.pageTitle setter can be used to set the title of the page
         */
        router.pageTitle = 'PondLive Todo';
        /**
         * The socket.assign function is used to assign a state to the client on this component
         */
        socket.assign({todos: database});
        /**
         * Every global context manager has a function called assigns that can be used to modify the global context.
         * The assigns function takes in a socket object and a data object
         * The data object is the data that will be assigned to the global context
         */
        homeConsumer.assign(socket, {
            name: 'Add Todo',
        });
    },

    onContextChange(context, socket) {
        searchConsumer.handleContextChange(context, provider => {
            if (provider.query !== '') {
                const todos = database.filter(todo => todo.text.toLowerCase().includes(provider.query.toLowerCase()));
                /**
                 * The socket.assign function is used to assign a state to the client on this component
                 */
                socket.assign({todos});

            } else
                /**
                 * The socket.assign function is used to assign a state to the client on this component
                 */
                socket.assign({todos: database});
        })
    },

    onEvent(event, socket) {
        if (event.type === 'toggleComplete') {
            const todo = database.find(todo => todo.id === Number(event.dataId));
            const innerTodos = this.todos.filter(todo => todo.id !== Number(event.dataId));
            const innerIndex = this.todos.findIndex(todo => todo.id === Number(event.dataId));
            if (todo) {
                todo.completed = !todo.completed;
                innerTodos.splice(innerIndex, 0, todo);
                /**
                 * The socket.assign function is used to assign a state to the client on this component
                 */
                socket.assign({todos: innerTodos});
            }
        }
    },

    render(renderRoutes) {
        return html`
            <div class="flex flex-col mt-6">
                ${this.todos.map(todo => TodoCard(todo))}
            </div>

            <!--
              The context during the render contains a function called renderRoutes, 
              this function can be used to render the nested routes at the current path on the position of the function call
            -->
            ${renderRoutes()}
        `;
    }
})
