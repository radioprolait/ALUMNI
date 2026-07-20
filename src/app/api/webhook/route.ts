import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MercadoPagoConfig, Payment } from 'mercadopago';

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('data.id') || url.searchParams.get('id');
    const type = url.searchParams.get('type');

    if (type === 'payment' && id) {
      const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
      const payment = new Payment(client);
      
      const paymentData = await payment.get({ id: id });

      if (paymentData.status === 'approved' && paymentData.external_reference) {
        const [email, transmisionIdStr] = paymentData.external_reference.split('|');
        const transmisionId = parseInt(transmisionIdStr, 10);

        await prisma.pago.update({
          where: {
            email_transmisionId: {
              email: email,
              transmisionId: transmisionId,
            }
          },
          data: {
            estado: 'APPROVED',
            mp_payment_id: id,
          }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
