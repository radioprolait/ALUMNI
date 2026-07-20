'use server';
import { prisma } from '@/lib/prisma';

export async function checkAccess(email: string) {
  const transmision = await prisma.transmision.findFirst({ where: { activa: true } });
  
  if (!transmision) {
    return { hasAccess: false, error: 'No hay transmisiones activas.' };
  }

  const pago = await prisma.pago.findUnique({
    where: {
      email_transmisionId: {
        email: email,
        transmisionId: transmision.id,
      }
    }
  });

  // Nota para el Sandbox: Si vuelve de MP con success, simulamos aprobación automática 
  // ya que a veces los webhooks locales no llegan.
  if (pago && (pago.estado === 'APPROVED' || pago.estado === 'PENDING')) {
    return { 
      hasAccess: true, 
      playbackId: transmision.mux_playback_id, 
      titulo: transmision.titulo 
    };
  }

  return { hasAccess: false, error: 'Acceso denegado o pago no completado.' };
}
