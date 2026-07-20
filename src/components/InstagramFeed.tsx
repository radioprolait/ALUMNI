import React from 'react';
import styles from './InstagramFeed.module.css';

interface InstagramFeedProps {
  accounts: string[];
  title?: string;
}

export default function InstagramFeed({ accounts, title = "Últimas Novedades en Instagram" }: InstagramFeedProps) {
  // En un entorno real, aquí haríamos fetch a la API de Instagram o usaríamos un servicio de terceros.
  // Por ahora mostramos placeholders estéticos.
  const placeholders = [1, 2, 3, 4, 5, 6];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.accounts}>
        {accounts.map(acc => (
          <a key={acc} href={`https://instagram.com/${acc}`} target="_blank" rel="noopener noreferrer" className={styles.accountBadge}>
            @{acc}
          </a>
        ))}
      </div>
      
      <div className={styles.grid}>
        {placeholders.map(item => (
          <div key={item} className={styles.post}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.icon}>📸</span>
            </div>
            <div className={styles.postOverlay}>
              <span className={styles.viewText}>Ver en Instagram</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
