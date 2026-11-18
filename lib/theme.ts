// Design tokens — dataviz skill reference palette (validated light-mode instance).
// Chrome (buttons/brand) uses GrowthCafe navy/green; CHART colors only from the validated series.
export const ui = {
  surface: "#fcfcfb",
  page: "#f9f9f7",
  ink: "#0b0b0b",
  ink2: "#52514e",
  muted: "#898781",
  hairline: "#e1e0d9",
  gridline: "#e1e0d9",
  brand: "#143a6b",       // chrome accent (buttons, active nav)
  brandDeep: "#0f2c52",
  brandGreen: "#0f7a3d",
  deltaUp: "#006300",
};

// Categorical series — adjacent-pair validated order, slot n = entity n (never re-colored by rank)
export const S1 = "#2a78d6"; // blue    → Mutual Funds
export const S2 = "#eb6834"; // orange  → Shares & Bonds
export const S3 = "#1baf7a"; // aqua    → Fixed Income  (sub-3:1 → direct labels shipped)
export const S4 = "#eda100"; // yellow  → Other Assets
export const S5 = "#e87ba4"; // magenta → Foreign Assets

// Status palette — reserved for state, always icon + label
export const STATUS = { good: "#0ca30c", warning: "#fab219", serious: "#ec835a", critical: "#d03b3b" };
