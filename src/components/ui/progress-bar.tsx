import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';

interface ProgressBarProps {
  /** 0–100 oralig'idagi foiz */
  percent: number;
  /** To'ldirish rangi — standarti Coinbase Blue, yakunlanganda semanticUp */
  color?: string;
  height?: number;
  /** Dark hero ustida ishlatilganda true — trek rangi dark palitraga o'tadi. */
  onDark?: boolean;
}

export function ProgressBar({
  percent,
  color = colors.primary,
  height = 8,
  onDark,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
      style={[
        styles.track,
        onDark && styles.trackDark,
        { height, borderRadius: height / 2 },
      ]}>
      <View
        style={[
          styles.fill,
          { width: `${clamped}%`, backgroundColor: color, borderRadius: height / 2 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: colors.surfaceStrong,
    overflow: 'hidden',
  },
  trackDark: {
    backgroundColor: colors.surfaceDarkElevated,
  },
  fill: {
    height: '100%',
  },
});
