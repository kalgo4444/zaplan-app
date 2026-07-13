import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';

interface HeroCardProps {
  children: ReactNode;
  /** Ichki elementlar orasidagi masofa — standarti spacing.base. */
  gap?: number;
}

/**
 * DESIGN.md dagi imzo naqsh — oq kanvasdagi dark hero karta.
 * Ekranda ko'pi bilan bitta ishlatiladi (Bugun, Natijalar).
 */
export function HeroCard({ children, gap = spacing.base }: HeroCardProps) {
  return <View style={[styles.card, { gap }]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceDark,
    borderRadius: radius.xl,
    padding: spacing.lg,
  },
});
