# AI Training Adapter — Viability Law Core Engine v1.1.1

## Purpose
This document defines how real AI training telemetry is mapped into the Viability Law Core Engine **without modifying the engine**.
This adapter performs **translation only**. No optimization, control, or recommendation logic is introduced.

---

## Target System
- Domain: AI / ML training pipelines
- Scope: Single training run (offline replay or live monitoring)
- Objective: Detect **irrecoverable training runs** earlier than existing signals

---

## Engine Inputs (Required)

### 1. Divergence D(t)
**Definition:** Divergence represents growing misalignment between learning and generalization.

**Default proxy:**
D(t) = validation_loss(t) - training_loss(t)

Alternative acceptable proxies:
- Gradient norm explosion
- Loss curvature growth
- Sudden variance in evaluation metrics

---

### 2. Divergence Rate ΔD
Computed internally by the engine:
ΔD(t) = D(t) - D(t-1)
No smoothing or prediction applied.

---

### 3. Latency τ (tau)
**Definition:** Effective delay between signal emergence and corrective action.

**Measured as:**
- Time between parameter update and observable metric change
- Or evaluation interval (in steps or seconds)

Example:
τ = evaluation_interval_steps

---

### 4. Instability Bound λ_max
**Definition:** Upper bound on the fastest observed divergence growth mode.

**Empirical estimates:**
- Maximum single-step loss increase
- Peak gradient norm change
- Worst-case loss volatility window

This value is **conservative by design**.

---

### 5. Adaptive Entropy H(Q)
**Definition:** Remaining adaptive variety in the training process.

**Acceptable proxies:**
- Prediction disagreement across checkpoints
- Effective rank of parameter updates
- Layer activation variance
- Ensemble disagreement (if available)

Entropy must be normalized consistently across time.

---

### 6. Entropy Floor h_min
Minimum viable entropy threshold.
Below this, recovery is structurally impossible.
This is set by the operator and is **not learned**.

---

## Engine Call Mapping
Adapter produces the following payload:

{
  "alpha": 1.0,
  "entropyFloor": h_min,
  "noiseLevel": 0,
  "horizon": T,
  "tau": tau,
  "lambdaMax": lambda_max,
  "seed": 42
}

Time series provided separately:
- entropy[]
- divergence[]
- margin[] (engine output)

---

## Engine Outputs Used
- viable (boolean)
- margin (scalar)
- ghostPhase (derived: viable && margin ≈ 0)
- timeToCollapse (if applicable)

---

## Explicit Non-Claims
This adapter:
- Does NOT predict success or failure
- Does NOT recommend actions
- Does NOT stop training
- Does NOT optimize parameters
- Does NOT evaluate model quality

It only evaluates **structural recoverability**.

---

## Status
Adapter spec is **frozen** for Phase 2 replay work.
Changes require documentation-only revision.

