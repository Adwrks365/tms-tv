import { leadPlanLabel } from "@/lib/lead-plan-label";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatSubmittedAt(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jerusalem",
  }).format(date);
}

function whatsAppClientUrl(phoneE164: string, clientName: string) {
  const digits = phoneE164.replace(/\D/g, "");
  const text = encodeURIComponent(`Здравствуйте, ${clientName}! Это TMS ТВ по вашей заявке.`);
  return `https://wa.me/${digits}?text=${text}`;
}

export function buildLeadEmailHtml(input: {
  name: string;
  phoneDisplay: string;
  phoneE164: string;
  plan: string;
  submittedAt: Date;
}) {
  const safeName = escapeHtml(input.name);
  const safePhone = escapeHtml(input.phoneDisplay);
  const planLabel = escapeHtml(leadPlanLabel(input.plan));
  const submittedAt = escapeHtml(formatSubmittedAt(input.submittedAt));
  const telHref = escapeHtml(input.phoneE164);
  const waHref = escapeHtml(whatsAppClientUrl(input.phoneE164, input.name));

  return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Новая заявка TMS ТВ</title>
  </head>
  <body style="margin:0;padding:0;background:#05070d;font-family:Segoe UI,Arial,sans-serif;color:#e2e8f0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#05070d;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:linear-gradient(160deg,#0c1730 0%,#07101f 55%,#0a1628 100%);border:1px solid rgba(103,232,249,0.25);border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 12px;">
                <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#67e8f9;">TMS ТВ</p>
                <h1 style="margin:0;font-size:24px;line-height:1.25;color:#ffffff;">Новая заявка с сайта</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.08);border-radius:16px;">
                  <tr>
                    <td style="padding:18px 20px;font-size:15px;line-height:1.6;">
                      <p style="margin:0 0 12px;"><strong style="color:#cbd5e1;">Имя:</strong> ${safeName}</p>
                      <p style="margin:0 0 12px;"><strong style="color:#cbd5e1;">Телефон:</strong> ${safePhone}</p>
                      <p style="margin:0 0 12px;"><strong style="color:#cbd5e1;">Тариф:</strong> ${planLabel}</p>
                      <p style="margin:0;"><strong style="color:#cbd5e1;">Время заявки:</strong> ${submittedAt}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px;">
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-right:10px;padding-bottom:10px;">
                      <a href="${waHref}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#25D366;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Написать в WhatsApp</a>
                    </td>
                    <td style="padding-bottom:10px;">
                      <a href="tel:${telHref}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:linear-gradient(100deg,#0b4ec8 0%,#1a74f5 58%,#1493e6 100%);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Позвонить клиенту</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
