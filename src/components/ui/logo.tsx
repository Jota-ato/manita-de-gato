import { clsx, type ClassValue } from "clsx";
import Image from "next/image";

interface LogoProps {
    width?: number;
    height?: number;
    className?: ClassValue; // Permite strings, arrays o condicionales de clsx
}

export default function Logo({ width, height, className, ...props }: LogoProps) {
    return (
        <Image
            src="/logos/logo.png"
            alt="Manita de gato"
            width={width || 16}
            height={height || 16}
            className={clsx(className)}
            {...props}
        />
    );
}