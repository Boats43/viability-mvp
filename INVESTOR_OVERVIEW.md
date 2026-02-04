# Viability Oracle — Overview

## What This System Does

This system is a **viability oracle** for AI and complex systems.

Given a description of how a system drifts away from its goal (divergence) and how much adaptive capacity it has (entropy), the oracle answers a single question:

> Is this system **structurally capable of surviving** under bounded delay and worst-case conditions?

It returns a **hard yes or no** — no heuristics, no probabilities.

---

## What Exists Today (MVP Scope)

- ✅ **Mathematical Core**
  - A minimal law that defines when a system is viable or non-viable.
  - Implemented as deterministic code (no learning, no tuning).

- ✅ **Engine Implementation**
  - Computes divergence, correction, and margins over time.
  - Enforces delay and an entropy floor (capacity to adapt).

- ✅ **API Endpoint**
  - POST /api/viability
  - Takes time series inputs and returns:
    - iable (true/false)
    - margin (safety margin over time)
    - ailureReason (if non-viable)
    - summary (plain-language explanation)

- ✅ **Governance Wrapper**
  - Optional external assessment:
    - safety, cost, goal, 
otes
  - Adds decision labels:
    - NON_VIABLE
    - VIABLE_BUT_BLOCKED
    - VIABLE_AND_ACCEPTABLE

- ✅ **Validation Packet**
  - Fixed request/response pairs for:
    - A clearly **viable** system
    - A clearly **non-viable** system
  - Can be replayed by any third party to confirm behavior.

---

## How It’s Used

1. **Collect telemetry** from a system or AI training run:
   - Divergence between desired vs actual behavior
   - Entropy / capacity measure
   - Delay / reaction time
   - Instability estimate (growth rate of divergence)

2. **Send a JSON request** to the oracle:
   - Either locally (http://localhost:3000/api/viability)
   - Or via the deployed endpoint (Vercel)

3. **Read the decision:**
   - If iable = false: the system is structurally unable to survive under the given conditions.
   - If iable = true: the system can, in principle, survive — then governance decides if it *should* be allowed.

---

## Positioning

This is **not a chatbot** and not a generic ML model.

It is a **structural safety filter** that:

- Never over-claims safety
- Is falsifiable (can be proven wrong with a counterexample)
- Can be independently tested using the validation packet in /validation

This is the foundation for:
- AI training evaluation
- System-level safety gates
- Governance and compliance tooling
