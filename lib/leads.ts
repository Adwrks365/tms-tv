import { wa } from "@/lib/site";

export const leadPlanOptions = [
  { value: "", label: "Помогите выбрать" },
  { value: "month", label: "1 месяц — 80 ₪" },
  { value: "half", label: "6 месяцев — 420 ₪" },
  { value: "year", label: "12 месяцев — 780 ₪" },
] as const;

export type LeadPlanValue = (typeof leadPlanOptions)[number]["value"];

const planMessages: Record<Exclude<LeadPlanValue, "">, string> = {
  month: wa.month,
  half: wa.halfYear,
  year: wa.year,
};

export function buildLeadWhatsAppMessage(name: string, phone: string, plan: LeadPlanValue) {
  const trimmedName = name.trim();
  const planLine =
    plan && plan in planMessages
      ? planMessages[plan as Exclude<LeadPlanValue, "">]
      : "Здравствуйте! Хочу подключить TMS ТВ.";

  return `${planLine}\n\nИмя: ${trimmedName}\nТелефон: ${phone.trim()}`;
}

export const LEAD_PLAN_STORAGE_KEY = "tms-lead-plan";
