import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui";

export function MultiScreen() {
  return (
    <Section id="screens" labelledBy="screens-title" className="bg-navy-950 text-white">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="screens-title"
            eyebrow="Одна сеть"
            title="Одна подписка — до 5 телевизоров"
            text="Подключайте до 5 телевизоров в одной сети с одним внешним IP-адресом. Удобное решение для всей семьи."
            light
          />
          <div role="note" className="mt-6 rounded-2xl border border-cyan-300/40 bg-cyan-300/10 p-5">
            <p className="text-sm font-bold text-cyan-200">Один внешний IP-адрес</p>
            <p className="mt-2 text-base leading-relaxed text-white">
              Все телевизоры работают в одной сети. Подписка не рассчитана на разные дома и разные
              сети одновременно.
            </p>
          </div>
        </div>
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.75rem] shadow-[0_30px_70px_-36px_rgba(34,211,238,0.55)] ring-1 ring-white/15">
          <Image
            src="/home-screens.png"
            alt="Семья смотрит телевизоры в разных комнатах одного дома"
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </Section>
  );
}
