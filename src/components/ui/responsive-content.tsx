import type { ReactNode } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { spacing } from '@/constants/theme';

export const contentMaxWidth = 720;

export function useResponsiveGutter() {
  const { width } = useWindowDimensions();
  return width >= 768 ? spacing.xl : spacing.lg;
}

export function ResponsiveContent({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const gutter = useResponsiveGutter();

  return <View style={[styles.content, { paddingHorizontal: gutter }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: contentMaxWidth,
    alignSelf: 'center',
  },
});
