import React from 'react';
import styles from './page.module.css';

export default function NoticiasPage() {
  const mockNews = [
    {
      id: 1,
      date: '20 Jul 2026',
      title: '¡Gran victoria de la Primera División!',
      snippet: 'El equipo de fútbol se impuso por 3 a 1 en el clásico, demostrando gran carácter y juego colectivo...',
      img: '/images/futbol.png',
      link: 'https://instagram.com/delacunahastaelcajon2026'
    },
    {
      id: 2,
      date: '18 Jul 2026',
      title: 'Nuevas obras en el Trinquete',
      snippet: 'Comenzaron las remodelaciones en nuestra histórica cancha de pelota paleta para brindar mayor comodidad...',
      img: '/images/paleta.png',
      link: 'https://instagram.com/delacunahastaelcajon2026'
    },
    {
      id: 3,
      date: '15 Jul 2026',
      title: 'Torneo Regional de Pádel',
      snippet: 'Este fin de semana recibimos a más de 50 parejas en nuestras instalaciones para disputar el torneo...',
      img: '/images/padel.png',
      link: 'https://instagram.com/delacunahastaelcajon2026'
    },
    {
      id: 4,
      date: '10 Jul 2026',
      title: 'Inscripciones abiertas para Inferiores',
      snippet: 'Arranca la segunda mitad del año y abrimos cupos para que los más chicos se sumen al Básquet y Fútbol...',
      img: '/images/basquet.png',
      link: 'https://instagram.com/delacunahastaelcajon2026'
    },
    {
      id: 5,
      date: '05 Jul 2026',
      title: 'Nuevo Indumentaria Oficial',
      snippet: 'Ya está disponible la nueva camiseta del Club Alumni en la secretaría. ¡Acercate a buscar la tuya!',
      img: '/images/futbol.png',
      link: 'https://instagram.com/delacunahastaelcajon2026'
    },
    {
      id: 6,
      date: '01 Jul 2026',
      title: 'Cena Aniversario: Entradas a la venta',
      snippet: 'Festejamos un nuevo año de vida institucional. Reservá tu lugar para la gran cena show con toda la familia.',
      img: '/images/paleta.png',
      link: 'https://instagram.com/delacunahastaelcajon2026'
    }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Noticias del Club</h1>
        <p className={styles.subtitle}>
          Toda la actualidad deportiva e institucional. Cobertura oficial del club y de todo el deporte de Orense.
        </p>
      </div>

      <div className={styles.content}>
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
            ℹ️ <strong>Nota Técnica:</strong> En la versión final, este módulo se conectará automáticamente a la cuenta de Instagram 
            <em> @delacunahastaelcajon2026 </em> mediante la API Graph de Meta o un servicio de terceros (ej. Elfsight) 
            para que no tengas que cargar las noticias a mano.
          </p>
        </div>
      </div>
    </div>
  );
}
