import type { Metadata } from "next";
import { AccessibilityStatement } from "@/components/accessibility-statement";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Заявление о доступности",
  description: "Меры доступности сайта TMS ТВ и способ сообщить о препятствии.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Заявление о доступности">
      <AccessibilityStatement />
    </LegalPage>
  );
}
