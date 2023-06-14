import {html} from "@eleven-am/pondlive";
import {reminderDatabase, useUpsertHook} from "../controller/database";
import {Component} from "@eleven-am/pondlive/types";

export const UpdateReminderModal: Component = (ctx) => {
    const {error, id, dueDate, description, text, objectAction, action} = useUpsertHook(ctx, reminderDatabase, 'reminder', (data) => ({
        ...data,
        elapsed: false,
        countDown: 0
    }));

    return html`
        <div class="flex flex-col items-center justify-center w-full h-full absolute left-0 top-0 bg-cyan-900 bg-opacity-70">
            <div class="flex flex-col items-center justify-center w-1/2 h-2/3 bg-cyan-100 rounded-lg">
                <div class="flex items-center justify-between w-full px-4 py-2 border-b border-cyan-200">
                    <div class="text-lg font-bold ${error ? 'error' : 'text-cyan-900'}">
                        ${error ? error : id ? 'Edit Reminder' : 'Add Reminder'}
                    </div>
                    <div class="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200"
                         pond-click="${action('closeModal')}">
                        <span class="material-symbols-outlined text-cyan-700 cursor-pointer">close</span>
                    </div>
                </div>
                <div class="flex flex-col items-center justify-center w-full px-4 py-2">
                    <div class="flex flex-col w-full">
                        <label class="text-sm font-bold text-cyan-900">Reminder Title</label>
                        <input class="w-full px-4 py-2 mt-2 border ${error ? 'error' : 'border-cyan-200'} rounded-lg"
                               pond-keyup="${objectAction('setText')}" type="text"
                               placeholder="Reminder Title" pond-value="${text}">
                    </div>
                    <div class="flex flex-col w-full mt-4">
                        <label class="text-sm font-bold text-cyan-900">Reminder Description</label>
                        <textarea class="w-full px-4 py-2 mt-2 border ${error ? 'error' : 'border-cyan-200'} rounded-lg"
                                  pond-keyup="${objectAction('setDescription')}"
                                  placeholder="Reminder Description"
                                  pond-value="${description}"></textarea>
                    </div>
                    <div class="flex flex-col w-full mt-4">
                        <label class="text-sm font-bold text-cyan-900">Reminder Due Date</label>
                        <input class="w-full px-4 py-2 mt-2 border ${error ? 'error' : 'border-cyan-200'} rounded-lg"
                               pond-keyup="${objectAction('setDate')}" type="date"
                               pond-value="${dueDate.toISOString().split('T')[0]}">
                    </div>
                    <div class="flex items-center justify-center w-full mt-4">
                        <button class="px-4 py-2 text-sm font-bold text-cyan-100 bg-cyan-500 rounded-lg"
                                pond-click="${action('upsert')}">
                            ${id ? 'Edit Reminder' : 'Add Reminder'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
