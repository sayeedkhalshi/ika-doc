---
title: zk-STARKs → Transparent & Post-Quantum ZK Proofs
sidebar_position: 14
---

# zk-STARKs → Transparent & Post-Quantum ZK Proofs

In Part 13, we saw how pairing-based zk-SNARKs enable succinct proofs but require a trusted setup and rely on elliptic curves (not post-quantum safe). Now we move to **zk-STARKs (Scalable Transparent ARguments of Knowledge)**, which achieve:

-   Transparency (no trusted setup)
-   Post-quantum security (only hashes & finite fields)
-   Scalability for massive computations

## 1️⃣ Why zk-STARKs?

Problems with SNARKs:

-   Need trusted setup (toxic waste risk)
-   Pairing-based crypto not post-quantum
-   Complex algebra → harder to audit

STARKs solve this with:

-   Only hash functions (Merkle trees, FRI)
-   Information-theoretic soundness
-   Post-quantum safety

---

## 2️⃣ Core Ideas of STARKs

STARK = Interactive Oracle Proof (IOP) over a finite field. Key components:

-   **Arithmetization**: Represent computation as polynomial constraints.
-   **Low-Degree Testing (LDT)**: Verify polynomials are low-degree.
-   **FRI Protocol**: Fast Reed-Solomon Interactive Oracle Proof for LDT.
-   **Hash commitments**: Merkle proofs for transparency.

---

## 3️⃣ Arithmetization

Convert program/circuit → algebraic constraints:

-   **Execution trace**: Sequence of states
-   **Constraints**: Polynomials satisfied by valid trace

So verifying a computation reduces to checking:

```

P(x) = 0 \quad \forall x ∈ Domain

```

---

## 4️⃣ Low-Degree Testing

Verifier needs to check: “Is `P(x)` a low-degree polynomial?” without reading all values.

-   Uses random sampling → only need a few queries
-   Rejects with high probability if cheating.

---

## 5️⃣ FRI Protocol (Fast Reed-Solomon IOP)

FRI = proof that a function is close to low-degree. Process:

-   Commit to polynomial evaluations via Merkle tree
-   Randomly fold polynomial → halve domain each round
-   After `log(n)` steps, get tiny polynomial → easy to check

FRI → logarithmic proof size.

---

## 6️⃣ STARK Proof Flow

-   Prover computes execution trace
-   Encodes trace as polynomial `P(x)`
-   Uses Merkle + FRI to prove `P(x)` satisfies constraints
-   Verifier queries small random subset → high confidence

---

## 7️⃣ STARK Properties

-   ✅ **Transparent**: No trusted setup
-   ✅ **Post-quantum**: Uses only hashes
-   ✅ **Scalable**: Proof size ~ `O(log² n)`
-   ✅ **Fast verifier**: Sublinear time

But:

-   Proof size bigger than SNARKs (~50–200KB vs ~200B)

---

## 8️⃣ Where zk-STARKs Are Used

-   **StarkNet**: Ethereum L2 zk-rollup
-   **zkSync**: STARK variant
-   **Cairo VM**: Provable virtual machine

They allow verifiable execution of entire programs.

---

## 9️⃣ SNARKs vs STARKs

| Feature           | SNARK (Groth16) | STARK       |
| ----------------- | --------------- | ----------- |
| **Trusted Setup** | ✅ Required     | ❌ None     |
| **Proof Size**    | ~200 bytes      | ~50KB       |
| **Verification**  | Constant        | Logarithmic |
| **Crypto Base**   | Pairings        | Hashes      |
| **Post-Quantum**  | ❌ No           | ✅ Yes      |

So:

-   SNARKs = smaller proof, trusted setup
-   STARKs = transparent, bigger proof

---

## 10️⃣ Post-Quantum Security

Since STARKs rely only on:

-   Merkle trees (hash functions)
-   Low-degree polynomial tests

They resist quantum attacks unlike pairing-based SNARKs.

---

## 11️⃣ STARKs in MPC & Privacy

-   Can prove MPC results succinctly
-   Can verify correctness of large computations in public blockchain
-   Enable zk-rollups, privacy DeFi

---

## 12️⃣ Mathematical Recap

-   **FRI folding**:

```

f'(x) = \frac{f(x)+f(αx)}{2}

```

-   **STARK verification**:
    -   Commit → Merkle tree
    -   Random queries → low-degree test
    -   Hash → Fiat-Shamir to make NIZK

---

## 🔗 How It Leads Forward

Now we have transparent, scalable ZKPs (STARKs). Next, we’ll combine SNARKs, STARKs, MPC, HE, commitments into **composable cryptographic protocols**—how they’re layered in real-world systems (wallets, bridges, cross-chain MPC).

---

## ✅ Next in Part 15

We’ll explore Composable Cryptographic Protocols:

-   How SNARKs, commitments, MPC, HE combine
-   Privacy coins, threshold wallets
-   Cross-chain bridges security
