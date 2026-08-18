/** Formats a naira amount for display: 485000 -> "₦485,000". */
export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString("en-NG")}`;
}

/** Normalizes a Nigerian phone number to "0803 000 0000" display form, best-effort. */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^234/, "0");
  if (digits.length !== 11) return raw.trim();
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
}
