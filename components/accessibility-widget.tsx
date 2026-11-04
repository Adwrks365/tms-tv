"use client";

import { Accessibility, Minus, Plus, RotateCcw, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useSyncExternalStore, useState } from "react";
import { AccessibilityStatement } from "@/components/accessibility-statement";

type Prefs = {
  scale: number;
  contrast: boolean;
  links: boolean;
  readable: boolean;
  motion: boolean;
};

const STORAGE_KEY = "tms-a11y";
const SCALES = [100, 110, 120, 130];

const defaults: Prefs = {
  scale: 100,
  contrast: false,
  links: false,
  readable: false,
  motion: false,
};

function readPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    const scale = SCALES.includes(Number(parsed.scale)) ? Number(parsed.scale) : 100;
    return {
      scale,
      contrast: Boolean(parsed.contrast),
      links: Boolean(parsed.links),
      readable: Boolean(parsed.readable),
      motion: Boolean(parsed.motion),
    };
  } catch {
    return defaults;
  }
}

function applyPrefs(prefs: Prefs) {
  const root = document.documentElement;
  root.style.fontSize = prefs.scale === 100 ? "" : `${prefs.scale}%`;
  root.dataset.a11yContrast = prefs.contrast ? "high" : "off";
  root.dataset.a11yLinks = prefs.links ? "on" : "off";
  root.dataset.a11yReadable = prefs.readable ? "on" : "off";
  root.dataset.a11yMotion = prefs.motion ? "reduce" : "off";
}

const listeners = new Set<() => void>();
let memory: Prefs = defaults;

if (typeof window !== "undefined") {
  memory = readPrefs();
  applyPrefs(memory);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function publish(next: Prefs) {
  memory = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  applyPrefs(next);
  listeners.forEach((listener) => listener());
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const prefs = useSyncExternalStore(subscribe, () => memory, () => defaults);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function update(next: Prefs, message: string) {
    publish(next);
    setStatus(message);
  }

  function changeScale(direction: -1 | 1) {
    const index = Math.max(0, SCALES.indexOf(prefs.scale));
    const nextIndex = Math.min(SCALES.length - 1, Math.max(0, index + direction));
    const scale = SCALES[nextIndex] ?? 100;
    update({ ...prefs, scale }, `Размер текста ${scale}%`);
  }

  return (
    <>
      <div className="fixed left-2 top-1/2 z-50 -translate-y-1/2">
        <button
          ref={buttonRef}
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black text-white shadow-lg"
          aria-expanded={open}
          aria-controls="a11y-panel"
          aria-label="Открыть меню доступности"
          onClick={() => setOpen((value) => !value)}
        >
          <Accessibility className="h-4 w-4" aria-hidden />
        </button>
        {open ? (
          <div
            id="a11y-panel"
            ref={panelRef}
            aria-labelledby={titleId}
            className="absolute left-12 top-1/2 max-h-[min(70vh,32rem)] w-[min(20rem,calc(100vw-4.5rem))] -translate-y-1/2 overflow-y-auto rounded-3xl border border-line bg-white p-4 text-ink shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 id={titleId} className="text-base font-bold">
                Меню доступности
              </h2>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full border border-line"
                aria-label="Закрыть меню доступности"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold">Размер текста</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line"
                  aria-label="Уменьшить текст"
                  onClick={() => changeScale(-1)}
                >
                  <Minus className="h-4 w-4" aria-hidden />
                </button>
                <span className="min-w-14 text-center text-sm font-semibold">{prefs.scale}%</span>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line"
                  aria-label="Увеличить текст"
                  onClick={() => changeScale(1)}
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Toggle
                pressed={prefs.contrast}
                label="Повышенный контраст"
                onClick={() =>
                  update(
                    { ...prefs, contrast: !prefs.contrast },
                    prefs.contrast ? "Обычный контраст" : "Повышенный контраст включён",
                  )
                }
              />
              <Toggle
                pressed={prefs.links}
                label="Выделить ссылки"
                onClick={() =>
                  update(
                    { ...prefs, links: !prefs.links },
                    prefs.links ? "Выделение ссылок выключено" : "Ссылки выделены",
                  )
                }
              />
              <Toggle
                pressed={prefs.readable}
                label="Удобочитаемый шрифт"
                onClick={() =>
                  update(
                    { ...prefs, readable: !prefs.readable },
                    prefs.readable ? "Обычный шрифт" : "Удобочитаемый шрифт включён",
                  )
                }
              />
              <Toggle
                pressed={prefs.motion}
                label="Уменьшить анимацию"
                onClick={() =>
                  update(
                    { ...prefs, motion: !prefs.motion },
                    prefs.motion ? "Анимация включена" : "Анимация уменьшена",
                  )
                }
              />
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-line px-3 text-sm font-semibold"
                onClick={() => update(defaults, "Настройки доступности сброшены")}
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Сбросить настройки
              </button>
              <button
                type="button"
                className="min-h-10 rounded-full bg-navy-950 px-3 text-sm font-semibold text-white"
                onClick={() => dialogRef.current?.showModal()}
              >
                Заявление о доступности
              </button>
              <Link href="/accessibility" className="text-center text-sm font-semibold text-blue-800 underline">
                Открыть заявление на отдельной странице
              </Link>
            </div>
            <p className="sr-only" aria-live="polite">
              {status}
            </p>
          </div>
        ) : null}
      </div>

      <dialog
        ref={dialogRef}
        className="w-[min(40rem,calc(100%-2rem))] rounded-3xl border border-line bg-white p-0 text-ink shadow-2xl"
        aria-labelledby="a11y-statement-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="max-h-[80vh] overflow-y-auto p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id="a11y-statement-title" className="text-2xl font-extrabold">
              Заявление о доступности
            </h2>
            <button
              type="button"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line"
              aria-label="Закрыть заявление"
              onClick={() => dialogRef.current?.close()}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <div className="mt-4">
            <AccessibilityStatement />
          </div>
        </div>
      </dialog>
    </>
  );
}

function Toggle({
  pressed,
  label,
  onClick,
}: {
  pressed: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className="flex min-h-11 w-full items-center justify-between gap-3 rounded-2xl border border-line px-3 text-left text-sm font-medium"
    >
      {label}
      <span
        className={`rounded-full px-2 py-1 text-xs font-bold ${pressed ? "bg-blue-700 text-white" : "bg-paper text-muted"}`}
      >
        {pressed ? "Вкл" : "Выкл"}
      </span>
    </button>
  );
}
