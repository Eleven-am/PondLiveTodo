import {html, useAction, useRouter, useServerInfo} from "@eleven-am/pondlive";
import {TodoHome} from "./TodoHome";
import {ReminderHome} from "./ReminderHome";
import {Component} from "@eleven-am/pondlive/types";
import {
    homeContext, manager,
    notificationContext,
    remindersContext,
    searchContext,
    todosContext
} from "../controller/database";

export const Index: Component = (ctx) => {
    const [name] = useServerInfo(ctx, homeContext);
    const [search, setSearch] = useServerInfo(ctx, searchContext);
    const [todos] = useServerInfo(ctx, todosContext);
    const [reminders] = useServerInfo(ctx, remindersContext);
    const [notifications] = useServerInfo(ctx, notificationContext);

    const routes = useRouter([{
        path: '/todo',
        component: TodoHome
    }, {
        path: '/reminder',
        component: ReminderHome
    }]);

    const [_, action] = useAction(ctx, undefined, {
        setSearchQuery: (event) => setSearch(event, {
            query:event.data.value || '',
        })
    });

    ctx.onMount((req) => {
        manager.monitor(req);
    });

    ctx.onUnmount((event) => {
        manager.clear(event);
    });

    return html`
        <div class="container mx-auto">
            <div class="flex relative justify-between items-center py-4">
                <div class="flex items-center">
                    <a class="text-2xl font-bold text-cyan-900 mr-2" href="/">PondLive Todos</a>

                    <div class="flex items-center ml-6 sm:w-68 md:w-96">
                        <div class="flex items-center relative w-full">
                            <input type="text"
                                   pond-value="${search}"
                                   class="h-10 px-5 w-full pr-10 text-sm bg-white border-2 border-cyan-600 rounded-lg focus:outline-none focus:border-cyan-900"
                                   pond-keyup="${action('setSearchQuery')}" placeholder="Search">
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
                                <span class="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white text-center"
                                      style="display: ${notifications.data.length > 0 ? 'block' : 'none'}">
                                    ${notifications.data.length}
                                </span>
                            </a>
                        </li>
                        <li class="mr-3">
                            ${name.active === true ? html`
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
                            ${name.active === false ? html`
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
                    ${reminders.filter(d => !d.completed).map(reminder => html`
                        <div class="flex items-center justify-between mt-4">
                            <div class="flex items-center">
                                <span class="material-symbols-outlined text-cyan-700">event</span>
                                <span class="ml-2 text-sm text-cyan-900">${reminder.text}</span>
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
                    ${todos.filter(d => !d.completed).map(todo => html`
                        <div class="flex items-center justify-between mt-4">
                            <div class="flex items-center">
                                <span class="material-symbols-outlined text-cyan-700">calendar_view_day</span>
                                <span class="ml-2 text-sm text-cyan-900">${todo.text}</span>
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
                    ${notifications.data.map(notification => html`
                        <div class="flex items-center justify-between mt-4">
                            <div class="flex items-center">
                                <span class="material-symbols-outlined text-cyan-700">notifications</span>
                                <span class="ml-2 text-sm text-cyan-900">${notification.text}</span>
                            </div>
                        </div>
                    `)}
                </div>
            </div>

            ${routes(ctx)}
        </div>
    `;
}
