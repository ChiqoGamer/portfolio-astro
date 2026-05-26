import { useState, useEffect, useRef } from 'react';

const navItems = [
  {
    href: '#inicio',
    label: 'Inicio',
    icon: (
      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z" />
      </svg>
    ),
  },
  {
    href: '#experiencia',
    label: 'Experiencia',
    icon: (
      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <path d="M100,100a12,12,0,0,1,12-12h32a12,12,0,0,1,0,24H112A12,12,0,0,1,100,100ZM236,68V196a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V68A20,20,0,0,1,40,48H76V40a28,28,0,0,1,28-28h48a28,28,0,0,1,28,28v8h36A20,20,0,0,1,236,68ZM100,48h56V40a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4ZM44,72v35.23A180.06,180.06,0,0,0,128,128a180,180,0,0,0,84-20.78V72ZM212,192V133.94A204.27,204.27,0,0,1,128,152a204.21,204.21,0,0,1-84-18.06V192Z" />
      </svg>
    ),
  },
  {
    href: '#proyectos',
    label: 'Proyectos',
    icon: (
      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <path d="M225.6,62.64l-88-48.17a19.91,19.91,0,0,0-19.2,0l-88,48.17A20,20,0,0,0,20,80.19v95.62a20,20,0,0,0,10.4,17.55l88,48.17a19.89,19.89,0,0,0,19.2,0l88-48.17A20,20,0,0,0,236,175.81V80.19A20,20,0,0,0,225.6,62.64ZM128,36.57,200,76,178.57,87.73l-72-39.42Zm0,78.83L56,76,81.56,62l72,39.41ZM44,96.79l72,39.4v76.67L44,173.44Zm96,116.07V136.19l24-13.13V152a12,12,0,0,0,24,0V109.92l24-13.13v76.65Z" />
      </svg>
    ),
  },
  {
    href: '#educacion',
    label: 'Educación',
    icon: (
      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <path d="M249.8,85.49l-116-64a12,12,0,0,0-11.6,0l-116,64a12,12,0,0,0,0,21l21.8,12v47.76a19.89,19.89,0,0,0,5.09,13.32C46.63,194.7,77,220,128,220a136.88,136.88,0,0,0,40-5.75V240a12,12,0,0,0,24,0V204.12a119.53,119.53,0,0,0,30.91-24.51A19.89,19.89,0,0,0,228,166.29V118.53l21.8-12a12,12,0,0,0,0-21ZM128,45.71,219.16,96,186,114.3a1.88,1.88,0,0,1-.18-.12l-52-28.69a12,12,0,0,0-11.6,21l39,21.49L128,146.3,36.84,96ZM128,196c-40.42,0-64.65-19.07-76-31.27v-33l70.2,38.74a12,12,0,0,0,11.6,0L168,151.64v37.23A110.46,110.46,0,0,1,128,196Zm76-31.27a93.21,93.21,0,0,1-12,10.81V138.39l12-6.62Z" />
      </svg>
    ),
  },
  {
    href: '#skills',
    label: 'Skills',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="icon" aria-hidden="true">
        <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z" />
        <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z" />
      </svg>
    ),
  },
  {
    href: '#contacto',
    label: 'Contacto',
    icon: (
      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <path d="M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z" />
      </svg>
    ),
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Intersection Observer para el active link
  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(
      (entries) => {
        let topSection = null;
        let minDistance = window.innerHeight;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
              minDistance = distance;
              topSection = entry.target;
            }
          }
        });

        if (topSection) {
          setActiveSection(topSection.getAttribute('id') || '');
        }
      },
      { threshold: [0.4] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className="box-border w-full px-6 py-5 flex justify-start sticky top-0 z-10 mb-[8%]"
        style={{
          backgroundColor: 'var(--bg-dark-semi)',
          backgroundImage: 'url(https://thelokin.dev/images/grainy.png)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center z-[1001] relative overflow-hidden">
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '25px', fontWeight: '600' }}>
            Joel
          </a>
          <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '25px', fontWeight: '600' }}>
            .dev
          </a>
        </div>

        {/* Hamburger icon */}
        <div
          className={`menu-icon lg:hidden ${menuOpen ? 'menu-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </div>

        {/* Nav */}
        <nav className={`navbar-glass ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === item.href.replace('#', '') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  {item.icon}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
