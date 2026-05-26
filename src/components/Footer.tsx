export default function Footer() {
  return (
    <footer
      className="text-center mt-40 flex flex-col items-center"
      style={{ color: 'white' }}
    >
      <div
        className="line-footer"
        style={{ borderTop: '1px solid var(--bg-secondary)', width: '88%' }}
      />
      <div
        className="footer-container flex justify-between items-center"
        style={{ width: '88%' }}
      >
        <p style={{ margin: '2rem 0' }}>
          © 2025 Joel Nicolás Morán. Todos los derechos reservados.
        </p>
        <p style={{ margin: '2rem 0' }}>
          Diseñado y desarrollado con 💚 y mucho ☕!
        </p>
      </div>
    </footer>
  );
}
