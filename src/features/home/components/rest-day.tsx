import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { BadgePill } from '@/components/ui/badge-pill';
import { HeroCard } from '@/components/ui/hero-card';
import { colors, spacing, type } from '@/constants/theme';
import { getNextWorkout, type ScheduleId } from '@/data/schedule';
import { getWorkout } from '@/data/workouts';

/** Dam olish kuni — keyingi mashg'ulot haqida ma'lumot. */
export function RestDay({ schedule, weekday }: { schedule: ScheduleId; weekday: number }) {
  const router = useRouter();
  const next = getNextWorkout(schedule, weekday);
  const nextWorkout = getWorkout(next.workoutId)!;

  return (
    <View style={styles.stack}>
      <Text style={type.display}>
        Dam <Text style={{ color: colors.primary }}>oling</Text>
      </Text>
      <Text style={type.bodyMd}>
        {"Bugun mashg'ulot yo'q. Mushaklar dam olish kunida tiklanadi va kuchayadi — yaxshi uxlang, suv iching va yengil harakatlaning."}
      </Text>

      <HeroCard>
        <BadgePill label={"Keyingi mashg'ulot"} onDark />
        <Text style={[type.titleMd, { color: colors.onDark }]}>
          {next.dayName} — {nextWorkout.title}
        </Text>
        <Text style={[type.bodySm, { color: colors.onDarkSoft }]}>{nextWorkout.focus}</Text>
      </HeroCard>

      <AppButton
        label="Haftalik rejani ko'rish"
        variant="secondary"
        onPress={() => router.push('/plan')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md,
  },
});
