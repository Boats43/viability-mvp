# 🧾 Viability Theorem (Necessary-Only)

## Theorem

A **necessary condition** for a system to be viable at horizon 	 is that both of the following hold:

1. **Rate Condition (Normalized Divergence):**
   \[
   \tilde{\dot D}(t) + \tau \lambda_{\max} < 0
   \]

2. **Entropy Condition:**
   \[
   \mathcal{H}(t) > \mathcal{H}_{\text{floor}}
   \]

If either condition fails, the system is classified as **non-viable**.

---

## 🧠 Ghost Phase Exclusion

Ghost Phase — defined as a bounded-but-doomed region where divergence improves but viability is lost — is **excluded by construction**.

This follows because the system applies:

- **Necessary-only logic**  
- Over a **finite horizon**  
- With **hard floor clipping** and no error margin

Thus, any horizon 	 that intersects entropy collapse or fails rate recovery is **immediately classified as non-viable**, regardless of local improvements.

---

## 💡 Implication

The absence of Ghost Phase is not empirical — it is **guaranteed** by the logic of the oracle.

This theorem now governs all subsequent evaluations.
