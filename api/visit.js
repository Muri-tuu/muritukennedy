const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const { path, referrer, language, timezone, screen, userAgent } = req.body || {};

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      TO_EMAIL = 'kenhopkins001@gmail.com',
      FROM_EMAIL = 'no-reply@vercel.app',
    } = process.env;

    const ip =
      (req.headers['x-forwarded-for'] && String(req.headers['x-forwarded-for']).split(',')[0].trim()) ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      '';

    const ua = userAgent || req.headers['user-agent'] || '';
    const ref = referrer || req.headers['referer'] || '';

    const html = `
      <h2>New visitor</h2>
      <ul>
        <li><strong>Time:</strong> ${new Date().toISOString()}</li>
        <li><strong>Path:</strong> ${path || ''}</li>
        <li><strong>Referrer:</strong> ${ref}</li>
        <li><strong>IP:</strong> ${ip}</li>
        <li><strong>User-Agent:</strong> ${ua}</li>
        <li><strong>Language:</strong> ${language || ''}</li>
        <li><strong>Timezone:</strong> ${timezone || ''}</li>
        <li><strong>Screen:</strong> ${screen || ''}</li>
      </ul>
    `;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.warn('SMTP credentials missing - visit notification logged only.');
      console.log({ ip, ua, ref, path, language, timezone, screen });
      res.status(200).json({ message: 'Visit logged (SMTP not configured)' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: 'New visitor on site',
      html,
    });

    res.status(200).json({ message: 'Visit notification sent' });
  } catch (err) {
    console.error('Visit notify error:', err);
    res.status(500).json({ message: 'Failed to send visit notification' });
  }
};
