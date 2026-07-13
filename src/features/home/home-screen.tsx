import { ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ResponsiveContent } from '@/components/ui/responsive-content';
import { ScreenLoading } from '@/components/ui/screen-loading';
import { colors, spacing, type } from '@/constants/theme';
import { getWorkoutIdForDay } from '@/data/schedule';
import { useToday } from '@/hooks/use-today';
import { usePlanStore } from '@/store/plan-store';
import { formatDateLabel } from '@/utils/format-date';

import { RestDay } from './components/rest-day';
import { TodayWorkout } from './components/today-workout';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const schedule = usePlanStore((state) => state.schedule);
  const hasHydrated = usePlanStore((state) => state.hasHydrated);
  const today = useToday();

  if (!hasHydrated) return <ScreenLoading label="Bugungi reja yuklanmoqda" />;

  const weekday = today.getDay();
  const todayWorkoutId = getWorkoutIdForDay(schedule, weekday);

  return (
    <ScrollView style={styles.screen} contentInsetAdjustmentBehavior="automatic">
      <ResponsiveContent
        style={[
          styles.content,
          { paddingTop: process.env.EXPO_OS === 'ios' ? spacing.lg : insets.top + spacing.lg },
        ]}>
        <Text style={type.captionStrong}>{formatDateLabel(today)}</Text>
        {todayWorkoutId ? (
          <TodayWorkout workoutId={todayWorkoutId} />
        ) : (
          <RestDay schedule={schedule} weekday={weekday} />
        )}
      </ResponsiveContent>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
});
