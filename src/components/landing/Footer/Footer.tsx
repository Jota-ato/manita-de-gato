import FooterCopyright from "./FooterCopyright";
import FooterGridContainer from "./FooterGridContainer";


export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
            <FooterGridContainer />
            <FooterCopyright />
        </footer>
    )
}