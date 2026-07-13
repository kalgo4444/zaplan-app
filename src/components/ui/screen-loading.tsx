import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, type } from '@/constants/theme';

export function ScreenLoading({ label = "Ma'lumotlar yuklanmoqda" }: { label?: string }) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityLiveRegion="polite"
      style={styles.screen}>
      <ActivityIndicator color={colors.primary} size="small" />
      <Text style={type.bodySm}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.canvas,
  },
});
