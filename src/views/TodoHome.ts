import {html, useAction, useRouter, useServerInfo, useState} from "@eleven-am/pondlive";
import {searchContext, homeContext, Todo, todoDatabase, todosContext} from "../controller/database";
import {UpdateTodoModal} from "./UpdateTodo";
import {TodoCard} from "./TodoCard";
import {DeleteTodoModal} from "./DeleteTodo";
import {Component} from "@eleven-am/pondlive/types";

export const TodoHome: Component = (ctx) => {
    const [todos, _, setTodosOnServer] = useState<Todo[]>(ctx, []);
    const [_y, _yy, effect] = useServerInfo(ctx, searchContext);
    const [_x, _xx, todosEffect] = useServerInfo(ctx, todosContext);

    const routes = useRouter([{
        path: '/addTodo',
        component: UpdateTodoModal
    }, {
        path: '/deleteTodo/:id',
        component: DeleteTodoModal
    }, {
        path: '/editTodo/:id',
        component: UpdateTodoModal
    }]);

    ctx.onMount((req, res) => {
        res.setPageTitle('PondLive Todo');
        setTodosOnServer(req, todoDatabase.getAll(req));
        homeContext.assign(req, {
            active: false,
        });
    });

    ctx.onUnmount((event) => {
        homeContext.assign(event, {
            active: null,
        });
    })

    const [_a, action] = useAction(ctx, undefined, {
        toggleComplete: (event) => {
            const todo = todoDatabase.get(event, Number(event.data.dataId));
            if (todo) {
                todo.completed = !todo.completed;
                todoDatabase.upsert(event, todo);
                setTodosOnServer(event, todoDatabase.getAll(event));
            }
        }
    });

    effect((data, event) => {
        if (data.query !== '') {
            const todos = todoDatabase.query(event, data.query);
            setTodosOnServer(event, todos);
        } else {
            setTodosOnServer(event, todoDatabase.getAll(event));
        }
    });

    todosEffect((change, event) => {
        setTodosOnServer(event, change);
    });

    return html`
        <div class="flex flex-col mt-6">
            ${todos.map(todo => TodoCard(todo, action('toggleComplete')))}
        </div>
        ${routes(ctx)}
    `;
}
