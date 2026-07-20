import React from 'react';
import styles from './page.module.css';

export default function InstitucionalPage() {
  const mockNews = [
    {
      id: 1,
      date: '20 Jul 2026',
      title: '¡Gran victoria de la Primera División!',
      snippet: 'El equipo de fútbol se impuso por 3 a 1 en el clásico, demostrando gran carácter y juego colectivo...',
      img: '/images/futbol.png',
      link: 'https://instagram.com/alumniorenseoficial'
    },
    {
      id: 2,
      date: '18 Jul 2026',
      title: 'Nuevas obras en el Trinquete',
      snippet: 'Comenzaron las remodelaciones en nuestra histórica cancha de pelota paleta para brindar mayor comodidad...',
      img: '/images/paleta.png',
      link: 'https://instagram.com/alumniorenseoficial'
    },
    {
      id: 3,
      date: '15 Jul 2026',
      title: 'Torneo Regional de Pádel',
      snippet: 'Este fin de semana recibimos a más de 50 parejas en nuestras instalaciones para disputar el torneo...',
      img: '/images/padel.png',
      link: 'https://instagram.com/alumniorenseoficial'
    },
    {
      id: 4,
      date: '10 Jul 2026',
      title: 'Inscripciones abiertas para Inferiores',
      snippet: 'Arranca la segunda mitad del año y abrimos cupos para que los más chicos se sumen al Básquet y Fútbol...',
      img: '/images/basquet.png',
      link: 'https://instagram.com/alumniorenseoficial'
    }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Institucional</h1>
        <p className={styles.subtitle}>
          Conocé la historia, los valores y las instalaciones de nuestro querido Club Alumni de Orense.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.aboutSection}>
          <h2>Nuestro Club: Más de un siglo de pasión y deporte</h2>
          <p>
            Fundado el 31 de mayo de 1922, el Club Alumni de Orense es el corazón deportivo y social de nuestra comunidad. Con más de cien años de historia y trayectoria, nos enorgullece ser un espacio de encuentro, crecimiento y pertenencia para todas las familias de Orense y la región.
          </p>
          <p>
            Nuestra misión principal es fomentar los valores del deporte, el respeto, el compañerismo y el esfuerzo, brindando un lugar seguro y de calidad para que personas de todas las edades puedan desarrollar sus pasiones.
          </p>

          <h3>Nuestras Disciplinas</h3>
          <p>En el Club Alumni respiramos deporte. A lo largo de los años, hemos crecido para ofrecer una amplia variedad de actividades a nuestros socios:</p>
          <ul>
            <li><strong>Fútbol:</strong> La pasión de multitudes, presente en cada rincón de nuestra institución.</li>
            <li><strong>Básquet:</strong> Competencia, agilidad y trabajo en equipo.</li>
            <li><strong>Pelota Paleta:</strong> Tradición y destreza física que se mantiene viva.</li>
            <li><strong>Pádel:</strong> Un espacio dinámico para disfrutar entre amigos o en competencia.</li>
          </ul>
          <p>Y muchas otras actividades sociales y deportivas que le dan vida al club todos los días.</p>

          <h3>El Semillero: Nuestro Orgullo</h3>
          <p>
            Creemos firmemente que el futuro está en los más chicos. Por eso, apostamos con mucha fuerza a nuestras categorías formativas (inferiores) en las disciplinas de Fútbol y Básquet. Trabajamos día a día para formar no solo grandes deportistas, sino también excelentes personas. Nuestros profesores y técnicos están comprometidos con la educación integral de cada niño y joven que viste nuestra camiseta.
          </p>

          <h3>Nuestras Instalaciones</h3>
          <p>El club es nuestra segunda casa. Para acompañar el desarrollo de todas nuestras disciplinas, contamos con una infraestructura completa, preparada para recibir tanto a nuestros deportistas como a quienes vienen a alentar:</p>
          <ul className={styles.facilitiesList}>
            <li>🏟️ <strong>Cancha de Fútbol:</strong> El escenario donde vivimos nuestras mayores emociones de domingo.</li>
            <li>🏀 <strong>Cancha de Básquet:</strong> Equipada para entrenamientos exigentes y partidos oficiales.</li>
            <li>🎾 <strong>Cancha de Pádel:</strong> Instalaciones ideales para la práctica constante.</li>
            <li>🧱 <strong>Cancha de Pelota Paleta:</strong> Un frontón histórico, cuidado y siempre listo para el juego.</li>
          </ul>

          <h3>¡Sumate a la familia de Alumni!</h3>
          <p>
            Las puertas de nuestro club están siempre abiertas para quienes quieran hacer deporte, alentar a nuestros equipos o simplemente compartir un buen momento en comunidad. ¡Te esperamos!
          </p>
        </div>

        <div className={styles.newsSection}>
          <h2 className={styles.newsSectionTitle}>Últimas Novedades Institucionales</h2>
          <div className={styles.newsGrid}>
            {mockNews.map(news => (
              <a key={news.id} href={news.link} target="_blank" rel="noopener noreferrer" className={styles.newsCard}>
                <div className={styles.newsImage} style={{ backgroundImage: `url(${news.img})` }}></div>
                <div className={styles.newsBody}>
                  <span className={styles.newsDate}>{news.date}</span>
                  <h3 className={styles.newsTitle}>{news.title}</h3>
                  <p className={styles.newsSnippet}>{news.snippet}</p>
                  <span className={styles.readMore}>Leer nota completa →</span>
                </div>
              </a>
            ))}
          </div>
          
          <div className={styles.disclaimer}>
            <p>
              ℹ️ <strong>Nota Técnica:</strong> En la versión final, este módulo se conectará a la cuenta de Instagram 
              <em> @alumniorenseoficial </em> para cargar las novedades automáticamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
