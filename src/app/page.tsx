import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            BIENVENIDO A <span className={styles.highlight}>CLUB ALUMNI</span>
          </h1>
          <p className={styles.subtitle}>
            El corazón deportivo de Orense. Viví la pasión, sumate a nuestra familia.
          </p>
          <div className={styles.heroActions}>
            <Link href="/socios/hacerse-socio" className="btn-primary">
              Hacerse Socio
            </Link>
            <Link href="/deportes/basquet" className={styles.btnSecondary}>
              Conocer Deportes
            </Link>
          </div>
        </div>
        <div className={styles.heroOverlay}></div>
      </section>

      <section className={styles.sportsSection}>
        <h2 className={styles.sectionTitle}>Nuestros Deportes</h2>
        <div className={styles.sportsGrid}>
          <Link href="/deportes/futbol" className={styles.sportCard}>
            <div className={styles.sportCardImage + " " + styles.futbolBg}></div>
            <div className={styles.sportCardContent}>
              <h3>Fútbol</h3>
              <p>El orgullo del club. Segunda división y gran semillero de inferiores.</p>
            </div>
          </Link>
          
          <Link href="/deportes/basquet" className={styles.sportCard}>
            <div className={styles.sportCardImage + " " + styles.basquetBg}></div>
            <div className={styles.sportCardContent}>
              <h3>Básquet</h3>
              <p>Primera división y todas las categorías de formativas.</p>
            </div>
          </Link>
          
          <Link href="/deportes/padel" className={styles.sportCard}>
            <div className={styles.sportCardImage + " " + styles.padelBg}></div>
            <div className={styles.sportCardContent}>
              <h3>Pádel</h3>
              <p>Torneos, clases y alquiler de canchas.</p>
            </div>
          </Link>

          <Link href="/deportes/pelota-paleta" className={styles.sportCard}>
            <div className={styles.sportCardImage + " " + styles.paletaBg}></div>
            <div className={styles.sportCardContent}>
              <h3>Pelota Paleta</h3>
              <p>Tradición y competencia en nuestro trinquete.</p>
            </div>
          </Link>
        </div>
      </section>

      <section className={styles.liveSection}>
        <div className={styles.liveContent}>
          <h2>Transmisiones en Vivo</h2>
          <p>No te pierdas ningún partido. Disfrutá de las transmisiones exclusivas en alta calidad con Prisma Live.</p>
          <Link href="/en-vivo" className={styles.btnLive}>
            Ver Próximos Partidos
          </Link>
        </div>
      </section>
    </div>
  );
}
