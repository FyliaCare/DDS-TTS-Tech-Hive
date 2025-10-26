import { NextRequest, NextResponse } from 'next/server'
import { verifyPayment } from '@/lib/paystack'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const reference = searchParams.get('reference')

  if (!reference) {
    return NextResponse.json(
      { error: 'Payment reference is required' },
      { status: 400 }
    )
  }

  try {
    // Verify payment with Paystack
    const paymentData = await verifyPayment(reference)

    if (!paymentData.success) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }

    // Update order payment status
    const order = await prisma.order.update({
      where: { orderNumber: reference },
      data: {
        paymentStatus: 'PAID',
        status: 'PROCESSING',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    // Update product stock
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
      },
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
