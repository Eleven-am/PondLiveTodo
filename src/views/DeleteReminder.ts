import {html, useAction, useState} from "@eleven-am/pondlive";
import {reminderDatabase} from "../controller/database";
import {Component} from "@eleven-am/pondlive/types";

export const DeleteReminderModal: Component = (ctx) => {
    const [id, _, setIdOnServer] = useState(ctx, 0);
    const [name, ___, setNameOnServer] = useState(ctx, '');

    ctx.onMount((req, res) => {
        const id = Number(req.params.id);
        const reminder = reminderDatabase.get(req, id);
        if (reminder) {
            setIdOnServer(req, id);
            setNameOnServer(req, reminder.text);
            return;
        }

        res.navigateTo('/reminder');
    })

    const [__, action] = useAction(ctx, undefined, {
        closeModal: (event) => event.navigateTo('/reminder'),
        deleteReminder: (event) => reminderDatabase.remove(event, id),
    })

    return html`
        <div class="flex flex-col items-center justify-center w-full h-full absolute left-0 top-0 bg-cyan-900 bg-opacity-70">
            <div class="flex flex-col items-center justify-center w-1/2 h-1/2 bg-cyan-100 rounded-lg">
                <div class="flex items-center justify-between w-full px-4 py-2 border-b border-cyan-200">
                    <div class="text-lg font-bold text-cyan-900">Are you sure you want to delete ${name}?</div>
                    <div class="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-200" pond-click="${action('closeModal')}">
                        <span class="material-symbols-outlined text-cyan-700 cursor-pointer">close</span>
                    </div>
                </div>
                <div class="flex flex-col items-center justify-center w-full px-4 py-2">
                    <div class="flex items-center justify-center w-full mt-4">
                        <button class="px-4 py-2 text-sm font-bold text-cyan-100 bg-cyan-500 rounded-lg" pond-click="${action('deleteReminder')}">Delete Reminder</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
