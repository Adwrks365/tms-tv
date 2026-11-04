import Link from "next/link";
import { Logo } from "@/components/logo";
import { nav, site, whatsappHref, wa } from "@/lib/site";

const legal = [
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/terms", label: "Условия использования" },
  { href: "/accessibility", label: "Заявление о доступности" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 py-14 pl-14 pr-5 md:grid-cols-4 xl:px-5">
        <div className="md:col-span-1">
          <Logo height={44} />
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Интернет-телевидение в Израиле: каналы, VOD и архив передач.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Разделы</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Контакты</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`tel:${site.phoneTel}`} className="hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(wa.connect)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp
                <span className="sr-only"> (откроется в новом окне)</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Документы</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl py-5 pl-14 pr-5 text-sm text-slate-400 xl:px-5">
          © {site.year} TMS ТВ. Интернет-телевидение в Израиле.
        </p>
      </div>
    </footer>
  );
}
