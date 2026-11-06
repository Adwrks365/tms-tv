import { createHash } from "node:crypto";
import { buildLeadWhatsAppMessage } from "@/lib/leads";
import { isValidIsraeliPhone, normalizeIsraeliPhone } from "@/lib/phone";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { site, whatsappHref } from "@/lib/site";

type LeadPayload = {
  name?: string;
  phone?: string;
  plan?: string;
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

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (body.company?.trim()) {
    return Response.json({ ok: true, id: "ignored" });
  }

  const name = body.name?.trim() ?? "";
  const phoneRaw = body.phone?.trim() ?? "";
  const plan = body.plan?.trim() ?? "";

  if (name.length < 2) {
    return Response.json({ error: "name_required", message: "Укажите ваше имя" }, { status: 400 });
  }

  if (!isValidIsraeliPhone(phoneRaw)) {
    return Response.json(
      { error: "phone_invalid", message: "Введите корректный номер телефона" },
      { status: 400 },
    );
  }

  const phone = normalizeIsraeliPhone(phoneRaw);
  if (!phone) {
    return Response.json(
      { error: "phone_invalid", message: "Введите корректный номер телефона" },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return Response.json({ error: "storage_unconfigured" }, { status: 503 });
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
      return Response.json(
        { error: "rate_limited", message: "Подождите минуту перед повторной отправкой." },
        { status: 429 },
      );
    }
    return Response.json({ error: "save_failed" }, { status: 500 });
  }

  const whatsappMessage = buildLeadWhatsAppMessage(
    name,
    phoneRaw,
    plan as "" | "month" | "half" | "year",
  );

  return Response.json({
    ok: true,
    id: data,
    whatsappUrl: whatsappHref(whatsappMessage),
    phoneTel: site.phoneTel,
  });
}
