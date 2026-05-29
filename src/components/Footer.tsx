export default function Footer() {
  return (
    <footer
      className="text-center mt-20 lg:mt-40 flex flex-col items-center"
      style={{ color: 'white' }}
    >
      <div
        className="line-footer"
        style={{ borderTop: '1px solid var(--bg-secondary)', width: '88%' }}
      />
      <div
        className="footer-container flex flex-col lg:flex-row justify-between items-center"
        style={{ width: '88%' }}
      >
        <p className="mt-8 mb-0 lg:my-8 text-sm md:text-base">
          © 2026 Joel Nicolás Morán. Todos los derechos reservados.
        </p>
        <p className="mt-1 mb-8 lg:my-8 text-sm md:text-base">
          Diseñado y desarrollado con 💚 y mucho ☕!
        </p>
      </div>
    </footer>
  );
}
