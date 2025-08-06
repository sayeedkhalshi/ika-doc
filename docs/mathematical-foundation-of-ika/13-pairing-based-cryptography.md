---
title: Pairing-Based Cryptography → Bilinear Maps → zk-SNARK Foundations
sidebar_position: 13
---

# Pairing-Based Cryptography → Bilinear Maps → zk-SNARK Foundations

In Part 12, we learned how Bulletproofs make range proofs efficient without trusted setup. Now we step into the **pairing-based cryptography** world, which powers:

-   zk-SNARKs (succinct ZK proofs)
-   BLS signatures
-   Advanced MPC protocols

Pairings add a new algebraic tool that lets us build succinct proofs of large computations.

## 1️⃣ What is a Bilinear Pairing?

A bilinear map (pairing) is a function:

```

e: G₁ × G₂ → G_T

```

where `G₁, G₂, G_T` are groups of prime order `q`, with:

-   **Bilinearity**:

```

e(aP, bQ) = e(P,Q)^{ab}

```

-   **Non-degeneracy**: `e(P,Q) ≠ 1` for some `P,Q`
-   **Efficient computability**

So pairings turn exponent multiplication into exponentiation in a new group.

---

## 2️⃣ Where Do Pairings Come From?

They are constructed from elliptic curves with special properties (Weil or Tate pairing):

-   Certain elliptic curves (pairing-friendly) support efficiently computable bilinear maps.
-   Common choice: **BLS12-381** curve used in zk-SNARKs & Ethereum 2.0.

---

## 3️⃣ Why Pairings Are Powerful

Pairings let you check algebraic relations without revealing secrets. Example:

-   You want to prove `g^a = y`.
-   Normally, verifying involves big exponentiation.
-   With pairings, you can write a linear check in `G_T`:

```

e(g, h^a) = e(y, h)

```

This linearizes otherwise hard problems.

---

## 4️⃣ Applications in Cryptography

-   **BLS Signatures**:
    -   Very short, aggregate-friendly signatures
    -   Used in Ethereum 2.0 consensus
-   **Identity-Based Encryption (IBE)**:
    -   Encrypt directly to an identity string
-   **Short zk-Proofs**:
    -   zk-SNARKs like Groth16 rely on pairings to compress large proofs

---

## 5️⃣ zk-SNARKs & Pairings

A zk-SNARK proves:

-   “I know witness `w` such that a circuit `C(w,x)=1`”
-   Use **QAP (Quadratic Arithmetic Programs)** to encode circuit constraints
-   Commit to polynomials via pairing-friendly groups
-   Verification reduces to pairing checks

### Result

-   Proof size: < 200 bytes
-   Verification: constant time

### Groth16 zk-SNARK (High-Level)

-   Circuit → QAP polynomial equations
-   Prover evaluates polynomials with secret witness
-   Generates a few group elements as proof
-   Verifier checks pairing equation:

```

e(A, B) = e(C, D)

```

If holds → circuit satisfied.

---

## 6️⃣ Succinctness

Why SNARKs are “succinct”:

-   Proof size does not grow with computation size
-   Verifier time does not depend on circuit size

This is why zk-SNARKs are used for:

-   zk-Rollups (Ethereum scaling)
-   Privacy coins (Zcash)
-   Verifiable computation

---

## 7️⃣ Trusted Setup vs Transparent

-   Pairing-based SNARKs (e.g., Groth16) need a **trusted setup**
-   STARKs avoid pairings but produce larger proofs

So pairings give succinctness but require setup.

---

## 8️⃣ Pairings in MPC & Threshold Crypto

-   **Threshold BLS signatures**: Combine partial signatures using pairings
-   **MPC with pairings**: Allows efficient ZK checks over secret-shared values
-   **Verifiable Encryption/Decryption**: Prove you encrypted/decrypted correctly

---

## 9️⃣ Mathematical Representation Recap

-   **Pairing**:

```

e(aP, bQ) = e(P,Q)^{ab}

```

-   **zk-SNARK pairing check**:

```

e(proof_A, proof_B) = e(vk_α, proof_C) · e(vk_x, vk_β)

```

-   **BLS signature verification**:

```

e(sig, g) = e(H(m), pk)

```

---

## 🔗 How It Leads Forward

Now we’ve unlocked pairing-based crypto, enabling:

-   Short proofs (zk-SNARKs)
-   Short signatures (BLS)
-   Efficient ZK checks

Next, we’ll look at **zk-STARKs & Post-Quantum ZKPs**, which remove trusted setup and use hash-based proofs instead of pairings.

---

## ✅ Next in Part 14

We’ll explore zk-STARKs & Transparent Proofs:

-   STARKs vs SNARKs
-   FRI protocol & hash-based commitments
-   Post-quantum ZKPs
