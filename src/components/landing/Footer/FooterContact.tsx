import FooterLink from "./FooterLink";

export default function FooterContact() {
    return (
        <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="font-semibold text-slate-200 mb-2">Contacto</h4>
            <FooterLink
                label={`WhatsApp: (+52) ${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}`}
                link={process.env.NEXT_WHATSAPP_URL!}
                className='text-sm transition-color duration-300 hover:text-green-300 cursor-pointer'
            />
        </div>
    )
}