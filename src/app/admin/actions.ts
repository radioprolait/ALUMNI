'use server';
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

export async function createTransmisionYouTube(titulo: string, precio: number, youtube_id: string) {
  try {
    const { prisma } = await import('@/lib/prisma');
    
    // Disable old transmissions
    await prisma.transmision.updateMany({
      where: { activa: true },
      data: { activa: false },
    });

    // Save new transmission in DB
    const trans = await prisma.transmision.create({
      data: {
        titulo,
        precio,
        activa: true,
        youtube_id,
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
