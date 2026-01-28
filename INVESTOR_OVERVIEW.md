# Viability Law Core Engine — Investor Overview (v1.1.1)

## 1. What this is

The Viability Law Core Engine is a **mathematical safety constraint** for adaptive systems.

It answers a single hard question:

Is this system still inside a region where survival is mathematically possible,
or has it already crossed into inevitable failure?

This engine:
- does NOT predict the future
- does NOT optimize rewards
- does NOT perform learning

It enforces a **hard viability boundary**.

---

## 2. What exists today (Phase 1 — COMPLETE)

### Core engine
- File: src/shared/simulation.ts
- Version: Viability Law Core Engine — v1.1.1
- Status: Structure-locked reference implementation

At each time step, the system is viable ONLY IF:

1) Rate condition:
   -(dD + tau * lambdaMax) > 0

2) Entropy condition:
   H(Q_t) > entropyFloor

If either fails, collapse is inevitable.

---

## 3. Public API

POST https://viability-mvp.vercel.app/api/viability

Example payload:

{
  "alpha": 1.0005,
  "entropyFloor": 0.5,
  "noiseLevel": 0.01,
  "horizon": 200,
  "tau": 1,
  "lambdaMax": 0.1,
  "seed": 42
}

Response includes:
- viable
- timeToCollapse
- failureReason
- full diagnostic time series

---

## 4. Proof artifacts

- alpha_1_0005_boundary.json
- viability_alpha_1_005.json

These are deterministic, reproducible proof artifacts
demonstrating the viability boundary.

---

## 5. Why this matters

Most systems optimize performance.
Almost none enforce **mathematical survivability**.

This engine provides a **hard safety constraint**
analogous to a flight envelope or thermal limit.

---

## 6. Current state

- Core engine complete
- Public API live
- Proof artifacts committed
- Ready for productization (Phase 2)

