export function normalizeDateToISO(input: string): string {
  // If already ISO (YYYY-MM-DD), return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return input;
  }

  const parsed = new Date(input);

  if (isNaN(parsed.getTime())) {
    throw new Error(`Invalid Delivery Date format: ${input}`);
  }

  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, '0');
  const dd = String(parsed.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}