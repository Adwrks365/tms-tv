import { PhoneButton, SectionHeading, WhatsAppButton } from "@/components/ui";
import { wa } from "@/lib/site";

export function FinalCta() {
  return (
    <section id="start" aria-labelledby="cta-title" className="relative overflow-hidden bg-black py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl pl-14 pr-5 text-center xl:px-5">
        <SectionHeading
          id="cta-title"
          title="Подключите TMS ТВ и выбирайте, что смотреть сегодня"
          text="Любимые каналы, новинки кино и архив передач — в одной подписке."
          light
          align="center"
        />
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppButton message={wa.connect} variant="whatsapp">
            Написать в WhatsApp
          </WhatsAppButton>
          <PhoneButton variant="light" />
        </div>
      </div>
    </section>
  );
}
