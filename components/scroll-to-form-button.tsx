"use client";

import type { ReactNode } from "react";
import type { LeadPlanValue } from "@/lib/leads";
import { scrollToContactForm } from "@/lib/scroll-to-contact-form";

export function ScrollToFormButton({
  children,
  plan,
  className = "",
  variant = "primary",
}: {
  children: ReactNode;
  plan?: LeadPlanValue;
  className?: string;
  variant?: "primary" | "ghost" | "whatsapp" | "light" | "navy";
}) {
  const variants = {
    primary:
      "bg-[linear-gradient(100deg,#0b4ec8_0%,#1a74f5_58%,#1493e6_100%)] text-white shadow-[0_14px_34px_-16px_rgba(20,110,230,0.95)] hover:brightness-110",
    whatsapp:
      "bg-[#25D366] text-white shadow-[0_14px_34px_-16px_rgba(37,211,102,0.55)] hover:bg-[#20BD5A]",
    ghost:
      "border border-white/25 bg-white/5 text-white hover:border-white/45 hover:bg-white/10",
    light: "bg-white text-navy-950 hover:bg-cyan-50",
    navy: "bg-navy-950 text-white hover:bg-navy-800",
  } as const;

  return (
    <button
      type="button"
      data-ui="button"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold transition duration-200 active:scale-[0.98] ${variants[variant]} ${className}`}
      onClick={() => scrollToContactForm(plan)}
    >
      {children}
    </button>
  );
}
