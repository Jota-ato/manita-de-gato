import Image from "next/image";

export default function Logo({ width, height }: { width: number, height: number }) {
    return (
        <Image
            src="/logos/logo.png"
            alt="Manita de gato"
            width={width}
            height={height}
        />
    )
}