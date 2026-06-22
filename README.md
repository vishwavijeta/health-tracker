# Health Tracker

A React dashboard to track blood-test results over time. Each parameter keeps its
**last 5 readings**, shows the trend on a graph, flags values outside the healthy
range, and lets you add a new reading.

## Stack
- **Vite** — build tool / dev server
- **React 18**
- **Ant Design (antd)** — UI components & theming
- **Recharts** — trend line charts

## Features
- Health snapshot (tests tracked / in range / needs attention)
- Per-test summary cards with latest value, status badge, and change vs previous
- Trend line charts with a shaded healthy-range band and reference range
- Filter charts by test group (CBC, Lipid, Metabolic, etc.)
- Full readings table across the last 5 dates
- "Add Reading" form — appends a new date and rolls the history to the latest 5

## Getting started
```bash
npm install          # if cache errors, use: npm install --cache ./.npm-cache
npm run dev          # start dev server at http://localhost:5173
npm run build        # production build into dist/
npm run preview      # preview the production build
```

## Where to edit
- Tracked tests, reference ranges, and mock readings: `src/data/healthData.js`
- Layout & state: `src/App.jsx`
- Components: `src/components/`
