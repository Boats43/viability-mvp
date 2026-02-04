# Viability Oracle — API Quickstart

## Endpoint

POST /api/viability

Live:
https://viability-mvp.vercel.app/api/viability

Local:
http://localhost:3000/api/viability

---

## Request Format (JSON)

    {
      "alpha": 1.05,
      "entropyFloor": 0.5,
      "tau": 0.1,
      "lambdaMax": 0.12,
      "horizon": 10,
      "entropy": [0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9],
      "divergence": [2.0,1.5,1.1,0.8,0.6,0.45,0.3,0.2,0.1,0.05],
      "seed": 42
    }

Optional governance overlay:

    "assessment": {
      "safety": true,
      "cost": true,
      "goal": true,
      "notes": "Optional human review"
    }

---

## Response Format

    {
      "viable": true,
      "decision": "VIABLE_AND_ACCEPTABLE",
      "margin": [...],
      "failureReason": null,
      "timeToCollapse": null,
      "summary": "System survived full horizon (10 steps).",
      "minMargin": 0.0022,
      "meanMargin": 0.0063
    }

---

## Decision Semantics

- NON_VIABLE  
  Fails mathematical viability (hard stop)

- VIABLE_BUT_BLOCKED  
  Math passes, governance veto applied

- VIABLE_AND_ACCEPTABLE  
  Passes both math and governance

---

## Important Notes

- This is a necessary-condition oracle
- A true result is conservative and trustworthy
- A false result means survival is structurally impossible under inputs

No tuning. No learning. No heuristics.
