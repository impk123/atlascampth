# SaaS Pricing Page Patterns

## Tiered Layout
Standard 3-column layout (Free, Pro, Enterprise).
- **Free:** Highlight limitations.
- **Pro:** "Most Popular" badge, gradient borders.
- **Enterprise:** Focus on custom solutions.

## Components
- **Toggle:** Monthly vs. Yearly (with "2 months free" discount).
- **Feature Lists:** Simple checkmarks, hover-to-explain tooltips.
- **Sticky Header:** Keep pricing tiers visible while scrolling through feature comparisons.

## Code Pattern (Tailwind/React)
- **Grid:** `grid grid-cols-1 md:grid-cols-3 gap-8`
- **Cards:** `rounded-xl border border-border p-8 bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow`
- **Buttons:** `w-full rounded-md py-3 px-6 font-semibold`
