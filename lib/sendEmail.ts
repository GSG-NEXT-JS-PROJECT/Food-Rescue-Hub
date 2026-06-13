import nodemailer from "nodemailer";

export const sendEmail = async (
  userEmail: string,
  subject: string,
  message: string
) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  const missing = Object.entries({ SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS })
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length > 0) {
    throw new Error(`Missing SMTP env vars: ${missing.join(", ")}`);
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  } as nodemailer.TransportOptions);

  const mailOptions = {
    from: `"Food Rescue Hub" <${SMTP_USER}>`,
    to: userEmail,
    subject,
    html: message,
  };

  try {
    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);
    console.log("sendEmail success:", info.messageId);
    return info;
  } catch (error) {
    console.error("sendEmail failed:", error);
    throw error;
  }
};
