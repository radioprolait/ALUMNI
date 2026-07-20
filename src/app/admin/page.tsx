'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { verifyAdmin, getSocios, getTransmisiones, createTransmisionYouTube, toggleEstadoSocio } from './actions';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [socios, setSocios] = useState<any[]>([]);
  const [transmisiones, setTransmisiones] = useState<any[]>([]);
  
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState(6000);
  const [youtubeId, setYoutubeId] = useState('');
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
    if (!titulo || !precio || !youtubeId) return;
    setLoading(true);
    const res = await createTransmisionYouTube(titulo, Number(precio), youtubeId);
    if (res.success) {
      alert('Transmisión creada exitosamente');
      setTitulo('');
      setYoutubeId('');
      loadData();
    } else {
      alert('Error: ' + res.error);
    }
    setLoading(false);
  };

  const handleToggleEstado = async (id: number, estadoActual: string) => {
    await toggleEstadoSocio(id, estadoActual);
    loadData();
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
          
          {transmisiones.find(t => t.activa) && transmisiones.find(t => t.activa).youtube_id && (
            <div style={{ background: '#000', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>📺 Monitor de Transmisión (Preview)</h3>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '600px', margin: '0 auto' }}>
                <iframe 
                  src={`https://www.youtube.com/embed/${transmisiones.find(t => t.activa).youtube_id}`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <p style={{ color: '#ccc', fontSize: '0.85rem', marginTop: '1rem' }}>
                Acá podés chequear que el video de YouTube esté entrando bien antes de que lo vea la gente.
              </p>
            </div>
          )}

          <form className={styles.createForm} onSubmit={handleCreateTransmision}>
            <h3>Crear Nueva Transmisión</h3>
            <div className={styles.formRow}>
              <input type="text" placeholder="Título (ej: Alumni vs...)" value={titulo} onChange={e => setTitulo(e.target.value)} required />
              <input type="number" placeholder="Precio ($)" value={precio} onChange={e => setPrecio(Number(e.target.value))} required />
              <input type="text" placeholder="YouTube Video ID (ej: dQw4w9WgXcQ)" value={youtubeId} onChange={e => setYoutubeId(e.target.value)} required />
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Creando...' : 'Crear Transmisión'}
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
                  <th>YouTube ID</th>
                </tr>
              </thead>
              <tbody>
                {transmisiones.map(t => (
                  <tr key={t.id} className={t.activa ? styles.activeRow : ''}>
                    <td>{t.activa ? '🔴 ACTIVA' : 'Inactiva'}</td>
                    <td>{t.titulo}</td>
                    <td>${t.precio}</td>
                    <td><code className={styles.code}>{t.youtube_id || 'N/A'}</code></td>
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
                    <td>
                      <button 
                        onClick={() => handleToggleEstado(s.id, s.estado)}
                        style={{ 
                          padding: '4px 8px', 
                          borderRadius: '4px', 
                          border: 'none', 
                          cursor: 'pointer',
                          backgroundColor: s.estado === 'ACTIVO' ? 'var(--color-primary)' : '#888',
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}
                      >
                        {s.estado}
                      </button>
                    </td>
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
