import { leadPlanOptions } from "@/lib/leads";

export function leadPlanLabel(plan: string): string {
  const match = leadPlanOptions.find((option) => option.value === plan);
  return match?.label ?? "Помогите выбрать";
}

export function parseLeadPackage(body: { package?: string; plan?: string }): string {
  return (body.package ?? body.plan ?? "").trim();
}
