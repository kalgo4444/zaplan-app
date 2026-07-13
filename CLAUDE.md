# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Zaplan — a 3-day-per-week gym planner app (Expo SDK 57, React Native 0.86, React 19, TypeScript strict). All UI copy is in **Uzbek**; keep new user-facing text in Uzbek. The product spec lives in `plam.md`, the visual design system in `DESIGN.md`.

## Commands

```bash
npm install            # install dependencies
npx expo start         # dev server (press i / a / w for iOS / Android / web)
npm run lint           # expo lint (ESLint)
npm run typecheck      # tsc --noEmit
npm run check          # full gate: deps:check + doctor + typecheck + lint
npx expo export --platform web --output-dir /tmp/web-export   # bundling smoke test — all routes must export
```

There is no test suite. Use `expo install` (not `npm install`) when adding packages with native code so versions match the SDK. Prettier is configured (`.prettierrc` — tabs, no semicolons, single quotes) but older files haven't all been reformatted; match the style of the file you're editing rather than reformatting whole files.

## Architecture

Layers under `src/` (path alias `@/*` → `src/*`):

- **Static data** (`src/data/`) — the content is code, not a backend. `exercises.ts` holds the 28-exercise catalog (Uzbek descriptions, technique, mistakes); `workouts.ts` defines the three Full Body programs (A/B/C) referencing exercises by id; `schedule.ts` maps the two weekly schedules (`mwf`, `tts`) to JS `getDay()` numbers and computes today's/next workout.
- **State** (`src/store/plan-store.ts`) — single Zustand store persisted to AsyncStorage under the key `zaplan-storage`. Persists only `schedule` and `completed` (a `Record<WorkoutId, string[]>` of done exercise ids). Progress percentages are derived via `getWorkoutProgress` / `getWeekProgress` helpers in the same file, never stored (they also filter stale exercise ids, so read progress through them, not `completed[...].length`). Screens that read the store gate rendering on `hasHydrated`.
- **Routes** (`src/app/`) — expo-router file routing; every route file is a one-line re-export of a screen from `src/features/`. `(tabs)/` holds the four tabs (Bugun, Reja, Katalog, Natijalar); `workout/[id]` is the live workout checklist; `exercise/[id]` the technique detail. Typed routes are enabled — push dynamic routes as `router.push({ pathname: '/workout/[id]', params: { id } })`, not template strings.
- **Features** (`src/features/<name>/`) — one folder per screen: `<name>-screen.tsx` plus its private pieces in `components/`. Screen-specific components live here, not in `src/components/`.
- **Shared UI** (`src/components/`) — `ui/` holds generic design-system primitives (`AppButton`, `BadgePill`, `ProgressBar`, `SegmentedControl`, `HeroCard`, `CountPill`, `PressableCard`, `ScreenLoading`); domain-shared components used across features (e.g. `ExerciseImage`/`ExerciseThumb`) sit at the root. Wrap screen content in `ResponsiveContent` (`ui/responsive-content.tsx`) — it centers content at max 720px and applies the responsive gutter, so screens work on web/tablet.
- **Support** (`src/hooks/`, `src/utils/`) — `useToday()` (focus-refreshing date; never call `new Date()` in render — react-compiler may memoize it), `confirmAction()` (cross-platform confirm; `Alert.alert` is a no-op on web), `formatDateLabel()`.

## Design system rules

`src/constants/theme.ts` is the only source of colors/spacing/radius/type styles, derived from `DESIGN.md` (Coinbase-inspired). The app is **light, white-canvas only** (`#ffffff`, ink `#0a0b0d`). Key constraints from DESIGN.md:

- Coinbase Blue (`colors.primary` — `#0052ff`) is the single brand color: primary CTA pills, active tab tint, progress fills, check states. No second accent color.
- Semantic green/red (`semanticUp` / `semanticDown`) are **text/icon colors only**, never background fills.
- Every CTA is a pill (`radius.pill`): `AppButton variant="primary"` (blue) or `"secondary"` (gray plate); `"secondaryDark"` inside dark hero cards. Labels are sentence-case via `type.button` — no uppercase buttons.
- The signature pattern is the **dark hero card** (`surfaceDark` bg, `radius.xl`) on the white canvas — used on Bugun and Natijalar; at most one per screen.
- Display headings use weight 400 with negative letter-spacing (`type.display`); never bold display copy.
- Fonts: Inter for all UI text, JetBrains Mono (`fonts.mono` / `type.number`) for every numeric value (percent, counts) — loaded in `src/app/_layout.tsx`.
- Uppercase section labels use `BadgePill` or `type.captionStrong`.

## Conventions

- Exercise images are intentionally `null` placeholders: drop files in `assets/images/exercises/` and set the `image` field in `src/data/exercises.ts` (`require(...)`). `ExerciseImage` renders a "Rasm joyi" tile when `null`.
- ESLint `react/no-unescaped-entities` is on and Uzbek text is full of apostrophes — wrap JSX text containing `'` in an expression: `{"Bugungi mashg'ulot"}`.
- The `reactCompiler` experiment is enabled — keep components top-level (don't define components inside render functions).
