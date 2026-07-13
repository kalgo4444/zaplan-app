import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View, type ListRenderItem } from 'react-native';

import { CountPill } from '@/components/ui/count-pill';
import { ProgressBar } from '@/components/ui/progress-bar';
import { contentMaxWidth, useResponsiveGutter } from '@/components/ui/responsive-content';
import { ScreenLoading } from '@/components/ui/screen-loading';
import { colors, radius, spacing, type } from '@/constants/theme';
import { getWorkout, type WorkoutExercise } from '@/data/workouts';
import { getWorkoutProgressFromIds, usePlanStore } from '@/store/plan-store';

import { ExerciseChecklistCard } from './components/exercise-checklist-card';

export function WorkoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const workout = getWorkout(id ?? '');
  const completedIds = usePlanStore((state) => (workout ? state.completed[workout.id] : undefined));
  const toggleExercise = usePlanStore((state) => state.toggleExercise);
  const hasHydrated = usePlanStore((state) => state.hasHydrated);
  const gutter = useResponsiveGutter();
  const doneIds = useMemo(() => new Set(completedIds ?? []), [completedIds]);
  const onToggle = useCallback(
    (exerciseId: string) => {
      if (!workout) return;
      if (process.env.EXPO_OS === 'ios' || process.env.EXPO_OS === 'android') {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
      }
      toggleExercise(workout.id, exerciseId);
    },
    [toggleExercise, workout],
  );
  const onOpen = useCallback(
    (exerciseId: string) => {
      router.push({ pathname: '/exercise/[id]', params: { id: exerciseId } });
    },
    [router],
  );
  const renderExercise: ListRenderItem<WorkoutExercise> = useCallback(
    ({ item, index }) => (
      <ExerciseChecklistCard
        item={item}
        order={index + 1}
        isDone={doneIds.has(item.exerciseId)}
        onToggle={onToggle}
        onOpen={onOpen}
      />
    ),
    [doneIds, onOpen, onToggle],
  );

  if (!hasHydrated) return <ScreenLoading label="Mashg'ulot yuklanmoqda" />;

  if (!workout) {
    return (
      <View style={styles.missing}>
        <Text style={type.bodyMd}>{"Mashg'ulot topilmadi."}</Text>
      </View>
    );
  }

  const progress = getWorkoutProgressFromIds(completedIds, workout.id);

  return (
    <>
      <Stack.Screen options={{ title: workout.title }} />
      <FlatList
        style={styles.screen}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[styles.content, { paddingHorizontal: gutter }]}
        data={workout.exercises}
        keyExtractor={(item) => item.exerciseId}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        updateCellsBatchingPeriod={40}
        windowSize={5}
        removeClippedSubviews={process.env.EXPO_OS === 'android'}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={type.bodyMd}>{workout.focus}</Text>
            <View style={styles.progressRow}>
              <Text style={type.titleSm}>
                {progress.done} / {progress.total} mashq
              </Text>
              <Text style={type.number}>{progress.percent}%</Text>
            </View>
            <ProgressBar
              percent={progress.percent}
              color={progress.percent === 100 ? colors.semanticUp : colors.primary}
            />
            {progress.percent === 100 && (
              <View style={styles.doneBanner}>
                <Ionicons name="trophy" size={18} color={colors.semanticUp} />
                <Text style={[type.titleSm, { color: colors.semanticUp }]}>
                  {"Mashg'ulot yakunlandi!"}
                </Text>
              </View>
            )}
            <View style={styles.listTitleRow}>
              <Text style={type.titleLg}>Mashqlar</Text>
              <CountPill label={`${progress.total} ta`} />
            </View>
          </View>
        }
        renderItem={renderExercise}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    width: '100%',
    maxWidth: contentMaxWidth,
    alignSelf: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.canvas,
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.base,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doneBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.base,
    alignSelf: 'flex-start',
  },
  listTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
});
