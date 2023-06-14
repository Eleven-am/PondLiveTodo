import {createClientContext, useAction, useServerInfo} from "@eleven-am/pondlive";
import {HookContext, LiveContext, ServerContext} from "@eleven-am/pondlive/types";

export interface Todo {
    id: number;
    text: string;
    description: string;
    completed: boolean;
    date: Date;
}

const testTodo: Todo = {
    id: 1,
    text: 'Test Todo',
    description: 'This is a test todo, it is not completed, and it is not important',
    completed: false,
    date: new Date()
}

const testTodo2: Todo = {
    id: 2,
    text: 'Test Todo 2',
    description: 'This is a test todo, it is not completed, and it is not important',
    completed: false,
    date: new Date()
}

const todos: Todo[] = [testTodo, testTodo2];

export interface Reminder {
    id: number;
    text: string;
    description: string;
    elapsed: boolean;
    date: Date;
    completed: boolean;
    countDown: number;
}

const testReminder: Reminder = {
    id: 1,
    text: 'Test Reminder',
    description: 'This is a test reminder, it is not completed, and it is not important',
    elapsed: false,
    completed: false,
    date: new Date('2021-10-07T00:00:00.000Z'),
    countDown: 0
}

const testReminder2: Reminder = {
    id: 2,
    text: 'Test Reminder 2',
    description: 'This is a test reminder, it is not completed, and it is not important',
    elapsed: false,
    completed: false,
    date: new Date('2022-10-07T00:00:00.000Z'),
    countDown: 0
}

const reminders: Reminder[] = [testReminder, testReminder2];

interface DBObject {
    id: number;
    text: string;
    description: string;
    completed: boolean;
    date: Date;
}

interface Database<T extends DBObject> {
    remove: (event: HookContext, id: number) => void;
    upsert: (event: HookContext, data: T) => void;
    get: (event: HookContext, id: number) => T | undefined;
    query: (event: HookContext, query: string) => T[];
    getAll: (event: HookContext, ) => T[];
}

export const getDatabase = <T extends DBObject>(context: ServerContext<T[]>): Database<T> => {

    const remove = (event: HookContext, id: number) => {
        context.setState(event, (db) => db.filter(item => item.id !== id));
    }

    const upsert = (event: HookContext, item: T) => {
        context.setState(event, (data) => {
            const index = data.findIndex(i => i.id === item.id);
            if (index === -1) {
                item.id = data.length + 1;
                return [...data, item]
            }

            data[index] = item;
            return data;
        });
    }

    const query = (event: HookContext, query: string) => context.getState(event)
        .filter(item => item.text.toLowerCase()
            .includes(query.toLowerCase()));

    const get = (event: HookContext, id: number) => context.getState(event)
        .find(item => item.id === id);

    const getAll = (event: HookContext) => context.getState(event);

    return {
        remove,
        upsert,
        get,
        getAll,
        query
    }
}

export const todosContext = createClientContext<Todo[]>(todos);
export const remindersContext = createClientContext<Reminder[]>(reminders);
export const todoDatabase = getDatabase<Todo>(todosContext);
export const reminderDatabase = getDatabase<Reminder>(remindersContext);
export const searchContext = createClientContext<{ query: string }>({query: ''});
export const homeContext = createClientContext<{ active: boolean | null }>({active: null});

const defaultObject: DBObject = {
    id: 0,
    text: '',
    description: '',
    completed: false,
    date: new Date()
}

const upsertContext = createClientContext<DBObject>(defaultObject);

export const useUpsertHook = <T extends DBObject>(ctx: LiveContext, database: Database<T>, path: string, onAdd: (data: DBObject) => T) => {
    const [obj, setObjOnServer] = useServerInfo(ctx, upsertContext);

    const [error, action, setActionOnServer] = useAction(ctx, undefined, {
        closeModal: (event) => event.navigateTo(`/${path.toLowerCase()}`),
        upsert: (event): string | undefined => {
            const {id, text, description, date} = upsertContext.getState(event);
            if (!text || !description) {
                return 'Please fill out all fields';
            }

            const dataObject: DBObject = {
                id: id,
                text: text,
                description: description,
                date: date,
                completed: false,
            }

            database.upsert(event, onAdd(dataObject));
            event.navigateTo(`/${path.toLowerCase()}`);
        }
    });

    const [__, objectAction] = useAction(ctx, undefined, {
        setDate: (event) => setObjOnServer(event, { date: new Date(event.data.value ?? '') }),
        setText: (event) => setObjOnServer(event, { text: event.data.value ?? '' }),
        setDescription: (event) => setObjOnServer(event, { description: event.data.value ?? '' }),
    })

    const capitaliseFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

    ctx.onMount((req, res) => {
        const reqId = req.params.id;
        if (reqId) {
            const dataObject = database.get(req, Number(reqId));
            if (dataObject) {
                setObjOnServer(req, dataObject);
                res.setPageTitle(`Edit ${capitaliseFirstLetter(path)}: ${dataObject.text}`);
                return;
            }

            setActionOnServer(req, `No ${capitaliseFirstLetter(path)} with that id found`);
        }
    });

    ctx.onUnmount((event) => setObjOnServer(event, defaultObject))

    return {
        description: obj.description,
        dueDate: obj.date,
        text: obj.text,
        objectAction,
        id: obj.id,
        error,
        action
    }
}

interface Notification {
    monitor: (event: HookContext) => void;
    clear: (event: HookContext) => void;
}

interface NotificationContext {
    id: NodeJS.Timeout | null;
    data: Reminder[];
}

export const notificationContext = createClientContext<NotificationContext>({id: null, data: []});

function notification (): Notification {

    const getNotifications = (event: HookContext) => remindersContext.getState(event)
        .filter(item => !item.completed && !item.elapsed)
        .filter(item => item.date.getTime() - Date.now() < 0)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(item => ({
            ...item,
            elapsed: true,
            text: `${item.text} is due`
        }))

    const monitor = (event: HookContext) => {
        const interval = setInterval(() => {
            const data = getNotifications(event);
            notificationContext.assign(event, {data: data});
        }, 10000);

        notificationContext.assign(event, {
            id: interval,
            data: getNotifications(event)
        });
    }

    const clear = (event: HookContext) => {
        const id = notificationContext.getState(event).id;
        if (id) {
            clearInterval(id);
        }
    }

    return {
        monitor,
        clear,
    }
}

export const manager = notification();
