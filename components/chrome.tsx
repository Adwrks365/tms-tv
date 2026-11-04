"use client";

import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { AccessibilityWidget } from "@/components/accessibility-widget";
import { site, wa, whatsappHref } from "@/lib/site";

export function Chrome() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={whatsappHref(wa.connect)}
        target="_blank"
        rel="noopener noreferrer"
        data-ui="button"
        aria-label="Написать в WhatsApp"
        title="WhatsApp"
        className="fixed bottom-4 right-4 z-40 hidden h-11 w-11 place-items-center rounded-full bg-sea text-white shadow-[0_8px_22px_-8px_rgba(13,107,88,0.9)] md:grid"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
      </a>

      <button
        type="button"
        aria-label="Наверх"
        title="Наверх"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={showTop ? undefined : true}
        className={`fixed left-4 z-40 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-navy-950 text-white shadow-lg transition bottom-[calc(5.25rem+env(safe-area-inset-bottom))] md:bottom-5 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
        onClick={() => {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        }}
      >
        <ArrowUp className="h-4 w-4" aria-hidden />
      </button>

      <nav
        aria-label="Быстрые действия"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <div className="grid grid-cols-2">
          <a
            href={`tel:${site.phoneTel}`}
            data-ui="button"
            className="inline-flex min-h-14 items-center justify-center gap-2 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Позвонить
          </a>
          <a
            href={whatsappHref(wa.connect)}
            target="_blank"
            rel="noopener noreferrer"
            data-ui="button"
            className="inline-flex min-h-14 items-center justify-center gap-2 bg-sea text-sm font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
            <span className="sr-only"> (откроется в новом окне)</span>
          </a>
        </div>
      </nav>

      <AccessibilityWidget />
    </>
  );
}
