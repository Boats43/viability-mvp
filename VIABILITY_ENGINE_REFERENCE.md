# Viability Law Core Engine — v1.1.1

**File:** src/shared/simulation.ts  
**Result type:** ViabilityResult (src/types/viability.ts)  
**Status:** Reference implementation (structure locked)

---

## 1. What this module is

This module implements a **discrete-time, necessary-condition monitor** for the Viability Law:

> A system is viable only if:
> - its divergence shrinks fast enough to overcome delay-amplified instability, and  
> - its adaptive entropy stays above a minimum floor.

This engine:

- does **not** predict the future,
- does **not** guarantee stability,
- does **not** optimize anything.

It **only checks** whether the Viability Law’s inequality holds along a trajectory.

---

## 2. Inputs (simulation parameters)

unSimulation(params) expects:

- lpha: number  
  Adaptive update gain for the internal model Q (diagnostic dynamics).

- entropyFloor: number  
  Minimum allowed Shannon entropy H(Q_t). If H ≤ entropyFloor, system fails by **entropy collapse**.

- 
oiseLevel: number  
  Amplitude of injected noise into Q each step.

- horizon: number  
  Number of discrete time-steps to simulate.

- 	au: number  
  Effective delay / latency parameter (maps to sensing–acting delay in the law).

- lambdaMax: number  
  Upper bound on the system’s worst-case instability (largest Lyapunov-like rate).

- seed?: number  
  Optional RNG seed for deterministic reproducibility.

These are the *only* parameters that influence the law check.

---

## 3. Core law implemented

The continuous-time Viability Law is:

- State divergence:  
  D(t) = ½‖x(t) - x*‖²

- Viability condition (necessary):  
  \dot D(t) + τ λ_max < 0  and  H(Q_t) > h_min > 0

In this engine, we implement a **discrete analogue**:

- Discrete divergence rate:  
  dD_t = D_t - D_{t-1}  (with dD_0 = 0)

- Delay-amplified instability:  
  instability = τ * lambdaMax

- Margin (how far inside the safe region we are):  
  margin_t = -(dD_t + instability)

- Viability predicate at each time step:  
  isViable_t = (margin_t > 0) && (H_t > entropyFloor)

If any step is non-viable, the system is classified as **collapsed** from that time onward.

---

## 4. Outputs (ViabilityResult)

unSimulation returns:

- entropy: number[]  
  Time series H(Q_t).

- divergence: number[]  
  Time series D_t (KL-style divergence between Q and sampled environment P).

- correction: number[]  
  Diagnostic correction-like series (may be used by the UI; not part of the core inequality).

- margin: number[]  
  Time series of margin_t = -(dD_t + τ λ_max).  
  - margin > 0 → inside viability region  
  - margin ≈ 0 → **Ghost Phase boundary**  
  - margin < 0 → outside viability region (collapse inevitable)

- iability: boolean[]  
  Per-step viability flag (law satisfied vs. violated).

- 	ime: number[]  
  Discrete time indices [0, 1, ..., T-1].

- iable: boolean  
  True if the system remained viable for the full horizon.  
  False if the law was violated at any step.

- 	imeToCollapse: number | null  
  First time index where viability failed, or null if never failed.

- ailureReason: "entropy" | "correction" | "rate" | null  
  - "entropy"  → H(Q_t) ≤ entropyFloor  
  - "rate"     → dD_t + τ λ_max ≥ 0 (core law violation)  
  - "correction" → reserved / legacy category for non-rate failures  
  - null       → no failure (system survived full horizon)

- summary: string  
  Human-readable explanation (e.g. survival or mode of collapse).

- minMargin: number  
  Minimum margin over the trajectory (how close we got to the boundary).

- meanMargin: number  
  Average margin over the trajectory (overall safety depth).

---

## 5. Ghost Phase (diagnostic)

The engine exposes **Ghost Phase** via the margin:

- System is still marked viable (iable = true)
- But margin_t becomes very small (margin_t ≈ 0)

This corresponds to:

> A system that appears stable in state, but is already outside the recovery basin: any further disturbance guarantees eventual collapse.

The UI or external tools can detect this by:

- checking minMargin against a small threshold, or
- scanning margin[] for near-zero values while iable is still true.

---

## 6. What MUST NOT change without a new version

The following are **structurally frozen** for v1.1.1:

- the definition of margin_t = -(dD_t + τ λ_max)  
- the viability predicate isViable_t = margin_t > 0 && H_t > entropyFloor  
- the meaning and presence of fields in ViabilityResult  
- the semantics of 	au, lambdaMax, and entropyFloor

Any change to these requires a **new tagged version** (e.g. v1.2.0).

This file serves as the **canonical reference** for what v1.1.1 guarantees.
