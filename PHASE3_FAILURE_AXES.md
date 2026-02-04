# Phase 3 — External Failure Axes and Governance

## 1. Scope

Phase 1–2:
- Defined and implemented the **Viability Law** as a strict **necessary-only** oracle.
- The oracle classifies **internal structural viability** only.

Phase 3:
- Adds **external failure axes** that are *not* captured by the law, but are critical for real systems:
  - Safety / compliance
  - Cost / resource usage
  - Goal alignment / usefulness
  - Operator intent / override

The Viability Engine **does not** expand. Phase 3 wraps it.

---

## 2. Internal Viability (Oracle Axis)

We call a system **internally viable** at horizon 	 if:

- Rate condition holds:
  \[
  \tilde{\dot D}(t) + \tau \lambda_{\max} < 0
  \]

- Entropy condition holds:
  \[
  \mathcal{H}(t) > \mathcal{H}_{\text{floor}}
  \]

This is exactly the Viability Theorem (necessary-only), already encoded in:

- VIABILITY_ENGINE_REFERENCE.md
- iability_theorem.md

**Oracle Output:**
- iable: true | false
- ailureReason: "correction" | "entropy"

Nothing more.

---

## 3. External Axes (Out of Scope of the Law)

We define three external axes that are **not** part of the Viability Law, but matter for deployment:

1. **Safety / Compliance (S):**
   - S = true  → system behavior is within safety / policy constraints
   - S = false → system violates safety, legal, or policy constraints

2. **Cost / Resource Burn (C):**
   - C = true  → resource usage is acceptable
   - C = false → resource usage is unacceptable (even if internally viable)

3. **Goal Alignment / Usefulness (G):**
   - G = true  → behavior is aligned with operator goals
   - G = false → behavior is misaligned or useless, even if viable

These are **operator-judged** or **policy-judged**, not derived from the law.

---

## 4. 2×2 Core Matrix

We separate **internal viability** from **external acceptability**.

Let:

- V = internal viability from oracle (true/false)
- A = external acceptability (true/false), where:
  \[
  A = S \land C \land G
  \]

Then we get four regimes:

| Case | V (Viable) | A (Acceptable) | Interpretation                      | Who decides?        |
|------|------------|----------------|-------------------------------------|---------------------|
| 1    | true       | true           | Stable and acceptable               | Oracle + Operator   |
| 2    | true       | false          | Stable but **unacceptable**         | Operator / Policy   |
| 3    | false      | true           | Structurally **non-viable**         | Oracle              |
| 4    | false      | false          | Non-viable and unacceptable         | Oracle + Operator   |

The **Viability Engine only determines V**.  
It **never** decides A.

---

## 5. Governance Contract

Any deployment MUST respect:

1. **Oracle Contract**
   - Engine output is a **diagnostic**, not a controller.
   - iable = false means **“structural non-recoverability”**, nothing else.

2. **External Veto**
   - Operators or governance bodies MAY veto a system even when iable = true if:
     - Safety is violated (S = false)
     - Cost is unacceptable (C = false)
     - Goals are not met (G = false)

3. **No Reverse Inference**
   - iable = true does **not** imply:
     - safety
     - usefulness
     - desirability
   - It only implies: *“not ruled out by Viability Law under current assumptions.”*

---

## 6. Next Implementation Step (Phase 3)

Implementation will NOT touch the core engine.

Next small, concrete steps:

1. Add an optional **metadata wrapper** around viability responses:
   - safetyFlag (set externally)
   - costFlag   (set externally)
   - goalFlag   (set externally)

2. Introduce a small doc or type for:
   - ExternalAssessment = { safety: bool; cost: bool; goal: bool; notes: string }

3. Keep the oracle pure:
   - No calls from engine into external assessment.
   - Wrapping happens only at the **API boundary** or in **client code**.

This file is the Phase 3 contract: the oracle stays minimal; external governance wraps it.
