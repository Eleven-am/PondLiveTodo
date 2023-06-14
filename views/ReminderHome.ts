import {homeContext, reminderDatabase, searchContext} from "../controller/database";
import {html, useAction, useRouter, useServerInfo} from "@eleven-am/pondlive";
import {ReminderCard} from "./ReminderCard";
import {DeleteReminderModal} from "./DeleteReminder";
import {UpdateReminderModal} from "./UpdateRminder";
import {Component} from "@eleven-am/pondlive/types";

export const ReminderHome: Component = (ctx) => {
    const [search] = useServerInfo(ctx, searchContext);
    const routes = useRouter([{
        path: '/deleteReminder',
        component: DeleteReminderModal
    }, {
        path: '/editReminder/:id',
        component: UpdateReminderModal
    }, {
        path: '/addReminder/:id',
        component: UpdateReminderModal
    }]);

    ctx.onMount((req, res) => {
        res.setPageTitle('PondLive Reminders');
        homeContext.assign(req, {
            active: true,
        })
    });

    ctx.onUnmount((event) => {
        homeContext.assign(event, {
            active: null,
        });
    })

    const [_a, action] = useAction(ctx, undefined, {
        toggleComplete: (event) => {
            const reminder = reminderDatabase.get(event, Number(event.data.dataId));
            if (reminder) {
                reminder.completed = !reminder.completed;
                reminderDatabase.upsert(event, reminder);
            }
        }
    });

    return html`
        <div class="flex flex-col mt-6">
            ${reminderDatabase.query(ctx, search.query)
                    .map(item => ({
                        ...item,
                        elapsed: item.date.getTime() - Date.now() < 0
                    }))
                    .map(reminder => ReminderCard(reminder, action('toggleComplete')))}
        </div>
        ${routes(ctx)}
    `;
}
