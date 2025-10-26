import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendOrderConfirmationEmail(
  email: string,
  orderNumber: string,
  total: number,
  items: any[]
) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Order Confirmation - ${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Thank You for Your Order!</h1>
        <p>Your order has been confirmed and is being processed.</p>
        <h2>Order Details</h2>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Total:</strong> GHS ${total.toFixed(2)}</p>
        <h3>Items:</h3>
        <ul>
          ${items.map(item => `
            <li>${item.product.name} - Quantity: ${item.quantity} - GHS ${item.total.toFixed(2)}</li>
          `).join('')}
        </ul>
        <p>We'll send you another email when your order ships.</p>
        <p>Thank you for shopping with DDS & TTS Tech Hive!</p>
        <hr style="margin: 20px 0; border: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          DDS & TTS Tech Hive - Accra<br>
          Your trusted tech partner for sales and repairs
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Order confirmation email sent to:', email)
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
    throw error
  }
}

export async function sendRepairBookingEmail(
  email: string,
  repairNumber: string,
  deviceType: string,
  brand: string
) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Repair Booking Confirmation - ${repairNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Repair Booking Confirmed!</h1>
        <p>We've received your repair request and our technicians will assess it shortly.</p>
        <h2>Repair Details</h2>
        <p><strong>Repair Number:</strong> ${repairNumber}</p>
        <p><strong>Device:</strong> ${brand} ${deviceType}</p>
        <p>We'll contact you within 24 hours with an estimate and timeline.</p>
        <p>You can bring your device to our shop in Accra.</p>
        <p>Thank you for trusting DDS & TTS Tech Hive!</p>
        <hr style="margin: 20px 0; border: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          DDS & TTS Tech Hive - Accra<br>
          Your trusted tech partner for sales and repairs
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Repair booking email sent to:', email)
  } catch (error) {
    console.error('Error sending repair booking email:', error)
    throw error
  }
}

export async function sendAdminNotificationEmail(
  subject: string,
  message: string
) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${subject}</h2>
        <p>${message}</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Admin notification sent')
  } catch (error) {
    console.error('Error sending admin notification:', error)
  }
}
