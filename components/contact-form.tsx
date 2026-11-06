"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { leadPlanOptions, LEAD_PLAN_STORAGE_KEY, type LeadPlanValue } from "@/lib/leads";
import { site, whatsappHref, wa } from "@/lib/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

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

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          package: plan,
          company,
        }),
      });

      let data: { success?: boolean; message?: string; whatsappUrl?: string } = {};
      try {
        data = (await response.json()) as typeof data;
      } catch {
        data = {};
      }

      if (!response.ok || data.success !== true) {
        setStatus("error");
        setStatusMessage(
          data.message ??
            "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону или в WhatsApp.",
        );
        return;
      }

      setStatus("success");
      setStatusMessage("Спасибо! Заявка принята. Мы свяжемся с вами по указанному номеру.");
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
      <form
        onSubmit={onSubmit}
        className="relative space-y-4"
        noValidate
        aria-busy={status === "submitting"}
        aria-describedby={statusMessage ? statusId : undefined}
      >
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
            name="package"
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

        {status === "success" ? (
          <div
            id={statusId}
            role="status"
            aria-live="polite"
            className="flex gap-3 rounded-2xl border border-emerald-300/40 bg-emerald-400/10 px-4 py-4 text-sm leading-relaxed text-emerald-50"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden />
            <p className="font-medium">{statusMessage}</p>
          </div>
        ) : null}

        {status === "error" && statusMessage ? (
          <div
            id={statusId}
            role="alert"
            aria-live="polite"
            className="rounded-2xl border border-red-300/40 bg-red-400/10 px-4 py-3 text-sm leading-relaxed text-red-100"
          >
            {statusMessage}
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
          </div>
        ) : null}
      </form>
    </div>
  );
}
