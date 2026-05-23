export function throwGoogleCalendarError(error: unknown, eventId: string) {
    if (typeof error === 'object' && error !== null && 'code' in error) {
        const apiError = error as { code: number; message?: string };

        if (apiError.code === 404 || apiError.code === 410) {
            console.warn(`El evento ${eventId} ya había sido eliminado.`);
            return { success: true };
        }
    }

    if (error instanceof Error) {
        console.error('Error genuino en la API de Google:', error);
        return { success: false, message: error.message };
    }

    console.error('Error desconocido:', error);
    return { success: false, message: 'Ocurrió un error desconocido al comunicarse con Google.' };
}
