'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { verifyAdmin, getSocios, getTransmisiones, createTransmisionMux } from './actions';
import MuxPlayer from '@mux/mux-player-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [socios, setSocios] = useState<any[]>([]);
  const [transmisiones, setTransmisiones] = useState<any[]>([]);
  
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState(6000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    const s = await getSocios();
    const t = await getTransmisiones();
    setSocios(s);
    setTransmisiones(t);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await verifyAdmin(password);
    if (ok) setIsAuthenticated(true);
    else alert('Contraseña incorrecta');
  };

  const handleCreateTransmision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !precio) return;
    setLoading(true);
    const res = await createTransmisionMux(titulo, Number(precio));
    if (res.success) {
      alert('Transmisión creada exitosamente');
      setTitulo('');
      loadData();
    } else {
      alert('Error: ' + res.error);
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <h2>Acceso Restringido</h2>
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-primary">Ingresar</button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1>Panel de Administración</h1>
      </header>
      
      <div className={styles.dashboard}>
        {/* TRANSMISIONES */}
        <section className={styles.card}>
          <h2>Transmisiones en Vivo</h2>
          
          {transmisiones.find(t => t.activa) && (
            <div style={{ background: '#000', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>📺 Monitor de Transmisión (Preview)</h3>
              <MuxPlayer 
                playbackId={transmisiones.find(t => t.activa)?.mux_playback_id || 'mock_playback'}
                metadata={{ video_title: 'Admin Preview' }}
                streamType="live"
                autoPlay="muted"
                style={{ width: '100%', maxWidth: '600px', aspectRatio: '16/9', margin: '0 auto' }}
              />
              <p style={{ color: '#ccc', fontSize: '0.85rem', marginTop: '1rem' }}>
                Acá podés chequear que el video y el sonido estén entrando bien antes de que lo vea la gente.
              </p>
            </div>
          )}

          <form className={styles.createForm} onSubmit={handleCreateTransmision}>
            <h3>Crear Nueva Transmisión</h3>
            <div className={styles.formRow}>
              <input type="text" placeholder="Título (ej: Alumni vs...)" value={titulo} onChange={e => setTitulo(e.target.value)} required />
              <input type="number" placeholder="Precio ($)" value={precio} onChange={e => setPrecio(Number(e.target.value))} required />
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Creando...' : 'Crear en Mux'}
              </button>
            </div>
          </form>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Título</th>
                  <th>Precio</th>
                  <th>RTMP URL</th>
                  <th>Stream Key (Prisma Live)</th>
                </tr>
              </thead>
              <tbody>
                {transmisiones.map(t => (
                  <tr key={t.id} className={t.activa ? styles.activeRow : ''}>
                    <td>{t.activa ? '🔴 ACTIVA' : 'Inactiva'}</td>
                    <td>{t.titulo}</td>
                    <td>${t.precio}</td>
                    <td><code className={styles.code}>rtmps://global-live.mux.com:443/app</code></td>
                    <td><code className={styles.code}>{t.mux_stream_key || 'N/A'}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SOCIOS */}
        <section className={styles.card}>
          <h2>Base de Datos de Socios</h2>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>DNI</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Deporte</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {socios.map(s => (
                  <tr key={s.id}>
                    <td>{s.nombre} {s.apellido}</td>
                    <td>{s.dni}</td>
                    <td>{s.email}</td>
                    <td>{s.telefono}</td>
                    <td>{s.deporte || 'Institucional'}</td>
                    <td>{s.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
