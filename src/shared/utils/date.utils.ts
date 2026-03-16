// ─── Date Mask Helpers ────────────────────────────────────────────────────────

/** Strips all non-digit characters from a string. */
export function extractDigits(text: string): string {
  return text.replace(/\D/g, '');
}

/**
 * Formats up to 8 digits into a MM/DD/YYYY display string.
 *
 * @example
 * formatDateString('12252024') // → '12/25/2024'
 * formatDateString('1225')     // → '12/25'
 * formatDateString('12')       // → '12'
 */
export function formatDateString(digits: string): string {
  const d = digits.slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

/**
 * Converts a `Date` object to a masked string in MM/DD/YYYY format.
 * Returns an empty string if `date` is undefined.
 *
 * @example
 * dateToString(new Date(2024, 11, 25)) // → '12/25/2024'
 * dateToString(undefined)              // → ''
 */
export function dateToString(date: Date | undefined): string {
  if (!date) return '';
  return formatDateString(
    `${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${date.getFullYear()}`,
  );
}

/**
 * Parses a MM/DD/YYYY string into a `Date` object.
 * Returns `undefined` if the string is incomplete or invalid.
 *
 * @example
 * stringToDate('12/25/2024') // → Date(2024, 11, 25)
 * stringToDate('12/25')      // → undefined
 * stringToDate('00/00/2024') // → undefined
 */
export function stringToDate(str: string): Date | undefined {
  const parts = str.split('/');
  if (parts.length !== 3) return undefined;
  const [m, d, y] = parts.map(Number);
  if (!m || !d || y < 1000) return undefined;
  const date = new Date(y, m - 1, d);
  return isNaN(date.getTime()) ? undefined : date;
}

/**
 * Sanitizes up to 8 raw digit characters into a valid date digit string
 * (MM DD YYYY) by clamping each segment and auto-advancing when the first
 * digit of a segment already implies a complete value.
 *
 * Rules applied in order:
 * - Month first digit > 1 → prepend '0' (e.g. "3" → "03")
 * - Month 00 → "01", month > 12 → "12"
 * - Day first digit > 3 → prepend '0' (e.g. "4" → "04")
 * - Day 00 → "01", day > 31 → "31"
 * - When all 8 digits are present, day is clamped to the actual max day of
 *   the given month/year (handles Feb 29/30, etc.)
 *
 * @param raw - Up to 8 digit characters (non-digits already stripped)
 */
export function sanitizeDateDigits(raw: string): string {
  let d = raw.slice(0, 8);

  // ── Month (positions 0-1) ──────────────────────────────────────────────────
  if (d.length === 1 && d[0] > '1') {
    d = '0' + d; // e.g. "3" → "03", "9" → "09"
  }
  if (d.length >= 2) {
    const m = parseInt(d.slice(0, 2), 10);
    if (m === 0) d = '01' + d.slice(2);
    else if (m > 12) d = '12' + d.slice(2);
  }

  // ── Day (positions 2-3) ────────────────────────────────────────────────────
  if (d.length === 3 && d[2] > '3') {
    d = d.slice(0, 2) + '0' + d.slice(2); // e.g. "034" → "0304"
  }
  if (d.length >= 4) {
    const day = parseInt(d.slice(2, 4), 10);
    if (day === 0) d = d.slice(0, 2) + '01' + d.slice(4);
    else if (day > 31) d = d.slice(0, 2) + '31' + d.slice(4);
  }

  // ── Full date: clamp day to actual max of month (year complete) ────────────
  if (d.length === 8) {
    const month = parseInt(d.slice(0, 2), 10);
    const day = parseInt(d.slice(2, 4), 10);
    const year = parseInt(d.slice(4, 8), 10);
    const maxDay = new Date(year, month, 0).getDate(); // last day of month
    if (day > maxDay) {
      d = d.slice(0, 2) + String(maxDay).padStart(2, '0') + d.slice(4);
    }
  }

  return d;
}

// ─── Calendar Helpers ─────────────────────────────────────────────────────────

/**
 * Returns `true` if two dates fall on the same calendar day,
 * ignoring time.
 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

/**
 * Builds a flat array of 42 cells (6 rows × 7 columns) for a calendar grid.
 * Cells outside the given month are included to fill the grid and are marked
 * with `currentMonth: false`.
 *
 * @param year  - Full 4-digit year (e.g. 2024)
 * @param month - Zero-based month index (0 = January, 11 = December)
 */
export function buildCells(
  year: number,
  month: number,
): Array<{ day: number; currentMonth: boolean; date: Date }> {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: Array<{ day: number; currentMonth: boolean; date: Date }> = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    cells.push({ day, currentMonth: false, date: new Date(year, month - 1, day) });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, currentMonth: true, date: new Date(year, month, i) });
  }
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, currentMonth: false, date: new Date(year, month + 1, i) });
  }

  return cells;
}

/**
 * Returns `true` if `date` falls strictly between `start` and `end`
 * (exclusive), comparing calendar days only.
 */
export function isDateBetween(date: Date, start: Date, end: Date): boolean {
  const d = date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
  const s = start.getFullYear() * 10000 + start.getMonth() * 100 + start.getDate();
  const e = end.getFullYear() * 10000 + end.getMonth() * 100 + end.getDate();
  return d > s && d < e;
}

/** A start/end date pair used by range pickers. Both ends are optional. */
export interface DateRange {
  start?: Date;
  end?: Date;
}

// ─── Date Formatting ──────────────────────────────────────────────────────────

/**
 * Formats a `Date` using `Intl.DateTimeFormat` with long month, day, and year.
 *
 * @example
 * formatDate(new Date(2024, 11, 25)) // → 'December 25, 2024'
 */
export function formatDate(date: Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** Returns `true` if the given date is in the past. */
export function isExpired(date: Date): boolean {
  return date < new Date();
}
