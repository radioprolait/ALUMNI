import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }

    // 1. Get or Create an active Transmision (Mock for demo purposes)
    let transmision = await prisma.transmision.findFirst({ where: { activa: true } });
    
    if (!transmision) {
      transmision = await prisma.transmision.create({
        data: {
          titulo: 'Alumni vs. Clásico Rival (Demo)',
          link_prisma: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
          precio: 1500,
          activa: true,
        }
      });
    }

    // 2. Configure Mercado Pago
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
    const preference = new Preference(client);

    // 3. Create Preference
    const response = await preference.create({
      body: {
        items: [
          {
            id: transmision.id.toString(),
            title: transmision.titulo,
            quantity: 1,
            unit_price: transmision.precio,
            currency_id: 'ARS',
          }
        ],
        payer: {
          email: email,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/en-vivo?status=success&email=${email}`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/en-vivo?status=failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/en-vivo?status=pending`,
        },
        auto_return: 'approved',
        external_reference: `${email}|${transmision.id}`,
      }
    });

    // 4. Create pending payment record
    await prisma.pago.upsert({
      where: {
        email_transmisionId: {
          email: email,
          transmisionId: transmision.id,
        }
      },
      update: {
        estado: 'PENDING',
        mp_payment_id: null,
      },
      create: {
        email: email,
        transmisionId: transmision.id,
        estado: 'PENDING',
      }
    });

    return NextResponse.json({ init_point: response.init_point });
  } catch (error) {
    console.error('Error in checkout:', error);
    return NextResponse.json({ error: 'Error procesando el pago' }, { status: 500 });
  }
}
