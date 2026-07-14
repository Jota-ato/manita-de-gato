import { differenceInMinutes } from "date-fns";

export function getMinutesDiffFromNow(timestampMs: number) { 
    return differenceInMinutes(new Date(timestampMs), new Date())
}