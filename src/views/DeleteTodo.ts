import {todoDatabase} from "../controller/database";
import {html, useAction, useState} from "@eleven-am/pondlive";
import {Component} from "@eleven-am/pondlive/types";

export const DeleteTodoModal: Component = (ctx) => {
    const [id, __, setIdOnServer] = useState(ctx, 0);
    const [name, ___, setNameOnServer] = useState(ctx, '');

    ctx.onMount((req, res) => {
        setIdOnServer(req, Number(req.params.id));
        const todo = todoDatabase.get(req, Number(req.params.id));

        if (!todo) {
            res.navigateTo('/todo');
            return;
        }

        setNameOnServer(req, todo.text);
    })

    const [_, action] = useAction(ctx, undefined, {
        closeModal: (event) => event.navigateTo('/todo'),
        deleteTodo: (event) => todoDatabase.remove(event, id),
    });

    return html`
        <div class="flex flex-col items-center justify-center w-full h-full absolute left-0 top-0 bg-cyan-900 bg-opacity-70">
            <div class="flex flex-col items-center justify-center w-1/2 h-1/2 bg-cyan-100 rounded-lg">
                <div class="flex items-center justify-between w-full px-4 py-2 border-b border-cyan-200">
                    <div class="text-lg font-bold text-cyan-900">Are you sure you want to delete ${name}?</div>
                </div>
                <div class="flex flex-col items-center justify-center w-full px-4 py-2">
                    <div class="flex items-center justify-center w-full mt-4 gap-x-4">
                        <button class="px-4 py-2 text-sm font-bold text-red-400 bg-red-100 rounded-lg"
                            pond-click="${action('closeModal')}">Cancel
                        </button>
                        <button class="px-4 py-2 text-sm font-bold text-cyan-100 bg-cyan-500 rounded-lg"
                            pond-click="${action('deleteTodo')}">Delete Todo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
