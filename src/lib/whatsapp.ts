/**
 * WhatsApp Business API Integration
 * This uses the WhatsApp Business Cloud API
 */

export async function sendWhatsAppNotification(
  phoneNumber: string,
  message: string
) {
  const token = process.env.WHATSAPP_API_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID

  if (!token || !phoneNumberId) {
    console.warn('WhatsApp API not configured')
    return
  }

  // Format phone number (remove spaces, add country code if needed)
  const formattedPhone = phoneNumber.replace(/\s/g, '').replace(/^0/, '233')

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'text',
          text: {
            body: message,
          },
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`WhatsApp API error: ${response.statusText}`)
    }

    console.log('WhatsApp notification sent to:', formattedPhone)
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error)
  }
}

export async function sendOrderWhatsApp(
  phoneNumber: string,
  orderNumber: string,
  total: number
) {
  const message = `🎉 Order Confirmed!\n\nThank you for your purchase at DDS & TTS Tech Hive!\n\nOrder Number: ${orderNumber}\nTotal: GHS ${total.toFixed(2)}\n\nWe'll notify you when your order ships.\n\nQuestions? Reply to this message or visit our shop in Accra.`
  
  await sendWhatsAppNotification(phoneNumber, message)
}

export async function sendRepairWhatsApp(
  phoneNumber: string,
  repairNumber: string,
  deviceType: string
) {
  const message = `🔧 Repair Booking Confirmed!\n\nYour repair request has been received.\n\nRepair Number: ${repairNumber}\nDevice: ${deviceType}\n\nOur technicians will assess your device and contact you within 24 hours with an estimate.\n\nDDS & TTS Tech Hive - Accra`
  
  await sendWhatsAppNotification(phoneNumber, message)
}
