# Viability Oracle — Validation Packet

This folder contains a minimal, self-contained validation set for a deterministic viability oracle.

No prior context, theory, or documentation is required.

---

## Files

### viable_request.json
Input payload sent to the oracle representing a system that should survive the full horizon.

### viable_response.json
Exact response returned by the oracle for the viable case.

Expected properties:
- viable: true
- failureReason: null
- timeToCollapse: null
- minMargin > 0

---

### nonviable_request.json
Input payload representing a system that violates viability constraints.

### nonviable_response.json
Exact response returned by the oracle for the non-viable case.

Expected properties:
- viable: false
- failureReason is defined
- timeToCollapse is defined

---

## How to Verify

Send either request file as JSON to:

POST /api/viability

Compare the returned response with the corresponding response file.

If outputs match (within numeric precision), the oracle implementation is confirmed.

---

## Notes

- The oracle is deterministic.
- No heuristics, thresholds, or learning are involved.
- All decisions follow strict necessary conditions only.

This packet is sufficient to independently validate correctness.
