import { LiveSocket } from "pondsocket";
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
declare const elapsedProvider: import("pondsocket").ContextProvider;
export interface Todo {
    id: number;
    text: string;
    description: string;
    completed: boolean;
    date: Date;
}
export declare const database: Todo[];
export interface Reminder {
    id: number;
    text: string;
    description: string;
    elapsed: boolean;
    date: Date;
    completed: boolean;
    countDown: number;
}
export interface ReminderManagerType {
    unsubscribe: () => void;
    addReminder: (reminder: Reminder) => void;
    removeReminder: (id: number) => void;
    updateReminder: (id: number, reminder: Reminder) => void;
    findReminder: (id: number) => Reminder | undefined;
    getReminders: () => Reminder[];
}
export declare const ReminderManger: {
    getManager: (socket: LiveSocket<any>) => ReminderManagerType;
};
export { elapsedProvider };
