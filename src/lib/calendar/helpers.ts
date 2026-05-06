/**
 * Returns the start (Monday 00:00:00) and end (Sunday 23:59:59)
 * of the current week in ISO 8601 format.
 *
 * @returns An object with `weekStart` and `weekEnd` as ISO strings.
 */
export function getCurrentWeekRange(): { weekStart: string; weekEnd: string } {
    const now = new Date();
    const day = now.getDay(); 

    const diffToMonday = day === 0 ? -6 : 1 - day; 

    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return {
        weekStart: monday.toISOString(),
        weekEnd: sunday.toISOString(),
    };
}