import {createContext, LiveSocket} from "@eleven-am/pondlive";

interface ElapsedContext {
    data: Set<{
        id: number,
        elapsed: string
    }>
}

/**
 * This is the context manager for the elapsed reminders
 * The create context function returns a tuple of the consumer and provider
 * The first is the consumer that can be used to modify the state of the context from anywhere
 * The second is the provider that makes the context available to the components
 * @type [ContextConsumer<ContextType>, ContextProvider];
 *
 * The provider is passed to the highest level component that needs access to the context
 * Any component that needs access to the context must be a child of the component that has the provider
 *
 * The consumer is used to modify the state of the context from anywhere
 * To use the consumer, you must first import it from file where it was created
 */
const [elapsedConsumer, elapsedProvider] = createContext<ElapsedContext>({
    data: new Set()
});

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

export const database: Todo[] = [testTodo, testTodo2];

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

/**
 * @desc This is the manager factory, Has nothing to do with PondSocket, thus no documentation
 * @param socket
 * @param reminders
 */
const monitorReminders = (socket: LiveSocket<any>, reminders: Reminder[]) => {
    const now = new Date();
    const set = new Set<{id: number, elapsed: string}>();

    reminders.forEach(reminder => {
        const diff = reminder.date.getTime() - now.getTime();
        reminder.countDown = diff;
        if (diff <= 0 && !reminder.completed) {
            reminder.elapsed = true;
            set.add({
                id: reminder.id,
                elapsed: `${reminder.text} is elapsed, it was due on ${reminder.date.toDateString()}`
            });

        } else if (reminder.elapsed)
            reminder.elapsed = false;
    });
    elapsedConsumer.assign(socket, {data: set});
}

export interface ReminderManagerType {
    unsubscribe: () => void;
    addReminder: (reminder: Reminder) => void;
    removeReminder: (id: number) => void;
    updateReminder: (id: number, reminder: Reminder) => void;
    findReminder: (id: number) => Reminder | undefined;
    getReminders: () => Reminder[];
}

const ReminderManager = (socket: LiveSocket<any>): ReminderManagerType => {
    let reminders = [testReminder, testReminder2];

    monitorReminders(socket, reminders);

    const interval = setInterval(() => {
        monitorReminders(socket, reminders);
    }, 100);

    return {
        unsubscribe: () => {
            clearInterval(interval);
        },

        addReminder: (reminder: Reminder) => {
            reminders.push(reminder);
        },

        removeReminder: (id: number) => {
            reminders = reminders.filter(reminder => reminder.id !== id);
        },

        updateReminder: (id: number, reminder: Reminder) => {
            reminders = reminders.map(data => data.id === id ? reminder : data);
        },

        findReminder: (id: number) => {
            return reminders.find(data => data.id === id);
        },

        getReminders: () => {
            return reminders;
        }
    }
}

const ManagerFactory = () => {
    const managers = new Map<string, ReminderManagerType>();

    return {
        getManager: (socket: LiveSocket<any>) => {
            const id = socket.clientId;
            if (!managers.has(id)) {
                managers.set(id, ReminderManager(socket));
            }

            return managers.get(id) as ReminderManagerType;
        }
    }
}

export const ReminderManger = ManagerFactory();

export {elapsedProvider, elapsedConsumer};
