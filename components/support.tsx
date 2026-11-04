import { Section, SectionHeading, WhatsAppButton } from "@/components/ui";
import { site, wa } from "@/lib/site";

export function Support() {
  return (
    <Section id="contacts" labelledBy="contacts-title" className="bg-navy-950 text-white">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionHeading
          id="contacts-title"
          eyebrow="Техническая поддержка"
          title="Поможем с подключением и настройкой"
          text="Есть вопросы по подключению или просмотру? Обратитесь к нам по телефону или в WhatsApp — поможем разобраться."
          light
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <a
            href={`tel:${site.phoneTel}`}
            data-ui="button"
            className="flex min-h-24 flex-col justify-center rounded-3xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-cyan-200/40"
          >
            <span className="text-sm text-slate-300">Телефон</span>
            <span className="mt-1 text-2xl font-bold">{site.phoneDisplay}</span>
          </a>
          <div className="flex flex-col justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
            <span className="text-sm text-slate-300">WhatsApp</span>
            <WhatsAppButton message={wa.support} variant="whatsapp">
              Написать в WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
