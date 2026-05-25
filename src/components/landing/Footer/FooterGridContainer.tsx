import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterSlogan from "./FooterSlogan";

export default function FooterGridContainer() {
    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <FooterSlogan />
            <FooterContact />
            <FooterLinks />
        </div>
    )
}