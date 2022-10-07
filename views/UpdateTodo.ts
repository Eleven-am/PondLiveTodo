import {html, LiveFactory} from "pondsocket";
import {database} from "../controller/database";
import {todoConsumer} from "./index";

interface AddTodoAssigns {
    id?: number;
    text: string;
    description: string;
    error?: string;
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
export const UpdateTodoModal = LiveFactory<AddTodoAssigns>({
    routes: [],

    mount: (context, socket, router) => {
        if (context.params.id) {
            const todo = database.find(todo => todo.id === Number(context.params.id));
            if (todo) {
                /**
                 * The socket.assign function is used to assign a state to the client on this component
                 */
                socket.assign({
                    text: todo.text,
                    description: todo.description,
                    id: todo.id,
                    error: undefined
                })

                /**
                 * The router.pageTitle setter can be used to set the title of the page
                 */
                router.pageTitle = `Edit Todo: ${todo.text}`;
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

    onEvent(event, context, socket , router): void | Promise<void> {
        if (event.type === 'closeModal')
            /**
             * The router.navigateTo function is used to navigate to a different page
             */
            router.navigateTo('/todo');

        if (event.type === 'title')
            socket.assign({
                text: event.value
            })

        if (event.type === 'description')
            socket.assign({
                description: event.value
            })

        if (event.type === 'addTodo') {
            if (!context.text || !context.description) {
                socket.assign({
                    error: 'Please fill out all fields'
                })
                return;
            }

            if (context.id) {
                const todo = database.find(todo => todo.id === context.id);
                if (todo) {
                    todo.text = context.text;
                    todo.description = context.description;
                }

            } else
                database.push({
                    id: database.length + 1,
                    text: context.text,
                    description: context.description,
                    completed: false,
                    date: new Date()
                })

            /**
             * The router.navigateTo function is used to navigate to a different page
             */
            router.navigateTo('/todo');
            todoConsumer.assign(socket, {
                todo: context.text,
                action: true
            })
        }
    },

    render(socket, _classes) {
        return html`
            <div class="flex flex-col items-center justify-center w-full h-full absolute left-0 top-0 bg-cyan-900 bg-opacity-70">
                <div class="flex flex-col items-center justify-center w-1/2 h-1/2 bg-cyan-100 rounded-lg">
                    <div class="flex items-center justify-between w-full px-4 py-2 border-b border-cyan-200">
                    <div class="text-lg font-bold ${socket.context.error ? 'error': 'text-cyan-900'}">${socket.context.error ? socket.context.error : !!socket.context.id ? 'Edit Todo': 'Add Todo'}</div>
                        <div class="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200" pond-click="closeModal">
                            <span class="material-symbols-outlined text-cyan-700 cursor-pointer">close</span>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center w-full px-4 py-2">
                        <div class="flex flex-col w-full">
                            <label class="text-sm font-bold text-cyan-900">Todo Title</label>
                            <input class="w-full px-4 py-2 mt-2 border ${socket.context.error ? 'error': 'border-cyan-200'} rounded-lg" pond-keyup="title" type="text" placeholder="Todo Title" value="${socket.context.text}">
                        </div>
                        <div class="flex flex-col w-full mt-4">
                            <label class="text-sm font-bold text-cyan-900">Todo Description</label>
                            <textarea class="w-full px-4 py-2 mt-2 border ${socket.context.error ? 'error': 'border-cyan-200'} rounded-lg" pond-keyup="description" placeholder="Todo Description">${socket.context.description}</textarea>
                        </div>
                        <div class="flex items-center justify-center w-full mt-4">
                            <button class="px-4 py-2 text-sm font-bold text-cyan-100 bg-cyan-500 rounded-lg" pond-click="addTodo">${socket.context.id ? 'Edit Todo': 'Add Todo'}</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }
})
