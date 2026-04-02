# Dashboard Patterns

## Monitoring Dashboard Layout
- **Stats Cards (Top Row):** 3-4 cards for key metrics (Requests, Latency, Error Rate, Cost).
- **Charts (Main Section):** Time-series data visualization. Use SVG for performance and accessibility.
- **Activity Feed (Side or Bottom):** Real-time logs or recent events.

## Components
- **Stats Card:** `bg-muted/50 p-6 rounded-lg border border-border` with a large number and a small sparkline.
- **Chart:** Use `viewBox="0 0 100 40"` for simple sparklines or large area charts.
- **Activity Feed:** `flex items-center gap-4 py-3 border-b last:border-0`

## Visual Polish
- **Status Indicators:** Pulsing dots for "Live" data (`animate-pulse`).
- **Gradients:** Subtle background gradients on active cards.
- **Micro-interactions:** Hover effects on chart points and list items.
