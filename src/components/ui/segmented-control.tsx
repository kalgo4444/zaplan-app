import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/constants/theme';

export interface SegmentOption<T extends string> {
  id: T;
  label: string;
  /** Ekran o'quvchisi uchun to'liq nom (ixtiyoriy). */
  accessibilityLabel?: string;
}

interface SegmentedControlProps<T extends string> {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (id: T) => void;
  /** true — segmentlar gorizontal aylanadi (ko'p variantli filtr uchun). */
  scrollable?: boolean;
}

/**
 * DESIGN.md dagi segmentli tanlagich — pill trek ichida oq tanlangan segment.
 * `scrollable=false` — segmentlar trekni teng bo'lishadi (jadval tanlovi),
 * `scrollable=true` — kontent kengligida, gorizontal skroll (katalog filtri).
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  scrollable,
}: SegmentedControlProps<T>) {
  const segments = options.map((option) => (
    <Segment
      key={option.id}
      label={option.label}
      accessibilityLabel={option.accessibilityLabel}
      isSelected={option.id === value}
      scrollable={scrollable}
      onPress={() => onChange(option.id)}
    />
  ));

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        accessibilityRole="radiogroup"
        style={styles.trackScrollable}
        contentContainerStyle={styles.trackContent}
      >
        {segments}
      </ScrollView>
    );
  }

  return (
    <View accessibilityRole="radiogroup" style={[styles.track, styles.trackContent]}>
      {segments}
    </View>
  );
}

function Segment({
  label,
  accessibilityLabel,
  isSelected,
  scrollable,
  onPress,
}: {
  label: string;
  accessibilityLabel?: string;
  isSelected: boolean;
  scrollable?: boolean;
  onPress: () => void;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected }}
      aria-checked={isSelected}
      accessibilityLabel={accessibilityLabel ?? label}
      focusable
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPress={onPress}
      style={[
        styles.segment,
        scrollable ? styles.segmentScrollable : styles.segmentFill,
        isSelected && styles.segmentSelected,
        isFocused && styles.segmentFocused,
      ]}
    >
      <Text
        style={[styles.segmentLabel, isSelected && styles.segmentLabelSelected]}
        numberOfLines={2}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.pill,
  },
  trackScrollable: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.pill,
    flexGrow: 0,
  },
  trackContent: {
    padding: spacing.xxs,
  },
  segment: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  segmentFill: {
    flex: 1,
    paddingHorizontal: spacing.xs,
  },
  segmentScrollable: {
    paddingHorizontal: spacing.md,
  },
  segmentSelected: {
    backgroundColor: colors.canvas,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
  },
  segmentFocused: {
    borderColor: colors.primary,
  },
  segmentLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    textAlign: 'center',
    color: colors.muted,
  },
  segmentLabelSelected: {
    fontFamily: fonts.semibold,
    color: colors.ink,
  },
});
