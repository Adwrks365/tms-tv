import { Resend } from "resend";
import { buildLeadWhatsAppMessage } from "@/lib/leads";
import { buildLeadEmailHtml } from "@/lib/lead-email";
import { parseLeadPackage } from "@/lib/lead-plan-label";
import { isValidIsraeliPhone, normalizeIsraeliPhone } from "@/lib/phone";
import { site, whatsappHref } from "@/lib/site";

export type LeadPayload = {
  name?: string;
  phone?: string;
  plan?: string;
  package?: string;
  pageUrl?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  company?: string;
};

export async function submitLead(_request: Request, body: LeadPayload) {
  if (body.company?.trim()) {
    return { ok: true as const, success: true as const };
  }

  const name = body.name?.trim() ?? "";
  const phoneRaw = body.phone?.trim() ?? "";
  const plan = parseLeadPackage(body);

  if (name.length < 2) {
    return {
      ok: false as const,
      status: 400,
      error: "name_required",
      message: "Укажите ваше имя",
    };
  }

  if (!isValidIsraeliPhone(phoneRaw)) {
    return {
      ok: false as const,
      status: 400,
      error: "phone_invalid",
      message: "Введите корректный номер телефона",
    };
  }

  const phone = normalizeIsraeliPhone(phoneRaw);
  if (!phone) {
    return {
      ok: false as const,
      status: 400,
      error: "phone_invalid",
      message: "Введите корректный номер телефона",
    };
  }

  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL ?? "moidom.tv1@gmail.com";

  if (!resendKey || !fromEmail) {
    return {
      ok: false as const,
      status: 503,
      error: "email_unconfigured",
      message: "Отправка временно недоступна. Свяжитесь с нами по телефону или в WhatsApp.",
    };
  }

  const submittedAt = new Date();
  const resend = new Resend(resendKey);
  const { error: emailError } = await resend.emails.send({
    from: fromEmail,
    to: notifyEmail,
    subject: `Новая заявка TMS ТВ — ${name}`,
    html: buildLeadEmailHtml({
      name,
      phoneDisplay: phoneRaw,
      phoneE164: phone,
      plan,
      submittedAt,
    }),
  });

  if (emailError) {
    return {
      ok: false as const,
      status: 502,
      error: "email_failed",
      message: "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону или в WhatsApp.",
    };
  }

  const whatsappMessage = buildLeadWhatsAppMessage(
    name,
    phoneRaw,
    plan as "" | "month" | "half" | "year",
  );

  return {
    ok: true as const,
    success: true as const,
    whatsappUrl: whatsappHref(whatsappMessage),
    phoneTel: site.phoneTel,
  };
}
