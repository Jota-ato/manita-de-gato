import { startOfWeek, endOfWeek } from "date-fns";
import { tz } from "@date-fns/tz";


const TIMEZONE = "America/Mexico_City";
/**
 * Returns the start (Monday 00:00:00) and end (Sunday 23:59:59)
 * of the current week in ISO 8601 format.
 *
 * @returns An object with `weekStart` and `weekEnd` as ISO strings.
 */

export function getCurrentWeekRange(): { weekStart: string; weekEnd: string } {
    const now = new Date();

    const weekStart = startOfWeek(now, { weekStartsOn: 1, in: tz(TIMEZONE) });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1, in: tz(TIMEZONE) });     // Sunday 23:59:59.999

    return {
        weekStart: weekStart.toISOString(),
        weekEnd: weekEnd.toISOString(),
    };
}