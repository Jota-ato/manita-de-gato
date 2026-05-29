'use client';

import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export default function ThemeProvider({
    children,
    ...props
}: ComponentProps<typeof NextThemesProvider>) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    // 4. Una vez montado en el cliente, renderizamos el proveedor con total seguridad
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}