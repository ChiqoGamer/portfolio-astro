const experiences = [
  {
    title: 'Docente Auxiliar – Programación I C++',
    institution: 'Universidad Tecnológica Nacional FRGP',
    date: 'AGO 2023 - Actualmente',
    description:
      'Colaboro en el dictado de clases teóricas y prácticas, asistencia a estudiantes, corrección de evaluaciones y resolución de dudas.',
    lineClass: 'linea-EXP',
  },
  {
    title: 'Profesor Particular de Programación',
    institution: 'Autónomo',
    date: 'ABR 2024 - Actualmente',
    description:
      'Brindo clases personalizadas a estudiantes universitarios, enfocadas en lógica de programación, diagramas de flujo y resolución de ejercicios prácticos, acompañando su formación académica.',
    lineClass: 'linea-EXP',
  },
  {
    title: 'Developer',
    institution: 'Colidevs Startup',
    date: 'AGO 2024 - Actualmente',
    description:
      'Desarrollo de la landing page de la empresa con Astro y Tailwind CSS, enfocada en performance, diseño responsive y posicionamiento SEO, dentro de un equipo con visión de crecimiento y desarrollo de productos digitales.',
    lineClass: 'linea3-EXP',
  },
];

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="flex flex-col px-[5%] mb-16"
    >
      {/* Title */}
      <div className="flex items-center gap-4 mb-6">
        <svg
          role="img"
          fill="currentColor"
          style={{ width: '3rem', height: '2rem' }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path d="M100,100a12,12,0,0,1,12-12h32a12,12,0,0,1,0,24H112A12,12,0,0,1,100,100ZM236,68V196a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V68A20,20,0,0,1,40,48H76V40a28,28,0,0,1,28-28h48a28,28,0,0,1,28,28v8h36A20,20,0,0,1,236,68ZM100,48h56V40a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4ZM44,72v35.23A180.06,180.06,0,0,0,128,128a180,180,0,0,0,84-20.78V72ZM212,192V133.94A204.27,204.27,0,0,1,128,152a204.21,204.21,0,0,1-84-18.06V192Z" />
        </svg>
        <h2 className="text-2xl font-bold">Experiencia</h2>
      </div>

      {/* Timeline items */}
      {experiences.map((exp, index) => (
        <div className="timeline-item" key={index}>
          <div className="linea-tiempo">
            <div className="timeline-dot" />
            <div className={exp.lineClass} />
          </div>
          <div className="timeline-content">
            <h3>{exp.title}</h3>
            <p className="institution">{exp.institution}</p>
            <span className="date">{exp.date}</span>
            <p className="date">{exp.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
