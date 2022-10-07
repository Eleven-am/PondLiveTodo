import {Reminder} from "../controller/database";
import {html} from "pondsocket";

/**
 * Sometimes it is useful to have a component that is not a live component
 * These components are not connected to the websocket and are only updated
 * When the live component it is rendered within is updated.
 *
 * This can be useful for code splitting and readability.
 * @constructor
 */
export const ReminderCard = (reminder: Reminder) => {
    return html`
        <div class="flex items-center justify-between px-4 py-2 border-b border-cyan-200">
            <div class="flex items-center">
                <div class="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200" pond-click="toggleComplete" pond-data-id="${reminder.id}">
                    <span class="material-symbols-outlined text-cyan-700 cursor-pointer">${reminder.completed ? 'check_box' : 'check_box_outline_blank'}</span>
                </div>
                <div class="flex flex-col">
                    <div class="text-lg font-bold ${reminder.elapsed && !reminder.completed ? 'error': 'text-cyan-900'} ${reminder.completed ? 'line-through' : ''}">${reminder.text}</div>
                    <div class="text-sm text-cyan-700 ${reminder.completed ? 'line-through' : ''}">${reminder.description}</div>
                    <div class="text-xs text-cyan-400 ${reminder.completed ? 'line-through' : ''}">${reminder.date.toString()}</div>
                </div>
            </div>
            <div class="flex items-center">
                <a class="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200 cursor-pointer" href="/reminder/editReminder/${reminder.id}">
                    <span class="material-symbols-outlined text-cyan-700">edit</span>
                </a>
                <a class="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200 cursor-pointer" href="/reminder/deleteReminder/${reminder.id}">
                    <span class="material-symbols-outlined text-cyan-700">delete</span>
                </a>
            </div>
        </div>
    `;
}
