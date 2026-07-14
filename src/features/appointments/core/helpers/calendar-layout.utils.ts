// core/utils/calendar-layout.utils.ts
import { differenceInMinutes, max, min } from "date-fns";

interface GetTimeBlockLayoutParams {
    /** Hora de inicio real del evento */
    startTime: Date | string;
    /** Hora de fin real del evento */
    endTime: Date | string;
    /** Día de la columna en la que se está renderizando */
    currentColumnDate: Date;
    /** Hora (0-23) en la que empieza la grilla visible */
    startHour: number;
    /** Hora (0-23) en la que termina la grilla visible */
    endHour?: number;
    /** Rem por bloque de `minutesPerRow` minutos */
    rowHeightRem: number;
    /** Minutos que representa cada `rowHeightRem` (default 150) */
    minutesPerRow?: number;
    /** Separación visual entre bloques, en rem (default 0.2) */
    gapRem?: number;
    /** Altura mínima (antes de aplicar el gap) para considerar el bloque visible */
    minVisibleHeightRem?: number;
}

export interface TimeBlockLayout {
    /** Inicio efectivo, recortado contra los límites de la grilla */
    effectiveStart: Date;
    /** Fin efectivo, recortado contra los límites de la grilla */
    effectiveEnd: Date;
    /** Offset superior en rem, listo para usarse en `style.top` */
    top: number;
    /** Alto en rem (ya con el gap aplicado), listo para usarse en `style.height` */
    height: number;
    /** Si el bloque tiene alto suficiente para renderizarse */
    isVisible: boolean;
}

/**
 * Calcula la posición y el alto (en rem) de un bloque de tiempo dentro de una
 * columna de calendario, recortando el evento contra los límites de la grilla
 * visible (startHour/endHour) del día actual.
 */
export function getTimeBlockLayout({
    startTime,
    endTime,
    currentColumnDate,
    startHour,
    endHour = 20,
    rowHeightRem,
    minutesPerRow = 150,
    gapRem = 0.2,
    minVisibleHeightRem = 0.5,
}: GetTimeBlockLayoutParams): TimeBlockLayout {
    const startBase = new Date(currentColumnDate);
    startBase.setHours(startHour, 0, 0, 0);

    const endBase = new Date(currentColumnDate);
    endBase.setHours(endHour, 0, 0, 0);

    const absoluteStart = new Date(startTime);
    const absoluteEnd = new Date(endTime);

    const effectiveStart = max([absoluteStart, startBase]);
    const effectiveEnd = min([absoluteEnd, endBase]);

    const minutesFromStart = differenceInMinutes(effectiveStart, startBase);
    const durationMinutes = differenceInMinutes(effectiveEnd, effectiveStart);

    const rawTop = (minutesFromStart * rowHeightRem) / minutesPerRow;
    const rawHeight = (durationMinutes * rowHeightRem) / minutesPerRow;

    const clampedTop = Math.max(0, rawTop);
    const clampedHeight = rawTop < 0 ? rawHeight + rawTop : rawHeight;

    return {
        effectiveStart,
        effectiveEnd,
        top: clampedTop,
        height: clampedHeight - gapRem,
        isVisible: clampedHeight >= minVisibleHeightRem,
    };
}

interface GetEventLayoutParams {
    /** Hora de inicio real del evento */
    startTime: Date | string;
    /** Hora de fin real del evento */
    endTime: Date | string;
    /** Hora (0-23) en la que empieza la grilla visible */
    startHour: number;
    /** Rem por bloque de `minutesPerRow` minutos */
    rowHeightRem: number;
    /** Minutos que representa cada `rowHeightRem` (default 150) */
    minutesPerRow?: number;
}

export interface EventLayout {
    /** Fecha de inicio como objeto Date */
    start: Date;
    /** Fecha de fin como objeto Date */
    end: Date;
    /** Offset superior en rem, listo para usarse en `style`/props */
    topOffset: number;
    /** Alto en rem, listo para usarse en `style`/props */
    height: number;
}

/**
 * Calcula la posición y el alto (en rem) de un evento dentro de una columna
 * de calendario, sin recortar contra los límites de la grilla visible.
 * Útil para vistas donde el evento siempre cae dentro del rango mostrado.
 */
export function getEventLayout({
    startTime,
    endTime,
    startHour,
    rowHeightRem,
    minutesPerRow = 150,
}: GetEventLayoutParams): EventLayout {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const startBase = new Date(start);
    startBase.setHours(startHour, 0, 0, 0);

    const minutesFromStart = differenceInMinutes(start, startBase);
    const durationMinutes = differenceInMinutes(end, start);

    const topOffset = (minutesFromStart * rowHeightRem) / minutesPerRow;
    const height = (durationMinutes * rowHeightRem) / minutesPerRow;

    return { start, end, topOffset, height };
}