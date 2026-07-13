import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ExerciseThumb } from '@/components/exercise-image';
import { PressableCard } from '@/components/ui/pressable-card';
import { colors, fonts, radius, spacing, type } from '@/constants/theme';
import { getExercise } from '@/data/exercises';
import type { WorkoutExercise } from '@/data/workouts';

interface ExerciseChecklistCardProps {
  item: WorkoutExercise;
  order: number;
  isDone: boolean;
  onToggle: (exerciseId: string) => void;
  onOpen: (exerciseId: string) => void;
}

/** Jonli mashg'ulotdagi checklist kartasi — belgilash tugmasi bilan. */
export function ExerciseChecklistCard({
  item,
  order,
  isDone,
  onToggle,
  onOpen,
}: ExerciseChecklistCardProps) {
  const exercise = getExercise(item.exerciseId);
  if (!exercise) return null;

  return (
    <PressableCard
      accessibilityLabel={`${exercise.name} tafsilotlari`}
      onPress={() => onOpen(item.exerciseId)}
      style={[styles.card, isDone && styles.cardDone]}
    >
      <ExerciseThumb exercise={exercise} order={order} />
      <View style={styles.info}>
        <Text style={[type.titleMd, isDone && styles.doneText]}>{exercise.name}</Text>
        <Text style={styles.setsText}>{item.sets}</Text>
        <Text style={type.caption}>{item.note}</Text>
      </View>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isDone }}
        aria-checked={isDone}
        accessibilityLabel={`${exercise.name} bajarildi deb belgilash`}
        onPress={(event) => {
          event.stopPropagation();
          onToggle(item.exerciseId);
        }}
        hitSlop={spacing.sm}
        style={[styles.toggleCircle, isDone && styles.toggleCircleDone]}
      >
        <Ionicons
          name={isDone ? 'checkmark' : 'add'}
          size={22}
          color={isDone ? colors.onPrimary : colors.ink}
        />
      </Pressable>
    </PressableCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.base,
    marginBottom: spacing.sm,
  },
  cardDone: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.hairlineSoft,
  },
  info: {
    flex: 1,
    gap: spacing.xxs,
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: colors.muted,
  },
  setsText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.primary,
  },
  toggleCircle: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  toggleCircleDone: {
    backgroundColor: colors.primary,
  },
});
