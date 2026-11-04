import {
  Clapperboard,
  Headset,
  History,
  MonitorPlay,
  Network,
  Tv,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { benefits } from "@/lib/site";

const icons: LucideIcon[] = [Users, Tv, Clapperboard, History, MonitorPlay, Network, Headset];

export function Why() {
  return (
    <Section id="advantages" labelledBy="advantages-title" className="bg-white">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          id="advantages-title"
          eyebrow="Почему TMS ТВ"
          title="14 лет работаем в Израиле"
        />
        <div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {benefits.map((item, index) => {
              const Icon = icons[index] ?? Tv;
              return (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="pt-1.5 text-sm font-medium leading-snug text-ink">{item}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-muted" role="note">
            Доступное качество изображения зависит от контента, устройства и интернет-соединения.
          </p>
        </div>
      </div>
    </Section>
  );
}
