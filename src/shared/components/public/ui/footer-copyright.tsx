export function FooterCopyright() {
  return (
    <div className="border-t border-muted mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground font-light">
      <p>©2026 Todos los derechos reservados</p>
      <a
        href="https://www.julio-zavala.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        Página realizada por{" "}
        <span className="font-bold text-primary">Julio Zavala</span>
      </a>
    </div>
  );
}
