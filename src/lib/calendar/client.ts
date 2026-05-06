import { google } from "googleapis";

/**
 * Creates and returns an authenticated Google Calendar API client.
 *
 * Uses a service account (JWT) for server-to-server authentication.
 * Credentials are read from environment variables to avoid hardcoding secrets.
 *
 * Required environment variables:
 * - `GOOGLE_PRIVATE_KEY`: The service account's private key (with escaped `\n`).
 * - `GOOGLE_CLIENT_EMAIL`: The service account's email address.
 *
 * @returns An authenticated Google Calendar v3 client instance.
 */
export function getCalendarClient() {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/calendar.events"],
    });

    return google.calendar({ version: "v3", auth });
}