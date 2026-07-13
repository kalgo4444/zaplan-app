import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { ExerciseThumb } from '@/components/exercise-image';
import { PressableCard } from '@/components/ui/pressable-card';
import { colors, fonts, spacing, type } from '@/constants/theme';
import type { Exercise } from '@/data/exercises';
import { getDefaultSets } from '@/data/workouts';

interface ExerciseListCardProps {
  exercise: Exercise;
  onOpen: (exerciseId: string) => void;
}

/** Katalogdagi mashq kartasi — rasm, nom, set/rep va maqsad. */
export function ExerciseListCard({ exercise, onOpen }: ExerciseListCardProps) {
  const sets = getDefaultSets(exercise.id);
  return (
    <PressableCard
      accessibilityLabel={`${exercise.name} tafsilotlari`}
      onPress={() => onOpen(exercise.id)}
      style={styles.card}
    >
      <ExerciseThumb exercise={exercise} size={64} />
      <View style={styles.info}>
        <Text style={type.titleMd}>{exercise.name}</Text>
        {sets && <Text style={styles.setsText}>{sets}</Text>}
        <Text style={type.caption} numberOfLines={3}>
          {exercise.purpose}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.mutedSoft} />
    </PressableCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  info: {
    flex: 1,
    gap: spacing.xxs,
  },
  setsText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.primary,
  },
});
