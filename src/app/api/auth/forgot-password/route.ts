import { NextRequest, NextResponse } from "next/server";
import PasswordResetModel from "@/lib/models/PasswordResetModel";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: "Email requerido" }, { status: 400 });

    const token = await PasswordResetModel.createResetToken(email);

    // Si el email no existe, respondemos igual para no revelar info
    if (!token) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL as string,
      subject: "Recuperá tu contraseña — Chatland",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0a0a0f;color:#f4f4f8;border-radius:16px;">
          <h1 style="font-size:24px;margin-bottom:8px;">Recuperar contraseña</h1>
          <p style="color:rgba(255,255,255,0.6);margin-bottom:24px;">
            Recibimos una solicitud para restablecer tu contraseña. El link expira en <strong>1 hora</strong>.
          </p>
          <a href="${resetUrl}"
            style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#a855f7,#7c3aed);color:white;text-decoration:none;border-radius:10px;font-weight:600;">
            Restablecer contraseña
          </a>
          <p style="margin-top:24px;font-size:12px;color:rgba(255,255,255,0.3);">
            Si no solicitaste esto, ignorá este email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al enviar el email" }, { status: 500 });
  }
}
