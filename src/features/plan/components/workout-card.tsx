import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PressableCard } from '@/components/ui/pressable-card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { colors, fonts, radius, spacing, type } from '@/constants/theme';
import { getDayNameForWorkout, type ScheduleId } from '@/data/schedule';
import type { Workout } from '@/data/workouts';
import { getWorkoutProgressFromIds, usePlanStore } from '@/store/plan-store';

interface WorkoutCardProps {
  workout: Workout;
  schedule: ScheduleId;
}

/** Haftalik rejadagi bitta dastur kartasi — kun, progress va meta bilan. */
export function WorkoutCard({ workout, schedule }: WorkoutCardProps) {
  const router = useRouter();
  const completedIds = usePlanStore((state) => state.completed[workout.id]);
  const progress = getWorkoutProgressFromIds(completedIds, workout.id);

  return (
    <PressableCard
      accessibilityLabel={`${workout.title} dasturini ochish`}
      onPress={() => router.push({ pathname: '/workout/[id]', params: { id: workout.id } })}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.letterBadge}>
          <Text style={type.titleMd}>{workout.letter}</Text>
        </View>
        <View style={styles.info}>
          <Text style={type.captionStrong}>{getDayNameForWorkout(schedule, workout.id)}</Text>
          <Text style={type.titleMd}>{workout.title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.mutedSoft} />
      </View>
      <Text style={type.caption}>{workout.focus}</Text>
      <View style={styles.metaRow}>
        <Text style={[type.caption, styles.metaItem]}>{workout.exercises.length} ta mashq</Text>
        <Text style={[type.caption, styles.metaItem]}>{workout.duration}</Text>
        <Text style={[type.caption, styles.metaPercent]}>{progress.percent}%</Text>
      </View>
      <ProgressBar percent={progress.percent} height={6} />
    </PressableCard>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  letterBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: spacing.xxs,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  metaItem: {
    flexShrink: 1,
  },
  metaPercent: {
    fontFamily: fonts.mono,
    color: colors.ink,
    marginLeft: 'auto',
  },
});
