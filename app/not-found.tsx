import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="bg-paper py-24 pl-14 pr-5 xl:px-5">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-extrabold text-ink">Страница не найдена</h1>
        <p className="mt-4 text-muted">Такой страницы нет. Вернитесь на главную TMS ТВ.</p>
        <Link
          href="/"
          data-ui="button"
          className="mt-6 inline-flex min-h-12 items-center rounded-full bg-blue-700 px-5 text-sm font-semibold text-white"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
