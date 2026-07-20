'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { createSocio } from '@/app/actions';

export default function HacerseSocioPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    
    const formData = new FormData(e.currentTarget);
    const result = await createSocio(formData);

    if (result.success) {
      setStatus('success');
    } else {
      setErrorMsg(result.error || 'Error desconocido');
      setStatus('idle');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Hacete Socio</h1>
        <p className={styles.subtitle}>
          Formá parte de nuestra familia. Obtené beneficios exclusivos y apoyá al club de tus amores.
        </p>
      </div>

      <div className={styles.content}>
        {status === 'success' ? (
          <div className={styles.successMessage}>
            <span className={styles.successIcon}>🎉</span>
            <h2>¡Solicitud Enviada!</h2>
            <p>Hemos recibido tus datos correctamente. La administración del club se comunicará con vos a la brevedad para finalizar el alta de socio.</p>
            <button className="btn-primary" onClick={() => setStatus('idle')} style={{marginTop: '2rem'}}>
              Volver
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            {errorMsg && <div style={{color: 'red', fontWeight: 'bold'}}>{errorMsg}</div>}
            
            <div className={styles.formGroup}>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" name="nombre" id="nombre" required placeholder="Juan" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="apellido">Apellido</label>
              <input type="text" name="apellido" id="apellido" required placeholder="Pérez" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dni">DNI</label>
              <input type="text" name="dni" id="dni" required placeholder="Sin puntos ni espacios" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" name="email" id="email" required placeholder="juan@ejemplo.com" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="telefono">Teléfono</label>
              <input type="tel" name="telefono" id="telefono" required placeholder="Código de área + número" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="deporte">Deporte Principal de Interés (Opcional)</label>
              <select name="deporte" id="deporte">
                <option value="">Solo Socio Institucional</option>
                <option value="futbol">Fútbol</option>
                <option value="basquet">Básquet</option>
                <option value="padel">Pádel</option>
                <option value="pelota-paleta">Pelota Paleta</option>
              </select>
            </div>

            <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
