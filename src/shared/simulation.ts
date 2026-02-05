// ──────────────────────────────────────────────────────────────
// VIABILITY LAW — CORE ENGINE v1.0.1
// STRUCTURE LOCKED — DO NOT MODIFY WITHOUT SEMVER VERSION BUMP
//
// This module encodes the core simulation law:
//   - Entropy must stay above floor
//   - Correction must exceed divergence
// Viability is lost if either fails over time.
//
// All downstream systems (UI, API, tests) must use this as-is.
// v1.0.1: add explicit margin diagnostics (C - D) and clearer summary.
// ──────────────────────────────────────────────────────────────

import seedrandom from "seedrandom";
import { ViabilityResult } from "../types/viability";

export function runSimulation(params: {
  alpha: number;
  entropyFloor: number;
  noiseLevel: number;
  horizon: number;
  seed?: number;
}): ViabilityResult {
  const { alpha, entropyFloor, noiseLevel, horizon, seed } = params;

  const n = 10;
  const rng = seed !== undefined ? seedrandom(seed.toString()) : Math.random;

  let Q = Array.from({ length: n }, () => rng());
  normalize(Q);

  const entropy: number[] = [];
  const divergence: number[] = [];
  const correction: number[] = [];
  const margin: number[] = [];
  const viability: boolean[] = [];
  const time: number[] = [];

  let viable = true;
  let timeToCollapse: number | null = null;
  let failureReason: "entropy" | "correction" | null = null;
  let summary: string | null = null;

  // Margin diagnostics
  let minMargin = Number.POSITIVE_INFINITY;
  let sumMargin = 0;

  for (let t = 0; t < horizon; t++) {
    // Generate environmental distribution P
    const P = Array.from({ length: n }, () => rng() + 0.3);
    normalize(P);

    // Entropy (H)
    const H = -Q.reduce((acc, p) => acc + p * Math.log(p), 0);

    // Divergence (D)
    const D = Q.reduce((acc, q, i) => acc + q * Math.log(q / P[i]), 0);

    // Correction (C)
    const C = alpha * D;

    // Margin (M = C - D)
    const M = C - D;

    // Viability condition
    const isViable = C > D && H > entropyFloor;

    entropy.push(H);
    divergence.push(D);
    correction.push(C);
    margin.push(M);
    viability.push(isViable);
    time.push(t);

    // Track margin stats over time
    if (M < minMargin) minMargin = M;
    sumMargin += M;

    if (!isViable) {
      viable = false;
      timeToCollapse = t;

      if (H <= entropyFloor) {
        failureReason = "entropy";
        summary = "System lost adaptive variety faster than required for viability.";
      } else if (C <= D) {
        failureReason = "correction";
        summary = "System could not respond to environmental divergence.";
      }

      break;
    }

    // Adaptive update of internal model Q
    for (let i = 0; i < n; i++) {
      Q[i] = Q[i] - alpha * (Q[i] - P[i]);
    }

    // Noise injection
    for (let i = 0; i < n; i++) {
      Q[i] += noiseLevel * (rng() - 0.5);
      if (Q[i] < 0) Q[i] = 1e-6;
    }

    normalize(Q);
  }

  // Handle edge case where loop exits immediately (no steps)
  if (!isFinite(minMargin)) {
    minMargin = 0;
  }
  const meanMargin = margin.length > 0 ? sumMargin / margin.length : 0;

  // Clear, non-misleading summary
  const defaultSummary = viable
    ? `System survived full horizon (${horizon} steps).`
    : `System failed at step ${timeToCollapse}.`;

  return {
    entropy,
    divergence,
    correction,
    margin,
    viability,
    time,
    viable,
    timeToCollapse,
    failureReason,
    summary: summary ?? defaultSummary,
    minMargin,
    meanMargin,
  };
}

// Normalize probability distribution
function normalize(v: number[]) {
  const sum = v.reduce((a, b) => a + b, 0);
  for (let i = 0; i < v.length; i++) v[i] /= sum;
}
