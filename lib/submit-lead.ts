import { createHash } from "node:crypto";
import { Resend } from "resend";
import { buildLeadWhatsAppMessage } from "@/lib/leads";
import { buildLeadEmailHtml } from "@/lib/lead-email";
import { parseLeadPackage } from "@/lib/lead-plan-label";
import { isValidIsraeliPhone, normalizeIsraeliPhone } from "@/lib/phone";
import { getSupabaseAdmin } from "@/lib/supabase-server";
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

function hashIp(ip: string) {
  const salt = process.env.LEAD_IP_SALT ?? "tms-tv";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function submitLead(request: Request, body: LeadPayload) {
  if (body.company?.trim()) {
    return { ok: true as const, id: "ignored" };
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

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false as const, status: 503, error: "storage_unconfigured" };
  }

  const ipHash = hashIp(clientIp(request));

  const { data, error } = await supabase.rpc("submit_tms_tv_lead", {
    p_name: name,
    p_phone: phone,
    p_plan: plan || null,
    p_page_url: body.pageUrl?.slice(0, 500) ?? null,
    p_utm_source: body.utm?.source?.slice(0, 120) ?? null,
    p_utm_medium: body.utm?.medium?.slice(0, 120) ?? null,
    p_utm_campaign: body.utm?.campaign?.slice(0, 120) ?? null,
    p_utm_term: body.utm?.term?.slice(0, 120) ?? null,
    p_utm_content: body.utm?.content?.slice(0, 120) ?? null,
    p_ip_hash: ipHash,
  });

  if (error) {
    if (error.message.includes("rate_limited")) {
      return {
        ok: false as const,
        status: 429,
        error: "rate_limited",
        message: "Подождите минуту перед повторной отправкой.",
      };
    }
    return { ok: false as const, status: 500, error: "save_failed" };
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
    id: data,
    whatsappUrl: whatsappHref(whatsappMessage),
    phoneTel: site.phoneTel,
  };
}
