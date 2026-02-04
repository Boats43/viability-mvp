# Viability Oracle — Validation Summary (v1.0)

## 1. What This Oracle Answers

This system is a **structural viability oracle**.  
Given a trajectory of:

- divergence between system and environment
- internal entropy (capacity to adapt)
- delay / latency and maximum instability rate

…it answers one specific question:

> “Is this system guaranteed to survive this horizon under these worst-case conditions?”

It returns:

- iable — 	rue or alse
- minMargin, meanMargin — how strongly it satisfies or violates the boundary
- ailureReason — correction or entropy (or 
ull if viable)
- summary — short human explanation

---

## 2. What It Does **Not** Do

The oracle is **necessary-only**:

- It does **not** guarantee optimal behavior.
- It does **not** rank systems by performance.
- It does **not** claim sufficiency or “safety” in a broad sense.
- It simply distinguishes between:
  - systems that **cannot** survive under their own structural limits, and
  - systems that **can** survive under the tested conditions.

If the law’s conditions are not met, the system is classified as **non-viable**.

---

## 3. Validation Invariants (Batch-Checked)

Across batch tests (50 randomized runs), the following were confirmed:

1. **Both outcomes appear**

   - Some runs are iable = true
   - Some runs are iable = false

   → The oracle is not biased toward “always true” or “always false”.

2. **Failure modes are consistent**

   - All non-viable runs fail with a clear ailureReason
   - In the current batch: correction was the limiting factor (correction too weak vs divergence)

   → No undefined or unexplained failure states.

3. **No false positives**

   - In all iable = true runs, minMargin > 0
   - There were **no** cases where:
     - iable = true **and**
     - minMargin ≤ 0

   → The oracle never marks a system viable if it sits *on* or *past* the failure boundary.

These checks were run and stored in:  
atch_validation_results.csv

---

## 4. Minimal Reproducible Tests

Two canonical tests are frozen under alidation/:

### 4.1. Viable Case

Files:

- alidation/viable_request.json
- alidation/viable_response.json

Properties:

- Divergence shrinks over time.
- Entropy stays well above the entropy floor.
- Correction term dominates divergence consistently.

Result (as stored):

- iable: true
- ailureReason: null
- summary: "System survived full horizon (10 steps)."
- decision: "VIABLE_AND_ACCEPTABLE" (where governance overlay is used)

### 4.2. Non-Viable Case

Files:

- alidation/nonviable_request.json
- alidation/nonviable_response.json

Properties:

- Divergence remains too large or grows.
- Correction is insufficient relative to divergence.
- Entropy may still be above floor — but rate condition fails.

Result (as stored):

- iable: false
- ailureReason: "correction"
- summary: "System could not respond to environmental divergence."

---

## 5. How to Reproduce (API Call)

### 5.1. Live Endpoint

The oracle is exposed at:

- POST https://viability-mvp.vercel.app/api/viability

Content-Type: pplication/json

### 5.2. Using Postman or curl

You can:

- Import alidation/viable_request.json and send it as the raw POST body.
- Import alidation/nonviable_request.json and send it as the raw POST body.

You should obtain responses that **match**:

- alidation/viable_response.json
- alidation/nonviable_response.json

(up to minor floating-point differences)

---

## 6. How To Interpret Results

- If iable = false: the system **cannot** survive the tested regime under its own limits.
- If iable = true: the system **can** survive the tested regime, but **no guarantee** is made about:
  - optimality
  - ethics
  - safety beyond the scope of this law
  - long-term performance outside the tested horizon

The oracle is a **structural gate**, not a full evaluation of goodness, usefulness, or alignment.

---
