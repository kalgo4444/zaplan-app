import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ExerciseImage } from '@/components/exercise-image';
import { ResponsiveContent } from '@/components/ui/responsive-content';
import { colors, radius, spacing, type } from '@/constants/theme';
import { getExercise } from '@/data/exercises';

import { DetailSection } from './components/detail-section';

export function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const exercise = getExercise(id ?? '');

  if (!exercise) {
    return (
      <View style={styles.missing}>
        <Text style={type.bodyMd}>Mashq topilmadi.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: exercise.name }} />
      <ScrollView style={styles.screen} contentInsetAdjustmentBehavior="automatic">
        <ResponsiveContent style={styles.content}>
          <ExerciseImage exercise={exercise} />

          <Text style={type.bodyMd}>{exercise.purpose}</Text>

          <View style={styles.chipRow}>
            {exercise.muscles.map((muscle) => (
              <View key={muscle} style={styles.muscleChip}>
                <Text style={[type.captionStrong, { color: colors.ink }]}>{muscle}</Text>
              </View>
            ))}
          </View>

          <DetailSection title="Bajarish tartibi">
            {exercise.steps.map((step, index) => (
              <View key={step} style={styles.stepRow}>
                <View style={styles.stepBadge}>
                  <Text style={[type.captionStrong, { color: colors.ink }]}>{index + 1}</Text>
                </View>
                <Text style={[type.bodyMd, styles.rowText]}>{step}</Text>
              </View>
            ))}
          </DetailSection>

          <DetailSection title="To'g'ri texnika">
            {exercise.tips.map((tip) => (
              <View key={tip} style={styles.stepRow}>
                <Ionicons name="checkmark-circle" size={20} color={colors.semanticUp} />
                <Text style={[type.bodyMd, styles.rowText]}>{tip}</Text>
              </View>
            ))}
          </DetailSection>

          <DetailSection title="Keng tarqalgan xatolar">
            {exercise.mistakes.map((mistake) => (
              <View key={mistake} style={styles.stepRow}>
                <Ionicons name="close-circle" size={20} color={colors.semanticDown} />
                <Text style={[type.bodyMd, styles.rowText]}>{mistake}</Text>
              </View>
            ))}
          </DetailSection>
        </ResponsiveContent>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    paddingTop: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.canvas,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  muscleChip: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.pill,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xxs,
  },
  rowText: {
    flex: 1,
  },
});
