"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { leadPlanOptions, LEAD_PLAN_STORAGE_KEY, type LeadPlanValue } from "@/lib/leads";
import { site, whatsappHref, wa } from "@/lib/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

function readUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    term: params.get("utm_term") ?? undefined,
    content: params.get("utm_content") ?? undefined,
  };
}

export function ContactForm() {
  const formId = useId();
  const statusId = `${formId}-status`;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState<LeadPlanValue>(() => {
    if (typeof window === "undefined") return "";
    const stored = sessionStorage.getItem(LEAD_PLAN_STORAGE_KEY) as LeadPlanValue | null;
    if (stored && leadPlanOptions.some((option) => option.value === stored)) {
      sessionStorage.removeItem(LEAD_PLAN_STORAGE_KEY);
      return stored;
    }
    return "";
  });
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setStatusMessage("Отправляем…");
    setWhatsappUrl(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          package: plan,
          pageUrl: window.location.href,
          utm: readUtmParams(),
          company,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        whatsappUrl?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(
          data.message ??
            "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону или в WhatsApp.",
        );
        return;
      }

      setStatus("success");
      setStatusMessage("Спасибо! Ваша заявка отправлена. Мы свяжемся с вами по указанному номеру.");
      if (data.whatsappUrl) {
        setWhatsappUrl(data.whatsappUrl);
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }
      setName("");
      setPhone("");
      setPlan("");
      setCompany("");
    } catch {
      setStatus("error");
      setStatusMessage(
        "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону или в WhatsApp.",
      );
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-cyan-300/25 bg-[linear-gradient(160deg,#0c1730_0%,#07101f_55%,#0a1628_100%)] p-6 shadow-[0_0_0_1px_rgba(103,232,249,0.12),0_28px_70px_-32px_rgba(34,211,238,0.45)] sm:p-8">
      <div className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
      <form onSubmit={onSubmit} className="relative space-y-4" noValidate aria-describedby={statusMessage ? statusId : undefined}>
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={`${formId}-company`}>Компания</label>
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-name`} className="text-sm font-semibold text-slate-100">
            Ваше имя
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={status === "submitting" || status === "success"}
            className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/30 disabled:opacity-60"
            placeholder="Ваше имя"
          />
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="text-sm font-semibold text-slate-100">
            Номер телефона
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            disabled={status === "submitting" || status === "success"}
            className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/30 disabled:opacity-60"
            placeholder="054-1234567"
          />
        </div>

        <div>
          <label htmlFor={`${formId}-plan`} className="text-sm font-semibold text-slate-100">
            Какой тариф вас интересует?
          </label>
          <select
            id={`${formId}-plan`}
            name="plan"
            value={plan}
            onChange={(event) => setPlan(event.target.value as LeadPlanValue)}
            disabled={status === "submitting" || status === "success"}
            className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/30 disabled:opacity-60"
          >
            {leadPlanOptions.map((option) => (
              <option key={option.label} value={option.value} className="bg-navy-950 text-white">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#0b4ec8_0%,#1a74f5_58%,#1493e6_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-16px_rgba(20,110,230,0.95)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Отправляем…
            </>
          ) : (
            "Отправить заявку"
          )}
        </button>

        <p className="text-xs leading-relaxed text-slate-300">
          Отправляя заявку, вы соглашаетесь с{" "}
          <Link href="/privacy" className="font-semibold text-cyan-200 underline">
            политикой конфиденциальности
          </Link>{" "}
          и на связь по вашему обращению.
        </p>

        {statusMessage ? (
          <div
            id={statusId}
            role={status === "success" ? "status" : "alert"}
            aria-live="polite"
            className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
              status === "success"
                ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-100"
                : status === "error"
                  ? "border-red-300/40 bg-red-400/10 text-red-100"
                  : "border-white/15 bg-white/5 text-slate-100"
            }`}
          >
            {statusMessage}
            {status === "error" ? (
              <p className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <a href={`tel:${site.phoneTel}`} className="font-semibold underline">
                  Позвонить {site.phoneDisplay}
                </a>
                <a
                  href={whatsappHref(wa.connect)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  Написать в WhatsApp
                </a>
              </p>
            ) : null}
            {status === "success" && whatsappUrl ? (
              <p className="mt-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  Открыть WhatsApp с текстом заявки
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
      </form>
    </div>
  );
}
