"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { WhatsAppButton } from "@/components/ui";
import { nav, site, wa } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    menuButtonRef.current?.focus();
  }

  function onDrawerKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== "Tab" || !drawerRef.current) return;
    const items = drawerRef.current.querySelectorAll<HTMLElement>("a, button");
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-white/10 bg-black/90 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          : "border-white/5 bg-black/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-3 px-4 sm:px-5">
        <Logo priority height={48} />

        <nav className="ml-4 hidden items-center gap-5 xl:flex" aria-label="Разделы страницы">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-slate-200 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-white transition hover:text-cyan-200"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {site.phoneDisplay}
          </a>
          <div className="hidden md:block">
            <WhatsAppButton message={wa.connect}>Написать в WhatsApp</WhatsAppButton>
          </div>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white sm:ml-0 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => (open ? closeMenu() : setOpen(true))}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

      {open ? (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Закрыть меню"
            onClick={closeMenu}
          />
          <div
            id="mobile-menu"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="drawer-in absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col bg-navy-950 px-5 py-5 text-white shadow-2xl"
            onKeyDown={onDrawerKeyDown}
          >
            <div className="flex items-center justify-between">
              <p id={titleId} className="text-lg font-bold">
                Меню
              </p>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
                onClick={closeMenu}
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav className="mt-6 flex flex-col" aria-label="Разделы страницы">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="border-b border-white/10 py-3 text-base font-medium"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 font-semibold"
                onClick={closeMenu}
              >
                <Phone className="h-4 w-4" aria-hidden />
                {site.phoneDisplay}
              </a>
              <WhatsAppButton message={wa.connect} className="w-full">
                Написать в WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
