import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/constants/theme';

/** Kichik kulrang pill — ro'yxat sonini ko'rsatadi (masalan, "9 ta"). */
export function CountPill({ label }: { label: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.pill,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.ink,
  },
});
