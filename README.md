# TMS ТВ

Сайт интернет-телевидения TMS ТВ. Next.js (App Router), TypeScript, Tailwind CSS.

## Команды

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Деплой

Репозиторий рассчитан на Vercel: импортируйте проект, пресет Next.js, команда сборки `npm run build`.

Телефон, ссылки WhatsApp и тексты сообщений собраны в `lib/site.ts`.

## Заявки с формы

Блок `#contact-form` отправляет данные в `POST /api/lead`: при успешной отправке письма через Resend API отвечает `{ success: true }`.

Переменные окружения (см. `.env.example`):

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (адрес с верифицированного домена в Resend)
- `LEAD_NOTIFY_EMAIL` (по умолчанию `moidom.tv1@gmail.com`)
