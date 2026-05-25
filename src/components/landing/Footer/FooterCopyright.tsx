export default function FooterCopyright() {
    return (
        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-600">
            © {new Date().getFullYear()} Manita de Gato. Todos los derechos reservados.
        </div>
    )
}