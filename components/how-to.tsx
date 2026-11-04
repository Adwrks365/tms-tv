import { Section, SectionHeading } from "@/components/ui";

const steps = [
  "Напишите нам в WhatsApp или позвоните.",
  "Выберите тариф и уточните совместимость вашего оборудования.",
  "Получите помощь с настройкой и начните просмотр.",
];

export function HowTo() {
  return (
    <Section id="how" labelledBy="how-title" className="bg-paper">
      <SectionHeading
        id="how-title"
        eyebrow="Подключение"
        title="Как подключиться"
        align="center"
      />
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step}
            className="rounded-3xl border border-line bg-white p-6 shadow-[0_16px_40px_-34px_rgba(12,23,48,0.9)]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-blue-700 text-sm font-bold text-white">
              {index + 1}
            </span>
            <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{step}</h3>
          </li>
        ))}
      </ol>
    </Section>
  );
}
