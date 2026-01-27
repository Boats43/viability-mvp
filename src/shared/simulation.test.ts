import { runSimulation } from "./simulation";
import { describe, it, expect } from "vitest";

describe("Viability Law — Deterministic Proofs", () => {
  it("Stable system should remain viable", () => {
    const result = runSimulation({
      alpha: 1.5,
      entropyFloor: 0.5,
      noiseLevel: 0.01,
      horizon: 100,
      seed: 42,
    });

    expect(result.viable).toBe(true);
    expect(result.timeToCollapse).toBe(null);
  });

  it("Should fail due to entropy floor", () => {
    const result = runSimulation({
      alpha: 1.2,
      entropyFloor: 3.0,
      noiseLevel: 0.01,
      horizon: 100,
      seed: 42,
    });

    expect(result.viable).toBe(false);
    expect(result.failureReason).toBe("entropy");
  });

  it("Should fail due to correction limit", () => {
    const result = runSimulation({
      alpha: 0.9,
      entropyFloor: 0.3,
      noiseLevel: 0.01,
      horizon: 100,
      seed: 42,
    });

    expect(result.viable).toBe(false);
    expect(result.failureReason).toBe("correction");
  });
});
