import { Check } from "lucide-react";
import Image from "next/image";
import { ScrollToFormButton } from "@/components/scroll-to-form-button";
import { ButtonLink, WhatsAppButton } from "@/components/ui";
import { highlights, wa } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white" aria-labelledby="hero-title">
      <Image
        src="/hero-family.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-[78%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/78 via-black/55 to-black/82 md:bg-gradient-to-r md:from-black/88 md:via-black/42 md:to-black/10" />
      <div className="relative mx-auto flex min-h-[42rem] max-w-6xl flex-col justify-center py-16 pl-14 pr-5 md:min-h-[46rem] md:py-24 xl:px-5">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-cyan-200">Интернет-телевидение в Израиле</p>
          <h1
            id="hero-title"
            className="mt-4 text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl"
          >
            Любимые каналы и фильмы — в одной подписке
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-100">
            Более 400 каналов, включая израильские, VOD с новинками кино и архив передач за
            последние 14 дней. Смотрите в качестве Full HD и 4K.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppButton message={wa.connect} variant="whatsapp">
              Подключиться в WhatsApp
            </WhatsAppButton>
            <ButtonLink href="/#pricing" variant="ghost">
              Посмотреть тарифы
            </ButtonLink>
            <ScrollToFormButton variant="ghost">Оставить заявку</ScrollToFormButton>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-snug text-slate-100">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan-400/15 text-cyan-200">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
