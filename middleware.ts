import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll: (cookies) =>
                    cookies.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    ),
            },
        }
    );

    // getUser() verifica el JWT contra Supabase — más seguro que getSession()
    // que solo lee la cookie sin validarla en el servidor
    const { data: { user } } = await supabase.auth.getUser();

    if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Evita que un usuario ya autenticado vea la pantalla de login
    if (user && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response;
}

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};