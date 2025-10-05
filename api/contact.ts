import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    let body: any = req.body;
    if (!body || typeof body === 'string') {
      try { body = JSON.parse((body as string) || '{}'); } catch { body = {}; }
    }
    const { name, email, message } = body || {};
    if (!name || !email || !message) {
      res.status(400).json({ message: 'Missing name, email, or message' });
      return;
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      TO_EMAIL = 'kenhopkins001@gmail.com',
      FROM_EMAIL = 'no-reply@vercel.app',
    } = process.env as Record<string, string>;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.warn('SMTP credentials missing - logging message instead of sending.');
      console.log('Contact message:', { name, email, message });
      res.status(200).json({ message: 'Message received (SMTP not configured). We will get back to you shortly.' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${String(message).replace(/\n/g, '<br/>')}</p>`,
    });

    res.status(200).json({ message: 'Message sent successfully', id: info.messageId });
  } catch (err: any) {
    console.error('Contact error:', err);
    res.status(500).json({ message: 'Failed to send message' });
  }
}
