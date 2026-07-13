import type { TextStyle } from 'react-native';

/**
 * Zaplan dizayn tizimi — DESIGN.md (Coinbase-design-analysis) asosida.
 * Oq kanvas + siyoh matn; yagona brend rang — Coinbase Blue (#0052ff).
 * Semantik yashil/qizil faqat matn rangi sifatida ishlatiladi.
 */

export const colors = {
  primary: '#0052ff',
  primaryActive: '#003ecc',
  primaryDisabled: '#a8b8cc',
  ink: '#0a0b0d',
  body: '#5b616e',
  // Oq fonda kichik matn uchun WCAG AA kontrasti: 5.38:1 va 4.83:1.
  muted: '#646b76',
  mutedSoft: '#6b7280',
  hairline: '#dee1e6',
  hairlineSoft: '#eef0f3',
  canvas: '#ffffff',
  surfaceSoft: '#f7f7f7',
  surfaceStrong: '#eef0f3',
  surfaceDark: '#0a0b0d',
  surfaceDarkElevated: '#16181c',
  onPrimary: '#ffffff',
  onDark: '#ffffff',
  onDarkSoft: '#a8acb3',
  semanticUp: '#05b169',
  semanticDown: '#cf202f',
} as const;

/** CoinbaseDisplay/Sans → Inter, CoinbaseMono → JetBrains Mono (DESIGN.md substitutes). */
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  mono: 'JetBrainsMono_500Medium',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  base: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 100,
  full: 9999,
} as const;

export const type = {
  /** Ekran sarlavhasi — display weight 400, manfiy tracking (mobil: 40px). */
  display: {
    fontFamily: fonts.regular,
    fontSize: 40,
    letterSpacing: -1,
    color: colors.ink,
  },
  displaySm: {
    fontFamily: fonts.regular,
    fontSize: 28,
    letterSpacing: -0.5,
    color: colors.ink,
  },
  titleLg: {
    fontFamily: fonts.regular,
    fontSize: 24,
    letterSpacing: -0.3,
    color: colors.ink,
  },
  titleMd: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: colors.ink,
  },
  titleSm: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.ink,
  },
  bodyMd: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.body,
  },
  bodyStrong: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.ink,
  },
  bodySm: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.body,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
  },
  captionStrong: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  /** Har bir raqamli qiymat mono shriftda (number-display). */
  number: {
    fontFamily: fonts.mono,
    fontSize: 18,
    color: colors.ink,
  },
  numberLg: {
    fontFamily: fonts.mono,
    fontSize: 44,
    letterSpacing: -1,
    color: colors.ink,
  },
  button: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.ink,
  },
} as const satisfies Record<string, TextStyle>;
