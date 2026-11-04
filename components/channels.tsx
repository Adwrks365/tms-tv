import { Baby, Clapperboard, Compass, Music, Newspaper, Radio, Trophy, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui";

const categories: { title: string; icon: LucideIcon }[] = [
  { title: "Спорт", icon: Trophy },
  { title: "Новости", icon: Newspaper },
  { title: "Фильмы и сериалы", icon: Clapperboard },
  { title: "Музыка", icon: Music },
  { title: "Детские каналы", icon: Baby },
  { title: "Познавательные программы", icon: Compass },
  { title: "Израильские каналы", icon: Radio },
];

export function Channels() {
  return (
    <Section id="channels" labelledBy="channels-title" className="bg-white">
      <SectionHeading
        id="channels-title"
        eyebrow="Каналы на любой вкус"
        title="Всё, что вы любите смотреть"
        text="Спорт, новости, фильмы, сериалы, музыка, детские и познавательные передачи — более 400 каналов для всей семьи, включая израильские каналы."
      />
      <Image
        src="/channels-wall.png"
        alt="Изогнутый экран с сеткой телеканалов: спорт, новости, кино, природа и музыка"
        width={1672}
        height={941}
        sizes="(min-width: 1280px) 1120px, 100vw"
        className="mt-10 h-auto w-full rounded-[1.75rem] shadow-[0_24px_60px_-32px_rgba(12,23,48,0.45)]"
      />
      <ul className="mt-10 flex flex-wrap justify-center gap-4">
        {categories.map(({ title, icon: Icon }) => (
          <li
            key={title}
            className="group w-full rounded-3xl border border-line bg-white p-6 shadow-[0_18px_40px_-28px_rgba(12,23,48,0.55)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_24px_50px_-24px_rgba(34,211,238,0.55)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-[0_10px_24px_-10px_rgba(21,99,232,0.8)] transition duration-300 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.65)]">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
          </li>
        ))}
      </ul>
    </Section>
  );
}
