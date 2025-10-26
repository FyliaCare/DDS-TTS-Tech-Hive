import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { initializePayment } from '@/lib/paystack'
import { sendOrderConfirmationEmail } from '@/lib/email'
import { sendOrderWhatsApp } from '@/lib/whatsapp'
import { generateOrderNumber } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      items,
      shippingAddress,
      customerPhone,
      customerEmail,
      notes,
    } = body

    // Validate items and calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 }
        )
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        )
      }

      const price = product.salePrice || product.price
      const total = price * item.quantity

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price,
        total,
      })

      subtotal += total
    }

    const shipping = 50 // Fixed shipping cost for now
    const tax = 0 // No tax for now
    const total = subtotal + shipping + tax

    // Generate order number
    const orderNumber = generateOrderNumber()

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        orderNumber,
        items: {
          create: orderItems,
        },
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress,
        customerPhone,
        customerEmail,
        notes,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    // Initialize Paystack payment
    const callbackUrl = `${request.nextUrl.origin}/payment/verify?reference=${orderNumber}`
    const paymentData = await initializePayment(
      customerEmail,
      total,
      orderNumber,
      callbackUrl
    )

    // Update order with Paystack reference
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paystackRef: paymentData.reference,
      },
    })

    // Send notifications (non-blocking)
    Promise.all([
      sendOrderConfirmationEmail(customerEmail, orderNumber, total, order.items),
      sendOrderWhatsApp(customerPhone, orderNumber, total),
    ]).catch(err => console.error('Notification error:', err))

    return NextResponse.json({
      order: {
        id: order.id,
        orderNumber,
        total,
      },
      payment: paymentData,
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    )
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
