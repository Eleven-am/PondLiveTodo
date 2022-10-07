import { Reminder } from "../controller/database";
/**
 * Sometimes it is useful to have a component that is not a live component
 * These components are not connected to the websocket and are only updated
 * When the live component it is rendered within is updated.
 *
 * This can be useful for code splitting and readability.
 * @constructor
 */
export declare const ReminderCard: (reminder: Reminder) => import("pondsocket").HtmlSafeString;
