import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, spacing, type } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'secondaryDark';

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * DESIGN.md bo'yicha CTA ierarxiyasi — hamma tugma pill (100px) geometriyada:
 * `primary` — Coinbase Blue, `secondary` — kulrang plita (oq kanvasda),
 * `secondaryDark` — dark hero ichidagi ikkilamchi tugma.
 */
export function AppButton({ label, onPress, variant = 'primary', disabled, style }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && pressedStyles[variant],
        disabled && styles.disabled,
        style,
      ]}>
      <Text style={[type.button, { color: labelColors[variant] }, disabled && styles.disabledLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const labelColors: Record<ButtonVariant, string> = {
  primary: colors.onPrimary,
  secondary: colors.ink,
  secondaryDark: colors.onDark,
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    minHeight: 48,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surfaceStrong,
  },
  secondaryDark: {
    backgroundColor: colors.surfaceDarkElevated,
  },
  disabled: {
    backgroundColor: colors.primaryDisabled,
  },
  disabledLabel: {
    color: colors.onPrimary,
  },
});

const pressedStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primaryActive,
  },
  secondary: {
    backgroundColor: colors.hairline,
  },
  secondaryDark: {
    backgroundColor: '#22252b',
  },
});
