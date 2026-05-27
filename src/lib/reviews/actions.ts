'use server';

interface GoogleReview {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
}

interface ReviewsResponse {
    rating: number;
    reviews: GoogleReview[];
    error?: string;
}

export async function getGoogleReviews(): Promise<ReviewsResponse> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        return { rating: 0, reviews: [], error: 'Faltan configuraciones de Google API' };
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,reviews&reviews_sort=newest&lang=es&key=${apiKey}`;

    try {
        // Al usar fetch en Next.js, sigue aplicando el caché de 24 horas automáticamente
        const response = await fetch(url, {
            next: { revalidate: 86400 }
        });

        const data = await response.json();

        if (data.status !== 'OK') {
            return { rating: 0, reviews: [], error: data.error_message || 'Error de Google API' };
        }

        return {
            rating: data.result.rating || 0,
            reviews: data.result.reviews || []
        };
    } catch (error) {
        console.error('Error al obtener reseñas de Google:', error);
        return { rating: 0, reviews: [], error: 'Error interno del servidor' };
    }
}