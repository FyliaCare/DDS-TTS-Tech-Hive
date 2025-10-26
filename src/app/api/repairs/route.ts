import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendRepairBookingEmail } from '@/lib/email'
import { sendRepairWhatsApp } from '@/lib/whatsapp'
import { generateRepairNumber } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      deviceType,
      brand,
      model,
      issueDescription,
      customerPhone,
      customerEmail,
      customerAddress,
    } = body

    // Validate required fields
    if (!deviceType || !brand || !issueDescription || !customerPhone || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate repair number
    const repairNumber = generateRepairNumber()

    // Create repair booking
    const repair = await prisma.repair.create({
      data: {
        userId,
        repairNumber,
        deviceType,
        brand,
        model: model || '',
        issueDescription,
        customerPhone,
        customerEmail,
        customerAddress,
        status: 'PENDING',
      },
    })

    // Send notifications (non-blocking)
    Promise.all([
      sendRepairBookingEmail(customerEmail, repairNumber, deviceType, brand),
      sendRepairWhatsApp(customerPhone, repairNumber, `${brand} ${deviceType}`),
    ]).catch(err => console.error('Notification error:', err))

    return NextResponse.json({
      repair: {
        id: repair.id,
        repairNumber,
        status: repair.status,
      },
    })
  } catch (error) {
    console.error('Error creating repair booking:', error)
    return NextResponse.json(
      { error: 'Failed to create repair booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const repairNumber = searchParams.get('repairNumber')

  try {
    if (repairNumber) {
      const repair = await prisma.repair.findUnique({
        where: { repairNumber },
      })

      if (!repair) {
        return NextResponse.json(
          { error: 'Repair not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ repair })
    }

    if (userId) {
      const repairs = await prisma.repair.findMany({
        where: { userId },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return NextResponse.json({ repairs })
    }

    return NextResponse.json(
      { error: 'User ID or repair number is required' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error fetching repairs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repairs' },
      { status: 500 }
    )
  }
}
