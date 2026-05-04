// app/api/citas/route.ts
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface DetallesCita {
    clientName: string;
    serviceName: string;
    phone: string;
    startTime: string; // ISO 8601, ej. "2026-05-04T10:00:00-06:00"
    endTime: string;
}

// ─── Cliente de Google Calendar (singleton) ───────────────────────────────────

function getCalendarClient() {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/calendar.events"],
    });

    return google.calendar({ version: "v3", auth });
}

// ─── Lógica de negocio ────────────────────────────────────────────────────────

async function crearCitaEnGoogle(detallesCita: DetallesCita): Promise<string> {
    const calendar = getCalendarClient();

    const response = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: {
            summary: `Cita de Uñas - ${detallesCita.clientName}`,
            description: `Servicio: ${detallesCita.serviceName}\nTeléfono: ${detallesCita.phone}`,
            start: { dateTime: detallesCita.startTime },
            end: { dateTime: detallesCita.endTime },
        },
    });

    if (!response.data.id) {
        throw new Error("Google Calendar no devolvió un ID de evento.");
    }

    return response.data.id;
}

// ─── Validación ───────────────────────────────────────────────────────────────

function validarBody(body: unknown): body is DetallesCita {
    if (!body || typeof body !== "object") return false;
    const b = body as Record<string, unknown>;

    const camposRequeridos: (keyof DetallesCita)[] = [
        "clientName",
        "serviceName",
        "phone",
        "startTime",
        "endTime",
    ];

    return camposRequeridos.every(
        (campo) => typeof b[campo] === "string" && (b[campo] as string).trim() !== ""
    );
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
    try {
        const body: unknown = await request.json();

        if (!validarBody(body)) {
            return NextResponse.json(
                {
                    error: "Cuerpo inválido. Se requieren: clientName, serviceName, phone, startTime, endTime.",
                },
                { status: 400 }
            );
        }

        const googleEventId = await crearCitaEnGoogle(body);

        return NextResponse.json(
            { success: true, googleEventId },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error al crear cita:", error);

        return NextResponse.json(
            { error: "Error interno al crear la cita en Google Calendar." },
            { status: 500 }
        );
    }
}