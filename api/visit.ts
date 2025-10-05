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
    const { path, referrer, language, timezone, screen, userAgent } = body || {};

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      VISIT_TO_EMAIL = 'kenhopkins001@gmail.com',
      FROM_EMAIL = 'no-reply@vercel.app',
    } = process.env as Record<string, string>;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      // noop in absence of SMTP
      res.status(200).json({ ok: true });
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
      to: VISIT_TO_EMAIL,
      subject: `New visit on portfolio: ${path || '/'} `,
      text: `Path: ${path}\nReferrer: ${referrer}\nLanguage: ${language}\nTimezone: ${timezone}\nScreen: ${screen}\nUA: ${userAgent}`,
    });

    res.status(200).json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error('Visit notify error:', err);
    res.status(200).json({ ok: true });
  }
}
