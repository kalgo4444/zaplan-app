import { weekdayNames } from '@/data/schedule';

/** "Dushanba, 07.07.2026" ko'rinishidagi sana yorlig'i. */
export function formatDateLabel(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${weekdayNames[date.getDay()]}, ${day}.${month}.${date.getFullYear()}`;
}
