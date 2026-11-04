import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main id="content" className="bg-paper pb-16 pt-10 md:pt-16">
      <article className="mx-auto max-w-3xl pl-14 pr-5 xl:px-5">
        <p className="text-sm font-semibold text-blue-700">TMS ТВ</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{title}</h1>
        <div className="mt-8 space-y-6">{children}</div>
        <p className="mt-10">
          <Link href="/" className="font-semibold text-blue-800 underline">
            На главную
          </Link>
        </p>
      </article>
    </main>
  );
}
