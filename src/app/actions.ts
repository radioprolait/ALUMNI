'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createSocio(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const apellido = formData.get('apellido') as string;
  const dni = formData.get('dni') as string;
  const email = formData.get('email') as string;
  const telefono = formData.get('telefono') as string;
  const deporte = formData.get('deporte') as string;

  try {
    // Basic validation
    if (!nombre || !apellido || !dni || !email || !telefono) {
      return { success: false, error: 'Todos los campos obligatorios deben estar completos.' };
    }

    await prisma.socio.create({
      data: {
        nombre,
        apellido,
        dni,
        email,
        telefono,
        deporte: deporte || null,
        estado: 'PENDIENTE',
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error creating socio:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'Ya existe un socio registrado con este DNI o Email.' };
    }
    return { success: false, error: 'Ocurrió un error al procesar la solicitud.' };
  }
}
