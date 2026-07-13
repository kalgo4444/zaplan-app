import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { BadgePill } from '@/components/ui/badge-pill';
import { HeroCard } from '@/components/ui/hero-card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ResponsiveContent } from '@/components/ui/responsive-content';
import { ScreenLoading } from '@/components/ui/screen-loading';
import { colors, spacing, type } from '@/constants/theme';
import { workouts } from '@/data/workouts';
import { getWeekProgress, usePlanStore } from '@/store/plan-store';
import { confirmAction } from '@/utils/confirm';

import { WorkoutResultRow } from './components/workout-result-row';

export function ResultsScreen() {
  const completed = usePlanStore((state) => state.completed);
  const resetWeek = usePlanStore((state) => state.resetWeek);
  const hasHydrated = usePlanStore((state) => state.hasHydrated);

  if (!hasHydrated) return <ScreenLoading label="Natijalar yuklanmoqda" />;

  const week = getWeekProgress(completed);

  function confirmReset() {
    confirmAction({
      title: 'Haftani yangilash',
      message:
        'Barcha bajarilgan mashqlar tozalanadi. Jadval tanlovi saqlanib qoladi. Davom etasizmi?',
      confirmLabel: 'Yangilash',
      onConfirm: resetWeek,
    });
  }

  return (
    <ScrollView style={styles.screen} contentInsetAdjustmentBehavior="automatic">
      <ResponsiveContent style={styles.content}>
        {/* Dark hero karta — haftalik umumiy natija */}
        <HeroCard gap={spacing.sm}>
          <BadgePill label="Haftalik natija" onDark />
          <Text style={[type.numberLg, styles.heroPercent]}>{week.percent}%</Text>
          <ProgressBar
            percent={week.percent}
            color={week.percent === 100 ? colors.semanticUp : colors.primary}
            height={10}
            onDark
          />
          <Text style={[type.bodySm, { color: colors.onDarkSoft }]}>
            {`${week.finishedWorkouts} / ${workouts.length} mashg'ulot to'liq yakunlandi`}
          </Text>
        </HeroCard>

        <Text style={[type.captionStrong, styles.sectionTitle]}>{"Dasturlar bo'yicha"}</Text>
        <View style={styles.stack}>
          {workouts.map((workout) => (
            <WorkoutResultRow key={workout.id} workout={workout} />
          ))}
        </View>

        <AppButton label="Haftani yangilash" variant="secondary" onPress={confirmReset} />
        <Text style={type.caption}>
          Yangi hafta boshlanganda natijalarni tozalab, dasturni qaytadan boshlang. Natijalar faqat
          shu qurilmada saqlanadi.
        </Text>
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
    paddingTop: spacing.lg,
    gap: spacing.base,
    paddingBottom: spacing.xxl,
  },
  heroPercent: {
    color: colors.onDark,
    fontSize: 56,
  },
  sectionTitle: {
    marginTop: spacing.sm,
  },
  stack: {
    gap: spacing.sm,
  },
});
