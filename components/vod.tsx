import Image from "next/image";
import { Section, SectionHeading, WhatsAppButton } from "@/components/ui";
import { wa } from "@/lib/site";

export function Vod() {
  return (
    <Section id="vod" labelledBy="vod-title" className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute -right-10 top-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="vod-title"
            eyebrow="VOD — фильмы и сериалы"
            title="Новинки кино — когда удобно вам"
            text="VOD с новинками фильмов и сериалов. Выбирайте, что посмотреть сегодня, и наслаждайтесь просмотром в удобное время."
            light
          />
          <WhatsAppButton message={wa.vod} variant="whatsapp" className="mt-8">
            Узнать больше в WhatsApp
          </WhatsAppButton>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] shadow-[0_30px_70px_-28px_rgba(34,211,238,0.55)] ring-1 ring-white/20">
          <Image
            src="/vod-catalog.png"
            alt="Каталог фильмов и сериалов: постеры разных жанров"
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </Section>
  );
}
