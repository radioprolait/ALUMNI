'use server';
import Mux from '@mux/mux-node';
import { revalidatePath } from 'next/cache';

export async function verifyAdmin(password: string) {
  // Hardcoded password for MVP. Change in production.
  return password === 'alumni2026';
}

export async function getSocios() {
  const { prisma } = await import('@/lib/prisma');
  return await prisma.socio.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function toggleEstadoSocio(id: number, estadoActual: string) {
  const { prisma } = await import('@/lib/prisma');
  const nuevoEstado = estadoActual === 'ACTIVO' ? 'PENDIENTE' : 'ACTIVO';
  await prisma.socio.update({
    where: { id },
    data: { estado: nuevoEstado }
  });
  revalidatePath('/admin');
  return nuevoEstado;
}

export async function getTransmisiones() {
  const { prisma } = await import('@/lib/prisma');
  return await prisma.transmision.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createTransmisionMux(titulo: string, precio: number) {
  try {
    const mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID || 'dummy_id',
      tokenSecret: process.env.MUX_TOKEN_SECRET || 'dummy_secret',
    });

    // 1. Create Live Stream in Mux
    let stream_id = 'mock_stream_id';
    let stream_key = 'mock_stream_key_123';
    let playback_id = 'mock_playback_id';

    // In a real environment with real keys:
    if (process.env.MUX_TOKEN_ID && process.env.MUX_TOKEN_ID !== 'test_token_id') {
      const liveStream = await mux.video.liveStreams.create({
        playback_policy: ['public'],
        new_asset_settings: { playback_policy: ['public'] },
      });
      stream_id = liveStream.id;
      stream_key = liveStream.stream_key || '';
      playback_id = liveStream.playback_ids?.[0]?.id || '';
    }

    // 2. Disable old transmissions
    const { prisma } = await import('@/lib/prisma');
    await prisma.transmision.updateMany({
      where: { activa: true },
      data: { activa: false },
    });

    // 3. Save new transmission in DB
    const trans = await prisma.transmision.create({
      data: {
        titulo,
        precio,
        activa: true,
        mux_stream_id: stream_id,
        mux_stream_key: stream_key,
        mux_playback_id: playback_id,
      }
    });

    revalidatePath('/admin');
    revalidatePath('/en-vivo');
    
    return { success: true, transmision: trans };
  } catch (error: any) {
    console.error('Error creating stream:', error);
    return { success: false, error: error.message };
  }
}
