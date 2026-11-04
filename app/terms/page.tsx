import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Условия использования",
  description: "Сроки, цены и условия подписки TMS ТВ.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Условия использования">
      <p className="leading-relaxed text-muted">
        Сайт рассказывает об услуге интернет-телевидения TMS ТВ: каналы, VOD и архив прошедших
        передач. Подключение согласуется по телефону или в WhatsApp.
      </p>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Срок и цена</h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>1 месяц — 80 ₪.</li>
          <li>6 месяцев — 420 ₪. Эквивалент 70 ₪ в месяц. Оплата 420 ₪ за весь период.</li>
          <li>12 месяцев — 780 ₪. Эквивалент 65 ₪ в месяц. Оплата 780 ₪ за весь период.</li>
        </ul>
        <p className="leading-relaxed text-muted">
          На сайте не указаны пробный период, автоматическое продление и дополнительные платежи сверх
          цены выбранного срока. Условия конкретного заказа подтверждаются при обращении.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Сколько экранов</h2>
        <p className="leading-relaxed text-muted">
          В одной подписке можно подключить до 5 телевизоров при одном внешнем IP-адресе, в одной
          сети. Подписка не рассчитана на разные дома и разные сети одновременно.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Каналы, VOD и архив</h2>
        <p className="leading-relaxed text-muted">
          Доступно более 400 каналов, включая израильские. Актуальный список уточняется при
          подключении. VOD содержит новинки фильмов и сериалов. Архив позволяет смотреть прошедшие
          эфиры за последние 14 дней. Это не личная запись и не скачивание передач.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Оборудование и качество</h2>
        <p className="leading-relaxed text-muted">
          Совместимость конкретной модели телевизора или приставки и способ подключения нужно
          уточнить до оформления подписки. Заявленное качество — Full HD и 4K. Доступное качество
          зависит от контента, устройства и интернет-соединения. Срок настройки заранее не
          фиксируется.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Контакты</h2>
        <p className="leading-relaxed text-muted">
          Телефон {site.phoneDisplay} и WhatsApp. Дата публикации: 4 ноября 2026 г.
        </p>
      </section>
    </LegalPage>
  );
}
