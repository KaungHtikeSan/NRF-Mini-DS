# NRF Design System Foundation v0.1

This is a token-first foundation. Source JSON is platform-independent; Swift, Kotlin, CSS, and TypeScript files are generated outputs. Components are intentionally out of scope.

## Structure

    design-system/
      tokens/source/       editable source of truth
      scripts/             generator and stale-output validator
      generated/web/       CSS custom properties and TypeScript
      generated/ios/       SwiftUI and UIKit-friendly tokens
      generated/android/   Jetpack Compose tokens
      components/          future components only

## Workflow

1. Change a token only in tokens/source.
2. Run npm run generate:tokens.
3. Commit source JSON and generated outputs together.
4. Run npm run validate:tokens in CI.

The Figma export typo border-seprator is retained in source metadata. Generated developer APIs expose it as borderSeparator.

## Platform usage

Web imports generated/web/tokens.css, then uses a variable such as var(--color-text-primary) or var(--spacing-4). Apply a generated class such as nrf-typography-heading to use a complete text style. TypeScript consumers can import nrfColors, nrfSpacing, and nrfTypography from generated/web/tokens.

In SwiftUI use NRFTypography.body1Rg, NRFSwiftUIColors.textPrimary, and NRFSpacing.spacing4. The generated Swift file also makes UIColor tokens available for UIKit.

In Jetpack Compose use NRFColors.textPrimary and NRFSpacing.spacing4. Each NRFTypography style is a specification; call toTextStyle with the app's licensed FontFamily. Helvetica Neue and Inconsolata must be bundled or mapped by the host app where they are unavailable.

The catalog downloads these generated artifacts through /api/tokens/ios and /api/tokens/android. The download endpoint reads the generated platform files directly; it does not maintain a separate token copy.

## Adding future tokens and components

Spacing is the authorized 4px scale from spacing-1 through spacing-16. Extend it contiguously when needed. Radius, borders, shadows, success state, and additional color modes are not defined in the supplied source and are intentionally absent.

When adding a token category, create a source JSON file, add its validator and platform transforms to the generator, regenerate, and document its APIs. A future component may only consume semantic generated tokens; it must not add raw color, type, or spacing values. Component state decisions without an existing source token require a design decision before coding the component.
