import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Как сайт TMS ТВ обрабатывает обращения и технические данные.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Политика конфиденциальности">
      <p className="leading-relaxed text-muted">
        Эта политика объясняет, какие данные могут обрабатываться, когда вы открываете сайт TMS ТВ.
        На сайте нет форм регистрации, оплаты и обратной связи.
      </p>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Что сайт не собирает</h2>
        <p className="leading-relaxed text-muted">
          Мы не просим на сайте имя, адрес, номер карты и не создаём личный кабинет. Кнопки «Позвонить»
          и «WhatsApp» только открывают телефон или WhatsApp.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Телефон и WhatsApp</h2>
        <p className="leading-relaxed text-muted">
          Звонок идёт на номер {site.phoneDisplay}. Ссылка WhatsApp открывает чат с заранее
          подготовленным текстом, который вы можете изменить. Переписку и звонки обрабатывают оператор
          связи и WhatsApp по своим правилам.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Технические журналы</h2>
        <p className="leading-relaxed text-muted">
          Хостинг может автоматически записывать IP-адрес, тип браузера, дату и адрес страницы. Эти
          данные нужны, чтобы сайт открывался и оставался устойчивым. Мы не продаём их и не используем
          для рекламных профилей.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Локальные настройки</h2>
        <p className="leading-relaxed text-muted">
          Виджет доступности сохраняет размер текста и выбранные режимы в локальном хранилище браузера.
          Эти настройки не отправляются на сервер. Рекламных и аналитических cookies на сайте нет.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Вопросы</h2>
        <p className="leading-relaxed text-muted">
          По вопросам об обращении в поддержку позвоните на {site.phoneDisplay} или напишите в
          WhatsApp. Дата публикации: 4 ноября 2026 г.
        </p>
      </section>
    </LegalPage>
  );
}
