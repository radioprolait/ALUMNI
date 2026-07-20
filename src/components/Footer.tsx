import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logoText}>
              <span className={styles.alumni}>ALUMNI</span>
              <span className={styles.orense}>ORENSE</span>
            </div>
            <p className={styles.description}>
              El corazón deportivo de Orense. Institución dedicada a la promoción del deporte, la salud y la comunidad.
            </p>
          </div>
          
          <div className={styles.links}>
            <h3>Deportes</h3>
            <Link href="/deportes/futbol">Fútbol</Link>
            <Link href="/deportes/basquet">Básquet</Link>
            <Link href="/deportes/padel">Pádel</Link>
            <Link href="/deportes/pelota-paleta">Pelota Paleta</Link>
          </div>

          <div className={styles.links}>
            <h3>Club</h3>
            <Link href="/institucional">Institucional</Link>
            <Link href="/noticias">Noticias</Link>
            <Link href="/socios/hacerse-socio">Hacerse Socio</Link>
            <Link href="/contacto">Contacto</Link>
          </div>

          <div className={styles.links}>
            <h3>Redes Oficiales</h3>
            <a href="https://www.instagram.com/alumniorenseoficial/" target="_blank" rel="noopener noreferrer">@alumniorenseoficial</a>
            <a href="https://www.instagram.com/alumni_basquet/" target="_blank" rel="noopener noreferrer">@alumni_basquet</a>
            <a href="https://www.instagram.com/alumniorense_padel/" target="_blank" rel="noopener noreferrer">@alumniorense_padel</a>
            <a href="https://www.instagram.com/paleta_alumni/" target="_blank" rel="noopener noreferrer">@paleta_alumni</a>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Club Alumni Orense. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
