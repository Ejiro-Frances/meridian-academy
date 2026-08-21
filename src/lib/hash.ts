/** Deterministic 31-hash used to synthesize stable placeholder staff data. */
export function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Stable honorific for a placeholder teacher name. */
export function honorific(name: string): string {
  return (hash(name) % 2 ? "Mrs " : "Mr ") + name;
}
