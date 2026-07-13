import { StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@/components/ui/progress-bar';
import { colors, radius, spacing, type } from '@/constants/theme';
import type { Workout } from '@/data/workouts';
import { getWorkoutProgressFromIds, usePlanStore } from '@/store/plan-store';

/** Bitta dastur bo'yicha haftalik natija qatori. */
export function WorkoutResultRow({ workout }: { workout: Workout }) {
  const completedIds = usePlanStore((state) => state.completed[workout.id]);
  const progress = getWorkoutProgressFromIds(completedIds, workout.id);
  const isDone = progress.percent === 100;

  return (
    <View style={styles.row}>
      <View style={styles.header}>
        <Text style={type.titleSm}>{workout.title}</Text>
        <Text style={[type.number, { color: isDone ? colors.semanticUp : colors.ink }]}>
          {progress.percent}%
        </Text>
      </View>
      <ProgressBar
        percent={progress.percent}
        color={isDone ? colors.semanticUp : colors.primary}
        height={6}
      />
      <Text style={type.caption}>
        {progress.done} / {progress.total} mashq bajarildi
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.canvas,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    padding: spacing.base,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
