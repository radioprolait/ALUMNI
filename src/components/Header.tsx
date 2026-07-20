'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoContainer} onClick={() => setMenuOpen(false)}>
          {/* SVG Logo */}
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10L90 90H10L50 10Z" stroke="var(--color-primary)" strokeWidth="8" strokeLinejoin="round"/>
            <path d="M50 30L75 80H25L50 30Z" fill="var(--color-primary)"/>
            <rect x="35" y="60" width="30" height="15" fill="var(--color-surface)"/>
          </svg>
          <div className={styles.logoText}>
            <span className={styles.alumni}>ALUMNI</span>
            <span className={styles.orense}>ORENSE</span>
          </div>
        </Link>

        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`${styles.navWrapper} ${menuOpen ? styles.open : ''}`}>
          <nav className={styles.nav}>
            <Link href="/institucional" className={styles.navLink} onClick={() => setMenuOpen(false)}>Institucional</Link>
            <Link href="/noticias" className={styles.navLink} onClick={() => setMenuOpen(false)}>Noticias</Link>
            <div className={styles.dropdown}>
              <span className={styles.navLink}>Deportes ▾</span>
              <div className={styles.dropdownContent}>
                <Link href="/deportes/futbol" onClick={() => setMenuOpen(false)}>Fútbol</Link>
                <Link href="/deportes/basquet" onClick={() => setMenuOpen(false)}>Básquet</Link>
                <Link href="/deportes/padel" onClick={() => setMenuOpen(false)}>Pádel</Link>
                <Link href="/deportes/pelota-paleta" onClick={() => setMenuOpen(false)}>Pelota Paleta</Link>
              </div>
            </div>
            <Link href="/en-vivo" className={styles.navLinkLive} onClick={() => setMenuOpen(false)}>
              <span className={styles.liveDot}></span>
              En Vivo
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link href="/socios/hacerse-socio" className="btn-primary" onClick={() => setMenuOpen(false)}>
              Hacerse Socio
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
