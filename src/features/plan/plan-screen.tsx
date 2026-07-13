import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ResponsiveContent } from '@/components/ui/responsive-content';
import { ScreenLoading } from '@/components/ui/screen-loading';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { colors, spacing, type } from '@/constants/theme';
import { scheduleOptions } from '@/data/schedule';
import { workouts } from '@/data/workouts';
import { usePlanStore } from '@/store/plan-store';

import { WorkoutCard } from './components/workout-card';

export function PlanScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const schedule = usePlanStore((state) => state.schedule);
  const setSchedule = usePlanStore((state) => state.setSchedule);
  const hasHydrated = usePlanStore((state) => state.hasHydrated);
  const segmentOptions = scheduleOptions.map((option) => ({
    id: option.id,
    label: width < 390 ? option.compact : option.short,
    accessibilityLabel: option.days,
  }));

  if (!hasHydrated) return <ScreenLoading label="Haftalik reja yuklanmoqda" />;

  return (
    <ScrollView style={styles.screen} contentInsetAdjustmentBehavior="automatic">
      <ResponsiveContent
        style={[
          styles.content,
          {
            paddingTop: process.env.EXPO_OS === 'ios' ? spacing.lg : insets.top + spacing.lg,
          },
        ]}
      >
        <Text style={type.display}>Haftalik reja</Text>
        <Text style={type.bodyMd}>Mashq kunlari orasida kamida bir kun tiklanish bor.</Text>

        <View style={styles.segmentWrap}>
          <SegmentedControl options={segmentOptions} value={schedule} onChange={setSchedule} />
        </View>

        <Text style={[type.captionStrong, styles.sectionTitle]}>Haftalik dasturlar</Text>
        <View style={styles.stack}>
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} schedule={schedule} />
          ))}
        </View>
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
    gap: spacing.base,
    paddingBottom: spacing.xxl,
  },
  segmentWrap: {
    marginTop: spacing.xs,
  },
  sectionTitle: {
    marginTop: spacing.sm,
  },
  stack: {
    gap: spacing.sm,
  },
});
