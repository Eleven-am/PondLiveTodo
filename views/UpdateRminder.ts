import {html, LiveFactory} from "@eleven-am/pondlive";
import {Reminder, ReminderManger, ReminderManagerType} from "../controller/database";

interface UpdateReminderAssigns {
    data: Reminder;
    manager: ReminderManagerType;
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
export const UpdateReminderModal = LiveFactory<UpdateReminderAssigns>({
    routes: [],

    mount(context, socket, router) {
        const manager = ReminderManger.getManager(socket);

        if (context.params.id) {
            const reminder = manager.findReminder(Number(context.params.id));
            if (reminder) {
                /**
                 * The socket.assign function is used to assign a state to the client on this component
                 */
                socket.assign({
                    data: reminder,
                    manager: manager
                })

                /**
                 * The router.pageTitle setter can be used to set the title of the page
                 */
                router.pageTitle = `Edit Reminder: ${reminder.text}`;
                return;
            }

            /**
             * The router.pageTitle setter can be used to set the title of the page
             */
            router.pageTitle = "Add Reminder";
            /**
             * The router.navigateTo function is used to navigate to a different page
             */
            router.navigateTo('/reminder');
        } else {
            const reminder: Reminder = {
                id: 0,
                text: '',
                description: '',
                elapsed: false,
                date: new Date(),
                completed: false,
                countDown: 0
            }

            /**
             * The socket.assign function is used to assign a state to the client on this component
             */
            socket.assign({
                data: reminder,
                manager: manager
            })
        }
    },

    onEvent(event, socket, router) {
        if (event.type === 'closeModal')
            /**
             * The router.navigateTo function is used to navigate to a different page
             */
            router.navigateTo('/reminder');

        if (event.type === 'title')
            socket.assign({
                data: {...this.data, text: event.value!}
            })

        if (event.type === 'description')
            /**
             * The socket.assign function is used to assign a state to the client on this component
             */
            socket.assign({
                data: {...this.data, description: event.value!}
            })

        if (event.type === 'date') {
            const date = new Date(event.value!);
            /**
             * The socket.assign function is used to assign a state to the client on this component
             */
            socket.assign({
                data: {...this.data, date: date}
            })
        }

        if (event.type === 'addReminder') {
            if (!this.data.text || !this.data.description) {
                /**
                 * The socket.assign function is used to assign a state to the client on this component
                 */
                socket.assign({
                    error: 'Please fill out all fields'
                })
                return;
            }

            if (this.data.id)
                this.manager.updateReminder(this.data.id, this.data);
            else
                this.manager.addReminder(this.data);

            /**
             * The router.navigateTo function is used to navigate to a different page
             */
            router.navigateTo('/reminder');
        }
    },

    render() {
        return html`
            <div class="flex flex-col items-center justify-center w-full h-full absolute left-0 top-0 bg-cyan-900 bg-opacity-70">
                <div class="flex flex-col items-center justify-center w-1/2 h-2/3 bg-cyan-100 rounded-lg">
                    <div class="flex items-center justify-between w-full px-4 py-2 border-b border-cyan-200">
                    <div class="text-lg font-bold ${this.error ? 'error': 'text-cyan-900'}">${this.error ? this.error : !!this.data.id ? 'Edit Todo': 'Add Todo'}</div>
                        <div class="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200" pond-click="closeModal">
                            <span class="material-symbols-outlined text-cyan-700 cursor-pointer">close</span>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center w-full px-4 py-2">
                        <div class="flex flex-col w-full">
                            <label class="text-sm font-bold text-cyan-900">Reminder Title</label>
                            <input class="w-full px-4 py-2 mt-2 border ${this.error ? 'error': 'border-cyan-200'} rounded-lg" pond-keyup="title" type="text" placeholder="Todo Title" value="${this.data.text}">
                        </div>
                        <div class="flex flex-col w-full mt-4">
                            <label class="text-sm font-bold text-cyan-900">Reminder Description</label>
                            <textarea class="w-full px-4 py-2 mt-2 border ${this.error ? 'error': 'border-cyan-200'} rounded-lg" pond-keyup="description" placeholder="Todo Description">${this.data.description}</textarea>
                        </div>
                        <div class="flex flex-col w-full mt-4">
                            <label class="text-sm font-bold text-cyan-900">Reminder Due Date</label>
                            <input class="w-full px-4 py-2 mt-2 border ${this.error ? 'error': 'border-cyan-200'} rounded-lg" pond-keyup="date" type="date" value="${this.data.date.toISOString().split('T')[0]}">
                        </div>
                        <div class="flex items-center justify-center w-full mt-4">
                            <button class="px-4 py-2 text-sm font-bold text-cyan-100 bg-cyan-500 rounded-lg" pond-click="addReminder">
                                ${this.data.id ? 'Edit Reminder': 'Add Reminder'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
    }
})
