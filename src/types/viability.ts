// ──────────────────────────────────────────────────────────────
// VIABILITY LAW — RESULT CONTRACT v1.1.1
// Shared across engine, API, UI, and tests
// ──────────────────────────────────────────────────────────────

export interface ViabilityResult {
  // Time series
  entropy: number[];
  divergence: number[];
  correction: number[];
  margin: number[];
  viability: boolean[];
  time: number[];

  // Aggregate outcome
  viable: boolean;
  timeToCollapse: number | null;
  failureReason: "entropy" | "correction" | "rate" | null;
  summary: string;

  // Diagnostics
  minMargin: number;
  meanMargin: number;
}
