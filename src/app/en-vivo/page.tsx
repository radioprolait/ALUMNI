'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MuxPlayer from '@mux/mux-player-react';
import styles from './page.module.css';
import { checkAccess } from './actions';

export default function EnVivoPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [access, setAccess] = useState<{hasAccess: boolean, playbackId?: string | null, titulo?: string} | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Si vuelve de Mercado Pago con status=success, comprobamos acceso
  useEffect(() => {
    const status = searchParams.get('status');
    const returnedEmail = searchParams.get('email');
    if (status === 'success' && returnedEmail) {
      verificarAcceso(returnedEmail);
    }
  }, [searchParams]);

  const verificarAcceso = async (emailToCheck: string) => {
    setLoading(true);
    const result = await checkAccess(emailToCheck);
    if (result.hasAccess) {
      setAccess(result);
    } else {
      alert("No se encontró el pago o no hay transmisión activa.");
    }
    setLoading(false);
  };

  const handlePagar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert(data.error || 'Error al iniciar el pago');
        setLoading(false);
      }
    } catch (err) {
      alert('Error de conexión');
      setLoading(false);
    }
  };

  if (access?.hasAccess) {
    return (
      <div className={styles.page}>
        <div className={styles.hero}>
          <h1 className={styles.title}>🔴 EN VIVO</h1>
          <p className={styles.subtitle}>{access.titulo}</p>
        </div>
        <div className={styles.playerContainer}>
          {access.playbackId ? (
            <MuxPlayer
              streamType="live"
              playbackId={access.playbackId}
              metadata={{ video_title: access.titulo }}
              primaryColor="#E32636"
              secondaryColor="#ffffff"
            />
          ) : (
            <div style={{color: 'white', textAlign: 'center', padding: '4rem'}}>
              <h2>Señal en preparación...</h2>
              <p>La transmisión comenzará en breve.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Transmisiones Exclusivas</h1>
        <p className={styles.subtitle}>
          Apoyá al club viendo los partidos en alta calidad vía Prisma Live.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.paywallCard}>
          <h2>Próximo Partido</h2>
          <p className={styles.priceTag}>Acceso Virtual: $1500</p>
          
          <form onSubmit={handlePagar} className={styles.form}>
            <label htmlFor="emailPay">Ingresá tu email para continuar:</label>
            <input 
              type="email" 
              id="emailPay" 
              placeholder="tu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <button type="submit" className={styles.payButton} disabled={loading}>
              {loading ? 'Procesando...' : 'Pagar con Mercado Pago'}
            </button>
          </form>

          <div className={styles.alreadyPaid}>
            <p>¿Ya pagaste? Ingresá tu mail y presioná enter en el teclado para verificar acceso.</p>
            <button 
              type="button" 
              className={styles.verifyButton} 
              onClick={() => email && verificarAcceso(email)}
              disabled={loading || !email}
            >
              Verificar Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
