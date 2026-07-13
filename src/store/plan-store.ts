import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ScheduleId } from '@/data/schedule';
import { workouts, type WorkoutId } from '@/data/workouts';

interface PlanState {
  schedule: ScheduleId;
  /** workoutId -> bajarilgan mashq id'lari */
  completed: Record<WorkoutId, string[]>;
  hasHydrated: boolean;
  setSchedule: (schedule: ScheduleId) => void;
  toggleExercise: (workoutId: WorkoutId, exerciseId: string) => void;
  resetWeek: () => void;
  setHasHydrated: (value: boolean) => void;
}

function createEmptyCompleted(): Record<WorkoutId, string[]> {
  return { a: [], b: [], c: [] };
}

const workoutProgressMeta = new Map(
  workouts.map((workout) => [
    workout.id,
    {
      total: workout.exercises.length,
      validIds: new Set(workout.exercises.map((item) => item.exerciseId)),
    },
  ]),
);

function sanitizePersistedState(value: unknown): Pick<PlanState, 'schedule' | 'completed'> {
  const persisted = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  const rawCompleted =
    persisted.completed && typeof persisted.completed === 'object'
      ? (persisted.completed as Record<string, unknown>)
      : {};
  const completed = createEmptyCompleted();

  for (const workout of workouts) {
    const savedIds = rawCompleted[workout.id];
    const validIds = workoutProgressMeta.get(workout.id)?.validIds;
    if (!Array.isArray(savedIds) || !validIds) continue;

    completed[workout.id] = savedIds.filter(
      (id): id is string => typeof id === 'string' && validIds.has(id),
    );
  }

  return {
    schedule: persisted.schedule === 'tts' ? 'tts' : 'mwf',
    completed,
  };
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      schedule: 'mwf',
      completed: createEmptyCompleted(),
      hasHydrated: false,
      setSchedule: (schedule) => set({ schedule }),
      toggleExercise: (workoutId, exerciseId) =>
        set((state) => {
          // Eski persist versiyasida kalit bo'lmasligi mumkin — himoya bilan o'qiymiz.
          const current = state.completed[workoutId] ?? [];
          const isDone = current.includes(exerciseId);
          return {
            completed: {
              ...state.completed,
              [workoutId]: isDone
                ? current.filter((id) => id !== exerciseId)
                : [...current, exerciseId],
            },
          };
        }),
      resetWeek: () => set({ completed: createEmptyCompleted() }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'zaplan-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        schedule: state.schedule,
        completed: state.completed,
      }),
      version: 1,
      migrate: (persistedState) => sanitizePersistedState(persistedState),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...sanitizePersistedState(persistedState),
      }),
      onRehydrateStorage: (state) => () => {
        if (process.env.EXPO_OS !== 'web' || typeof window !== 'undefined') {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);

/** Mashg'ulot bajarilish foizi (0–100). */
export function getWorkoutProgressFromIds(
  completedIds: readonly string[] | undefined,
  workoutId: WorkoutId,
): { done: number; total: number; percent: number } {
  const meta = workoutProgressMeta.get(workoutId);
  if (!meta) return { done: 0, total: 0, percent: 0 };

  // Dastur tarkibi o'zgarganda saqlangan eski id'lar foizni 100% dan oshirmasligi
  // uchun faqat workout tarkibidagi mashqlarni sanaymiz.
  const done = (completedIds ?? []).filter((id) => meta.validIds.has(id)).length;
  const percent = meta.total === 0 ? 0 : Math.round((done / meta.total) * 100);
  return { done, total: meta.total, percent };
}

/** Mashg'ulot bajarilish foizi (0–100). */
export function getWorkoutProgress(
  completed: Record<WorkoutId, string[]>,
  workoutId: WorkoutId,
): { done: number; total: number; percent: number } {
  return getWorkoutProgressFromIds(completed[workoutId], workoutId);
}

/** Haftalik umumiy bajarilish foizi. */
export function getWeekProgress(completed: Record<WorkoutId, string[]>): {
  percent: number;
  finishedWorkouts: number;
} {
  let totalExercises = 0;
  let doneExercises = 0;
  let finishedWorkouts = 0;
  for (const workout of workouts) {
    const { done, total } = getWorkoutProgress(completed, workout.id);
    totalExercises += total;
    doneExercises += done;
    if (total > 0 && done === total) finishedWorkouts += 1;
  }
  return {
    percent: totalExercises === 0 ? 0 : Math.round((doneExercises / totalExercises) * 100),
    finishedWorkouts,
  };
}
