import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { BadgePill } from '@/components/ui/badge-pill';
import { HeroCard } from '@/components/ui/hero-card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { colors, radius, spacing, type } from '@/constants/theme';
import { getWorkout, type WorkoutId } from '@/data/workouts';
import { getWorkoutProgressFromIds, usePlanStore } from '@/store/plan-store';

/** Bugun mashg'ulot kuni — dark hero karta bilan progress va CTA. */
export function TodayWorkout({ workoutId }: { workoutId: WorkoutId }) {
  const router = useRouter();
  const completedIds = usePlanStore((state) => state.completed[workoutId]);
  const workout = getWorkout(workoutId)!;
  const progress = getWorkoutProgressFromIds(completedIds, workoutId);
  const isDone = progress.percent === 100;
  const isStarted = progress.done > 0;

  return (
    <View style={styles.stack}>
      <Text style={type.display}>
        Full Body <Text style={{ color: colors.primary }}>{workout.letter}</Text>
      </Text>
      <Text style={type.bodyMd}>{workout.focus}</Text>

      <HeroCard>
        <BadgePill label={"Bugungi mashg'ulot"} onDark />
        <View style={styles.progressHeader}>
          <Text style={[type.titleMd, { color: colors.onDark }]}>Progress</Text>
          <Text style={[type.number, { color: colors.onDark }]}>{progress.percent}%</Text>
        </View>
        <ProgressBar
          percent={progress.percent}
          onDark
          color={isDone ? colors.semanticUp : colors.primary}
        />
        <Text style={[type.bodySm, { color: colors.onDarkSoft }]}>
          {isDone
            ? "Bugungi mashg'ulot to'liq yakunlandi. Barakalla!"
            : isStarted
              ? 'Davom eting — ozgina qoldi.'
              : "Hali boshlanmadi. Tayyor bo'lsangiz, boshlaymiz!"}
        </Text>
        <AppButton
          label={
            isDone
              ? "Yakunlandi — ko'rib chiqish"
              : isStarted
                ? 'Davom ettirish'
                : 'Mashqni boshlash'
          }
          onPress={() =>
            router.push({
              pathname: '/workout/[id]',
              params: { id: workoutId },
            })
          }
        />
      </HeroCard>

      <View style={styles.metaRow}>
        <MetaItem label="Mashqlar" value={`${workout.exercises.length} ta`} />
        <MetaItem label="Davomiylik" value={workout.duration} />
        <MetaItem label="Bajarildi" value={`${progress.done}/${progress.total}`} />
      </View>
    </View>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaItem}>
      <Text style={type.captionStrong}>{label}</Text>
      <Text style={type.number}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaItem: {
    flex: 1,
    flexBasis: '30%',
    minWidth: 140,
    backgroundColor: colors.canvas,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    padding: spacing.base,
    gap: spacing.xxs,
  },
});
