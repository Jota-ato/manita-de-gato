// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // 1. Clonamos la respuesta inicial para poder mutarla
    let supabaseResponse = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // 2. Inicializamos el cliente de Supabase
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_PUBLISHABLE_KEY!, // Corregido: Usamos la Anon Key
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    // Actualizamos las cookies en la PETICIÓN (para los Server Components que corren después)
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );

                    // Actualizamos la RESPUESTA (para sincronizar el navegador)
                    supabaseResponse = NextResponse.next({
                        request,
                    });

                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // 3. getUser() valida de forma segura el JWT en el servidor
    const { data: { user }, error } = await supabase.auth.getUser();

    // 4. Lógica de redirección basada en roles/estado
    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
    const isLoginRoute = request.nextUrl.pathname === '/login';

    if (!user && isDashboardRoute) {
        // Redirigimos al usuario a /login, conservando la URL original a la que intentaba acceder (opcional pero recomendado)
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    }

    if (user && isLoginRoute) {
        // Si ya está autenticado, no tiene sentido que vea el login
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return supabaseResponse;
}

export const config = {
    // Es mejor excluir explícitamente los archivos estáticos e imágenes para no saturar Supabase con peticiones innecesarias
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};