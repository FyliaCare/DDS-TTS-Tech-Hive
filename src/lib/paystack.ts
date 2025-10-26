/**
 * Paystack Payment Integration
 * Documentation: https://paystack.com/docs/api/
 */

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!
const PAYSTACK_BASE_URL = 'https://api.paystack.co'

export async function initializePayment(
  email: string,
  amount: number,
  orderNumber: string,
  callbackUrl: string
) {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // Convert to pesewas
        reference: orderNumber,
        callback_url: callbackUrl,
        metadata: {
          order_number: orderNumber,
        },
      }),
    })

    const data = await response.json()

    if (!data.status) {
      throw new Error(data.message || 'Payment initialization failed')
    }

    return {
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
      reference: data.data.reference,
    }
  } catch (error) {
    console.error('Paystack initialization error:', error)
    throw error
  }
}

export async function verifyPayment(reference: string) {
  try {
    const response = await fetch(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    )

    const data = await response.json()

    if (!data.status) {
      throw new Error(data.message || 'Payment verification failed')
    }

    return {
      success: data.data.status === 'success',
      amount: data.data.amount / 100, // Convert from pesewas
      reference: data.data.reference,
      paidAt: data.data.paid_at,
      channel: data.data.channel,
    }
  } catch (error) {
    console.error('Paystack verification error:', error)
    throw error
  }
}

export async function processRefund(reference: string, amount?: number) {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/refund`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction: reference,
        amount: amount ? Math.round(amount * 100) : undefined,
      }),
    })

    const data = await response.json()

    if (!data.status) {
      throw new Error(data.message || 'Refund processing failed')
    }

    return data.data
  } catch (error) {
    console.error('Paystack refund error:', error)
    throw error
  }
}
