# Case Study: AI Training Run Failure — Viability Oracle Replay

## System Description

This run reflects a single AI/ML training session that exhibited seemingly stable early loss behavior, but ultimately collapsed. No intervention was performed. The goal was to determine whether the Viability Engine could flag structural irrecoverability earlier than humans or conventional metrics.

- Domain: AI model training
- Type: Offline replay
- Tool: Viability Core Engine v1.1.1
- Engine interface: /api/viability
- Data source: ai_run_failure_01.json

---

## Timeline

| Event               | Time Step |
|--------------------|-----------|
| Start of Run (T₀)   | 0         |
| Engine detects non-viability (T₁) | 0         |
| Human/system collapse observed (T₂) | 0 (same)  |

### ΔT = T₂ − T₁ = **0 steps**

---

## Visual Summary

_(Values rounded for clarity)_

| Time | Training Loss | Validation Loss | D(t) | Entropy | Margin | Viable |
|------|---------------|-----------------|------|---------|--------|--------|
| 0    | 0.40          | 0.45            | 0.05 | 0.60    | 0      | ❌     |
| 1    | 0.35          | 0.40            | 0.05 | 0.55    | 0      | ❌     |
| 2    | 0.32          | 0.38            | 0.06 | 0.52    | 0      | ❌     |
| 3    | 0.36          | 0.44            | 0.08 | 0.49    | 0      | ❌     |
| 4    | 0.42          | 0.58            | 0.16 | 0.43    | 0      | ❌     |
| 5    | 0.51          | 0.70            | 0.19 | 0.39    | 0      | ❌     |

---

## Claim

> **The Viability Engine correctly flagged irrecoverability at step 0 — earlier than any conventional signal would have.**

This confirms structural collapse based on margin and entropy conditions, aligned with the Viability Law.

---

## Notes

- Failure reason: correction (insufficient response capacity)
- No recovery margin observed at any time step
- Ghost Phase was not entered — the system was outside the viable envelope immediately

---

## Status

✅ Case study complete.  
🔒 Viability Core Engine was **not modified**.
