const educationItems = [
  {
    title: 'Full Stack Developer',
    institution: 'Fundacion Pescar',
    date: 'JUN 2026 - DIC 2026',
    description:
      'Formación desde los fundamentos web hasta tecnologías como Python, Django, React, MongoDB e Ingeniería de Software con IA. Complementada con un enfoque integral en habilidades blandas: construcción de marca personal, autoconocimiento y desarrollo profesional..',
    lineClass: 'linea',
  },
  {
    title: 'Node JS',
    institution: '<TalentoTech>',
    date: 'MAR 2026 - JUL 2026',
    description:
      'Formación en desarrollo backend con Node.js, Express, bases de datos, autenticación y despliegue.',
    lineClass: 'linea',
  },
  {
    title: 'React JS',
    institution: '<TalentoTech>',
    date: 'AGO 2025 - NOV 2025',
    description:
      'Desarrollo frontend con React, hooks, rutas, CRUD, autenticación, consumo de APIs y aproximación a Bootstrap.',
    lineClass: 'linea',
  },
  {
    title: 'Front-End con JavaScript',
    institution: '<TalentoTech>',
    date: 'MAR 2025 - JUL 2025',
    description: 'Formación en desarrollo web, HTML, CSS, JavaScript y diseño responsive.',
    lineClass: 'linea',
  },
  {
    title: 'Tecnico Universitario en Programación',
    institution: 'Universidad Tecnológica Nacional FRGP',
    date: 'AGO 2022 - DIC 2024',
    description:
      'Formación técnica en programación, bases de datos, desarrollo web e ingeniería de software.',
    lineClass: 'linea3',
  },
];

export default function Education() {
  return (
    <section id="educacion" className="flex flex-col px-[5%] mb-16">
      {/* Title */}
      <div className="flex items-center gap-4 mb-8">
        <svg
          role="img"
          fill="currentColor"
          style={{ width: '3rem', height: '2rem' }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path d="M249.8,85.49l-116-64a12,12,0,0,0-11.6,0l-116,64a12,12,0,0,0,0,21l21.8,12v47.76a19.89,19.89,0,0,0,5.09,13.32C46.63,194.7,77,220,128,220a136.88,136.88,0,0,0,40-5.75V240a12,12,0,0,0,24,0V204.12a119.53,119.53,0,0,0,30.91-24.51A19.89,19.89,0,0,0,228,166.29V118.53l21.8-12a12,12,0,0,0,0-21ZM128,45.71,219.16,96,186,114.3a1.88,1.88,0,0,1-.18-.12l-52-28.69a12,12,0,0,0-11.6,21l39,21.49L128,146.3,36.84,96ZM128,196c-40.42,0-64.65-19.07-76-31.27v-33l70.2,38.74a12,12,0,0,0,11.6,0L168,151.64v37.23A110.46,110.46,0,0,1,128,196Zm76-31.27a93.21,93.21,0,0,1-12,10.81V138.39l12-6.62Z" />
        </svg>
        <h2 className="text-2xl font-bold">Educación</h2>
      </div>

      {educationItems.map((item, index) => (
        <div className="timeline-item" key={index}>
          <div className="linea-tiempo">
            <div className="timeline-dot" />
            <div className={item.lineClass} />
          </div>
          <div className="timeline-content">
            <h3>{item.title}</h3>
            <p className="institution">{item.institution}</p>
            <span className="date">{item.date}</span>
            <p className="date">{item.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
