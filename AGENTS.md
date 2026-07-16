# Zaplan Agent Guide

## Platform and commands

- This is an Expo SDK 57 app. Consult the versioned Expo docs before changing
  Expo configuration or SDK APIs: <https://docs.expo.dev/versions/v57.0.0/>.
- Use npm and the committed `package-lock.json`: `npm install`.
- Run `npm run check` before finishing changes. It runs dependency
  compatibility, Expo Doctor, TypeScript, then ESLint in that order.
- There is no test suite. For a route/bundle smoke test, run
  `npx expo export --platform web --output-dir /tmp/web-export`.
- Add native or Expo packages with `npx expo install <package>`, not
  `npm install`, to retain SDK-compatible versions.
- Prettier is tabs, no semicolons, single quotes, and 80 columns. Older files
  use mixed formatting; match the file being edited rather than reformatting
  unrelated code.

## Architecture

- `src/app/` is Expo Router file routing; route files deliberately re-export
  screens from `src/features/`. Keep screen-specific components in each
  feature's `components/` directory and reusable primitives in
  `src/components/`.
- `src/data/` is the product's source of truth, not a backend: exercises, the
  three workouts, and weekly schedules reference each other by IDs. Add exercise
  images as static WebP `require(...)` calls in `src/data/exercises.ts` from
  `assets/images/exercises/`.
- `src/store/plan-store.ts` is the only persisted Zustand state. AsyncStorage
  key `zaplan-storage` persists only the schedule and completed exercise IDs;
  use its progress helpers rather than counting persisted IDs directly, and gate
  store-backed screens on `hasHydrated`.
- Typed routes are enabled. Navigate to dynamic routes with
  `router.push({ pathname: '/workout/[id]', params: { id } })`, not interpolated
  path strings.
- The React Compiler experiment is enabled: do not construct dates during
  render; use `useToday()` for day-sensitive screens, and keep component
  declarations at module scope.

## Product and UI constraints

- All user-facing copy is Uzbek. `plam.md` is the product specification and
  `DESIGN.md` is the visual specification.
- Use `src/constants/theme.ts` as the sole source for colors, typography,
  spacing, and radius. Wrap screen content in `ResponsiveContent` so web and
  tablet content stays guttered and capped at 720px.
- The UI is light-only with Coinbase Blue as its sole brand color; semantic
  green/red are text and icon colors only. Numeric values use `type.number` or
  `type.numberLg` (JetBrains Mono).
- JSX text containing Uzbek apostrophes must be an expression, for example
  `{"Bugungi mashg'ulot"}`, to satisfy `react/no-unescaped-entities`.
