import { ContactForm } from "@/components/contact-form";
import { SectionHeading, WhatsAppButton } from "@/components/ui";
import { site, wa } from "@/lib/site";

export function Support() {
  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-title"
      className="scroll-mt-24 bg-navy-950 py-20 text-white md:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl items-start gap-10 pl-14 pr-5 xl:px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeading
            id="contact-form-title"
            eyebrow="Заявка на подключение"
            title="Оставьте заявку — поможем подключиться"
            text="Оставьте имя и номер телефона. Мы свяжемся с вами, расскажем о тарифах и поможем подобрать способ подключения."
            light
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a
              id="contacts"
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
        <ContactForm />
      </div>
    </section>
  );
}
