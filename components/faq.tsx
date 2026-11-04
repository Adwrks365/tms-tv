"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { Section, SectionHeading } from "@/components/ui";
import { faq } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section id="faq" labelledBy="faq-title" className="bg-white">
      <SectionHeading
        id="faq-title"
        eyebrow="Вопросы и ответы"
        title="Частые вопросы"
        align="center"
      />
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
        {faq.map((item, index) => {
          const expanded = open === index;
          const buttonId = `${baseId}-button-${index}`;
          const panelId = `${baseId}-panel-${index}`;
          return (
            <div key={item.q}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  {item.q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-blue-700 transition ${expanded ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
              </h3>
              {expanded ? (
                <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-muted sm:text-base">{item.a}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
