import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, type } from '@/constants/theme';

interface BadgePillProps {
  label: string;
  /** Dark hero ustida ishlatilganda true — plita va matn dark palitraga o'tadi. */
  onDark?: boolean;
}

/**
 * DESIGN.md dagi "badge-pill" — kichik uppercase seksiya yorlig'i
 * (masalan, "BUGUNGI MASHG'ULOT").
 */
export function BadgePill({ label, onDark }: BadgePillProps) {
  return (
    <View style={[styles.pill, onDark && styles.pillDark]}>
      <Text style={[type.captionStrong, styles.text, onDark && styles.textDark]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.pill,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
  },
  pillDark: {
    backgroundColor: colors.surfaceDarkElevated,
  },
  text: {
    color: colors.ink,
  },
  textDark: {
    color: colors.onDarkSoft,
  },
});
