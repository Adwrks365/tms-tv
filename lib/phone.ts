const digitsOnly = (value: string) => value.replace(/\D/g, "");

export function normalizeIsraeliPhone(input: string): string | null {
  let digits = digitsOnly(input.trim());
  if (!digits) return null;

  if (digits.startsWith("972")) {
    digits = digits.slice(3);
  }
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (digits.length !== 9 || !/^[5-9]/.test(digits)) {
    return null;
  }

  return `+972${digits}`;
}

export function isValidIsraeliPhone(input: string): boolean {
  return normalizeIsraeliPhone(input) !== null;
}
