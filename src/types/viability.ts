// Viability Law v1.0 — DO NOT MODIFY WITHOUT VERSION BUMP

export interface ViabilityResult {
  entropy: number[];
  divergence: number[];
  correction: number[];
  viability: boolean[];
  time: number[];
  viable: boolean;
  timeToCollapse: number | null;
  failureReason: "entropy" | "correction" | null;
  summary: string;
}
