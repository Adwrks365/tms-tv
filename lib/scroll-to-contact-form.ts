import type { LeadPlanValue } from "@/lib/leads";
import { LEAD_PLAN_STORAGE_KEY } from "@/lib/leads";

export function scrollToContactForm(plan?: LeadPlanValue) {
  if (typeof window === "undefined") return;

  if (plan !== undefined) {
    sessionStorage.setItem(LEAD_PLAN_STORAGE_KEY, plan);
  }

  const target = document.getElementById("contact-form");
  if (!target) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  window.setTimeout(() => {
    const nameInput = target.querySelector<HTMLInputElement>('input[name="name"]');
    nameInput?.focus();
  }, reduce ? 0 : 450);
}
