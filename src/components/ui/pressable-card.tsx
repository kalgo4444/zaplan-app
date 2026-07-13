import type { ReactNode } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';

interface PressableCardProps {
  children: ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Hairline ramkali bosiladigan karta — ro'yxat elementlarining umumiy asosi
 * (reja, katalog va workout kartalari shu asosda quriladi).
 */
export function PressableCard({ children, onPress, accessibilityLabel, style }: PressableCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed, style]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.canvas,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    padding: spacing.base,
    gap: spacing.sm,
  },
  cardPressed: {
    backgroundColor: colors.surfaceSoft,
  },
});
