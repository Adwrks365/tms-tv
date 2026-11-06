import Image from "next/image";
import { ScrollToFormButton } from "@/components/scroll-to-form-button";
import { SectionHeading } from "@/components/ui";
import { plans, wa, whatsappHref } from "@/lib/site";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-24 bg-paper pt-16 pb-16 md:pt-24 md:pb-20">
      <div className="mx-auto w-full max-w-6xl pl-14 pr-5 xl:px-5">
      <SectionHeading
        id="pricing-title"
        eyebrow="Тарифы"
        title="Выберите удобный срок подписки"
        align="center"
      />
      <div className="mt-12 grid items-stretch gap-5 md:grid-cols-3 md:pt-3">
        {plans.map((plan) => {
          const featured = plan.badge !== null;
          return (
            <article
              key={plan.id}
              className={`relative flex h-full flex-col rounded-3xl border p-6 transition duration-300 hover:-translate-y-1.5 hover:scale-[1.02] ${
                featured
                  ? "border-cyan-300 bg-navy-950 text-white shadow-[0_0_0_1px_rgba(103,232,249,0.35),0_28px_70px_-24px_rgba(34,211,238,0.55)]"
                  : "border-line bg-white text-ink shadow-[0_18px_50px_-36px_rgba(12,23,48,0.9)] hover:border-blue-200 hover:shadow-[0_24px_60px_-30px_rgba(21,99,232,0.55)]"
              }`}
            >
              {plan.badge ? (
                <p className="absolute -top-3 left-6 rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold text-navy-950">
                  {plan.badge}
                </p>
              ) : null}
              <h3 className="text-lg font-bold">{plan.period}</h3>
              <p className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                <span className={`mb-1 text-3xl font-semibold ${featured ? "text-cyan-100" : "text-muted"}`}>
                  ₪
                </span>
              </p>
              {plan.note ? (
                <p className={`mt-4 text-sm leading-relaxed ${featured ? "text-slate-200" : "text-muted"}`}>
                  {plan.note}
                </p>
              ) : null}
              <div className="flex-1" />
              <ScrollToFormButton
                plan={plan.id}
                variant={featured ? "whatsapp" : "primary"}
                className="mt-6 w-full"
              >
                {plan.cta}
              </ScrollToFormButton>
            </article>
          );
        })}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-medium text-muted">
        До 5 телевизоров в одной подписке при одном внешнем IP-адресе.
      </p>
      </div>
      <a
        href={whatsappHref(wa.year)}
        target="_blank"
        rel="noopener noreferrer"
        data-ui="button"
        className="mt-14 block w-full"
      >
        <Image
          src="/year-price.png"
          alt="Фильмы и сериалы всегда под рукой. От 65 ₪ в месяц при оплате 780 ₪ за год."
          width={2172}
          height={724}
          sizes="100vw"
          className="h-auto w-full"
        />
        <span className="sr-only"> (откроется в новом окне)</span>
      </a>
    </section>
  );
}
