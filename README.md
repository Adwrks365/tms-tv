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

Блок `#contact-form` отправляет данные в `POST /api/leads` и сохраняет их в Supabase (`tms_tv_contact_leads`).

Переменные окружения (см. `.env.example`):

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `LEAD_IP_SALT` (необязательно, для хеша IP при rate limit)
