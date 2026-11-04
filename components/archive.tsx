"use client";

import { Rewind } from "lucide-react";
import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui";

const offsets = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function dayWord(offset: number) {
  const mod10 = offset % 10;
  const mod100 = offset % 100;
  if (mod10 === 1 && mod100 !== 11) return "день";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "дня";
  return "дней";
}

export function Archive() {
  const [selected, setSelected] = useState(1);
  const progress = ((14 - selected) / 14) * 100;

  return (
    <Section id="archive" labelledBy="archive-title" className="bg-paper">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            id="archive-title"
            eyebrow="Архив передач"
            title="Пропустили передачу? Посмотрите позже"
            text="Возвращайтесь к передачам за последние 14 дней. Смотрите любимые программы в удобное для вас время."
          />
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted" role="note">
            Архив — это просмотр прошедших эфиров за последние 14 дней. Это не личная запись и не
            скачивание передач.
          </p>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-blue-800">
              <Rewind className="h-4 w-4" aria-hidden />
              Перемотка эфира назад
            </p>
            <p className="text-xs font-semibold text-muted">−14 дней → сейчас</p>
          </div>

          <div className="relative mt-6 h-2 rounded-full bg-slate-200" aria-hidden="true">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-700 to-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-semibold text-muted" aria-hidden="true">
            <span>−14 дней</span>
            <span>Сейчас</span>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-2" role="group" aria-label="Архив эфира по дням назад">
            {offsets.map((offset) => {
              const active = selected === offset;
              return (
                <button
                  key={offset}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(offset)}
                  className={`min-h-11 rounded-xl text-xs font-bold transition ${
                    active
                      ? "bg-blue-700 text-white shadow-[0_8px_20px_-10px_rgba(29,78,216,0.9)]"
                      : "bg-paper text-ink hover:bg-cyan-50"
                  }`}
                >
                  −{offset}
                </button>
              );
            })}
          </div>

          <p className="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50/80 px-4 py-3 text-sm leading-relaxed text-blue-950" aria-live="polite">
            Эфир −{selected} {dayWord(selected)} назад. Это прошедшая передача из архива, её можно открыть
            позже.
          </p>
        </div>
      </div>
    </Section>
  );
}
