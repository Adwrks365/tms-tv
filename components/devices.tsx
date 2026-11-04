import { Info } from "lucide-react";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui";

export function Devices() {
  return (
    <Section id="devices" labelledBy="devices-title" className="bg-white">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeading
            id="devices-title"
            eyebrow="Оборудование"
            title="Смотрите на вашем телевизоре"
            text="Просмотр на телевизорах и ТВ-приставках. Поможем подобрать способ подключения и настроить просмотр на вашем оборудовании."
          />
          <div
            role="note"
            className="mt-6 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950"
          >
            <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <p>Совместимость конкретной модели и способ подключения уточняйте перед оформлением подписки.</p>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-[#e8eef6] shadow-[0_24px_60px_-32px_rgba(21,99,232,0.45)]">
          <Image
            src="/devices.png"
            alt="Телевизор, ТВ-приставка и пульт"
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-contain object-center p-2 sm:p-4"
          />
        </div>
      </div>
    </Section>
  );
}
