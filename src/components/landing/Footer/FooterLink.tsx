import { clsx, type ClassValue } from "clsx";

interface FooterLinkProps { 
    link: string
    label: string
    className?: ClassValue
}

export default function FooterLink({className, link, label, ...props } : FooterLinkProps) {
    return (
        <a
            href={link} target="_blank"
            rel="noreferrer"
            className={clsx(className)}
            {...props}
        >
            {label}
        </a>
    )
}