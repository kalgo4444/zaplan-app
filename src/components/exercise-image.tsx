import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing, type } from '@/constants/theme';
import type { Exercise, MuscleGroupId } from '@/data/exercises';

const groupIcons: Record<MuscleGroupId, ComponentProps<typeof Ionicons>['name']> = {
  yelka: 'body-outline',
  qol: 'barbell-outline',
  oyoq: 'walk-outline',
  cardio: 'pulse-outline',
};

interface ExerciseImageProps {
  exercise: Exercise;
  height?: number;
}

/**
 * Mashq rasmi. Rasm hali qo'shilmagan bo'lsa, "Rasm joyi" plashka ko'rsatiladi.
 * Rasm qo'shish: src/data/exercises.ts dagi `image` maydoniga require(...) yozing.
 */
export function ExerciseImage({ exercise, height }: ExerciseImageProps) {
  const mediaSize = height == null ? styles.detailMedia : { height };

  if (exercise.image) {
    return (
      <Image
        source={exercise.image}
        style={[styles.image, mediaSize]}
        contentFit="contain"
        accessibilityLabel={exercise.name}
        recyclingKey={exercise.id}
        transition={150}
      />
    );
  }
  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`${exercise.name} mashqi uchun ${exercise.group} belgisi`}
      style={[styles.placeholder, mediaSize]}
    >
      <View style={styles.placeholderIcon}>
        <Ionicons name={groupIcons[exercise.group]} size={44} color={colors.primary} />
      </View>
      <Text style={styles.placeholderTitle}>{"Mashq ko'rsatmasi"}</Text>
      <Text style={[type.captionStrong, styles.placeholderHint]}>{exercise.name}</Text>
    </View>
  );
}

interface ExerciseThumbProps {
  exercise: Exercise;
  size?: number;
  /** Mashqning workout ichidagi tartib raqami — rasm ustida "01" plashka */
  order?: number;
}

/**
 * Karta ichidagi kichik rasm plitasi. Rasm hali yo'q bo'lsa — bo'sh kulrang
 * joy qoldiriladi (rasm keyin qo'shiladi).
 */
export function ExerciseThumb({ exercise, size = 72, order }: ExerciseThumbProps) {
  return (
    <View style={[styles.thumb, { width: size, height: size }]}>
      {exercise.image && (
        <Image
          source={exercise.image}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          cachePolicy="memory-disk"
          accessibilityLabel={exercise.name}
          recyclingKey={exercise.id}
        />
      )}
      {!exercise.image && (
        <Ionicons name={groupIcons[exercise.group]} size={30} color={colors.primary} />
      )}
      {order != null && (
        <View style={styles.orderPill}>
          <Text style={styles.orderText}>{String(order).padStart(2, '0')}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  thumb: {
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.hairlineSoft,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderPill: {
    position: 'absolute',
    bottom: spacing.xxs,
    left: spacing.xxs,
    backgroundColor: colors.ink,
    borderRadius: radius.pill,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  orderText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.onDark,
  },
  image: {
    width: '100%',
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceSoft,
  },
  detailMedia: {
    aspectRatio: 1,
  },
  placeholder: {
    width: '100%',
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  placeholderIcon: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderTitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.body,
  },
  placeholderHint: {
    color: colors.mutedSoft,
  },
});
