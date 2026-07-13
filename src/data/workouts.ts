export type WorkoutId = 'a' | 'b' | 'c';

export interface WorkoutExercise {
  exerciseId: string;
  sets: string;
  note: string;
}

export interface Workout {
  id: WorkoutId;
  letter: string;
  title: string;
  focus: string;
  duration: string;
  exercises: WorkoutExercise[];
}

export const workouts: Workout[] = [
  {
    id: 'a',
    letter: 'A',
    title: 'Full Body A',
    focus: "Oyoq, ko'krak va triceps",
    duration: '≈ 65 daqiqa',
    exercises: [
      { exerciseId: 'dynamic-warmup', sets: '5–8 daqiqa', note: 'Butun tanani qizdiring' },
      { exerciseId: 'leg-press', sets: '3 × 12', note: 'Tovon bilan itaring' },
      { exerciseId: 'chest-press', sets: '3 × 12', note: 'Kuraklarni qisib ishlang' },
      { exerciseId: 'lat-pulldown', sets: '3 × 12', note: "Ko'krak yuqorisiga torting" },
      { exerciseId: 'shoulder-press', sets: '3 × 10', note: 'Belni suyanchiqqa yopishtiring' },
      { exerciseId: 'triceps-pushdown', sets: '3 × 12', note: 'Tirsak joyida qolsin' },
      { exerciseId: 'dips', sets: '2 × 8–10', note: 'Kerak bo\'lsa gravitronda' },
      { exerciseId: 'plank', sets: '3 × 30–45 soniya', note: 'Tana tekis chiziqda' },
      { exerciseId: 'treadmill', sets: '10 daqiqa', note: "Tekis sur'atda yakunlang" },
    ],
  },
  {
    id: 'b',
    letter: 'B',
    title: 'Full Body B',
    focus: 'Orqa, oyoq va biceps',
    duration: '≈ 65–70 daqiqa',
    exercises: [
      { exerciseId: 'jump-rope', sets: '5 daqiqa', note: 'Past, tez sakrashlar' },
      { exerciseId: 'goblet-squat', sets: '3 × 12', note: "Ko'krak oldinga qaragan" },
      { exerciseId: 'leg-curl', sets: '3 × 12', note: 'Qaytishni sekin bajaring' },
      { exerciseId: 'dumbbell-bench-press', sets: '3 × 10', note: 'Bilaklar gantel ostida' },
      { exerciseId: 'dead-hang', sets: '3 × 20–30 soniya', note: 'Yelkalar faol holatda' },
      { exerciseId: 'pull-up', sets: '3 × 6–8', note: "Kerak bo'lsa rezina bilan" },
      { exerciseId: 'dumbbell-curl', sets: '3 × 12', note: 'Tirsak qimirlamasin' },
      { exerciseId: 'hammer-curl', sets: '3 × 10', note: 'Kaftlar bir-biriga qaragan' },
      { exerciseId: 'dead-bug', sets: '3 × 10', note: 'Bel yerdan uzilmasin' },
      { exerciseId: 'exercise-bike', sets: '10 daqiqa', note: "O'rtacha qarshilikda" },
    ],
  },
  {
    id: 'c',
    letter: 'C',
    title: 'Full Body C',
    focus: 'Yelka, yengil full body va cardio',
    duration: '≈ 70–75 daqiqa',
    exercises: [
      { exerciseId: 'high-knees', sets: '3 × 30 soniya', note: 'Tizza bel balandligiga' },
      { exerciseId: 'leg-extension', sets: '3 × 12', note: 'Yuqorida qisib turing' },
      { exerciseId: 'chin-up', sets: '3 × 6–8', note: 'Kaftlar o\'zingizga qaragan' },
      { exerciseId: 'chest-press', sets: '3 × 12', note: 'Nazorat bilan qaytaring' },
      { exerciseId: 'arnold-press', sets: '3 × 10', note: 'Burilish tekis taqsimlansin' },
      { exerciseId: 'lateral-raise', sets: '3 × 12', note: 'Yengil vazn, toza texnika' },
      { exerciseId: 'rear-delt-fly', sets: '3 × 12', note: 'Kuraklarni yaqinlashtiring' },
      { exerciseId: 'face-pull', sets: '3 × 15', note: 'Tirsaklar yon-yuqoriga' },
      { exerciseId: 'mountain-climbers', sets: '3 × 30 soniya', note: 'Dumba plank chizig\'ida' },
      { exerciseId: 'incline-walk', sets: '12 daqiqa', note: '5–10% qiyalikda' },
    ],
  },
];

const workoutById = new Map<string, Workout>(workouts.map((workout) => [workout.id, workout]));

export function getWorkout(id: string): Workout | undefined {
  return workoutById.get(id);
}

/** Katalog kartasida ko'rsatiladigan set/rep — mashq uchraydigan birinchi workout'dan. */
const setsByExerciseId = new Map<string, string>();
for (const workout of workouts) {
  for (const item of workout.exercises) {
    if (!setsByExerciseId.has(item.exerciseId)) setsByExerciseId.set(item.exerciseId, item.sets);
  }
}

export function getDefaultSets(exerciseId: string): string | undefined {
  return setsByExerciseId.get(exerciseId);
}
