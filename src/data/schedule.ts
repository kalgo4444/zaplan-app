import type { WorkoutId } from './workouts';

/** Haftalik jadval varianti: mwf — Du/Chor/Ju, tts — Se/Pay/Sha */
export type ScheduleId = 'mwf' | 'tts';

export interface ScheduleOption {
  id: ScheduleId;
  title: string;
  days: string;
  /** Segment tugmasidagi qisqa yorliq */
  short: string;
  /** Juda tor telefonlar uchun ixcham yorliq */
  compact: string;
}

export const scheduleOptions: ScheduleOption[] = [
  {
    id: 'mwf',
    title: 'Birinchi jadval',
    days: 'Dushanba · Chorshanba · Juma',
    short: 'Dush · Chor · Juma',
    compact: 'Du · Chor · Ju',
  },
  {
    id: 'tts',
    title: 'Ikkinchi jadval',
    days: 'Seshanba · Payshanba · Shanba',
    short: 'Sesh · Pay · Shan',
    compact: 'Se · Pay · Sha',
  },
];

/** JS getDay(): 0 — Yakshanba ... 6 — Shanba */
const scheduleDayMap: Record<ScheduleId, Partial<Record<number, WorkoutId>>> = {
  mwf: { 1: 'a', 3: 'b', 5: 'c' },
  tts: { 2: 'a', 4: 'b', 6: 'c' },
};

export const weekdayNames = [
  'Yakshanba',
  'Dushanba',
  'Seshanba',
  'Chorshanba',
  'Payshanba',
  'Juma',
  'Shanba',
];

export const shortDayNames: Record<ScheduleId, string[]> = {
  mwf: ['Dushanba', 'Chorshanba', 'Juma'],
  tts: ['Seshanba', 'Payshanba', 'Shanba'],
};

/** Bugungi kun uchun workout (dam olish kuni bo'lsa null). */
export function getWorkoutIdForDay(schedule: ScheduleId, weekday: number): WorkoutId | null {
  return scheduleDayMap[schedule][weekday] ?? null;
}

/** Keyingi mashg'ulot kuni va dasturi. */
export function getNextWorkout(
  schedule: ScheduleId,
  fromWeekday: number,
): { weekday: number; workoutId: WorkoutId; dayName: string } {
  for (let offset = 1; offset <= 7; offset += 1) {
    const weekday = (fromWeekday + offset) % 7;
    const workoutId = scheduleDayMap[schedule][weekday];
    if (workoutId) {
      return { weekday, workoutId, dayName: weekdayNames[weekday] };
    }
  }
  // Jadvalda doim 3 kun bor — bu nuqtaga yetib kelmaydi.
  return { weekday: 1, workoutId: 'a', dayName: weekdayNames[1] };
}

/** Workout haftaning qaysi kuniga tushishi. */
export function getDayNameForWorkout(schedule: ScheduleId, workoutId: WorkoutId): string {
  const index = { a: 0, b: 1, c: 2 }[workoutId];
  return shortDayNames[schedule][index];
}
