---
title: Range Proofs & Advanced Zero-Knowledge Proofs → Bulletproofs & Confidentiality
sidebar_position: 12
---

# Range Proofs & Advanced Zero-Knowledge Proofs → Bulletproofs & Confidentiality

In Part 11, we saw homomorphic encryption enabling computation on ciphertexts. But when dealing with encrypted or committed values, we often need to prove constraints (e.g., a balance is non-negative) without revealing the value. This leads us to **Range Proofs** and advanced ZKPs like **Bulletproofs**, which are crucial for confidential transactions, MPC correctness, and privacy coins.

## 1️⃣ Why Do We Need Range Proofs?

Imagine a confidential transaction:

-   You commit to an amount `C = g^m h^r`
-   You want to prove `m` is `0 ≤ m < 2^64`

Otherwise, someone could commit to a negative balance or an overflow value and break the system. So we need a **Zero-Knowledge Range Proof**:

-   Prove `m ∈ [0,2^k)` without revealing `m`.

---

## 2️⃣ Naive Approach

-   Commit to each bit of `m` as `Cᵢ = g^{mᵢ}h^{rᵢ}`
-   Prove each `mᵢ ∈ {0,1}` with a ZKP

But this → `O(k)` proofs, very inefficient.

---

## 3️⃣ Improved: Logarithmic Proofs

-   Use interval decomposition → fewer proofs
-   But still linear in range size.

We needed something better → **Bulletproofs**.

---

## 4️⃣ Bulletproofs (2018)

Bulletproofs are short, logarithmic-size range proofs based on:

-   Inner product argument in a prime-order group
-   No trusted setup
-   Perfect for Pedersen commitments

### How Bulletproof Works (High-Level)

-   Express range proof as inner product relation:
    -   Encode `m` as a vector `aL` of bits
    -   Encode constraint (all bits are 0/1) in another vector `aR`
    -   Prove:

```

⟨aL - 1, aR⟩ = 0

```

in zero-knowledge.

-   Compress proof size via recursive inner-product argument.

### Result

-   Proof size ~ `2log₂(n)` group elements
-   Verification time ~ `O(n)`

### Properties

-   Logarithmic size → ~1–2KB per proof
-   Works for multiple values aggregated → batch proving
-   Used in Confidential Transactions (Monero)

---

## 5️⃣ Confidential Transactions (CT)

In CT (like in Monero, Mimblewimble):

-   Transaction amounts are Pedersen commitments
-   Range proofs ensure amounts are valid
-   ZKPs ensure input sum = output sum

So you hide:

-   Amounts
-   But ensure no inflation with range proofs.

---

## 6️⃣ Equality Proofs & Shuffle Proofs

Besides range proofs, we also need:

-   **Equality proof**: Show two commitments `C₁, C₂` commit to same value.
    -   Prover knows `m, r₁, r₂` s.t. `C₁=g^m h^{r₁}, C₂=g^m h^{r₂}`
    -   ZK proof: log relation between them.
-   **Shuffle proof**: Prove you shuffled a list without revealing permutation.
    -   Used in mixnets, privacy networks.

---

## 7️⃣ Range Proofs in MPC

MPC often uses range proofs to ensure:

-   Secret-shared inputs are valid (e.g., non-negative balances)
-   No overflow occurs during computation

So Bulletproofs + MPC = privacy + correctness.

---

## 8️⃣ Mathematical Recap

-   **Pedersen Commitment**:

```

C = g^m h^r

```

-   **Range Proof statement**:
    Prove `∃ m ∈ [0,2^k), r` s.t. `C = g^m h^r`.

-   **Bulletproof compression**:
    Reduce `n` constraints → `log n` proof size via inner product.

---

## 9️⃣ Where Used Today

-   **Monero**: Hides transaction amounts
-   **Mimblewimble (Grin/Beam)**: Confidential blockchain
-   **DeFi & ZK rollups**: Privacy-preserving transactions
-   **MPC wallets**: Prove correctness of partial signatures

---

## 🔗 How It Leads Forward

Now we have advanced ZKPs (range proofs) that make privacy + correctness practically efficient. Next, we’ll move to more powerful proof systems:

-   Pairings & bilinear maps
-   zk-SNARKs (succinct proofs for entire computations)
-   Why pairings open up new crypto capabilities

---

## ✅ Next in Part 13

We’ll explore Pairing-Based Cryptography & zk-SNARKs:

-   Bilinear pairings (e.g., `e(P,Q)=e(P’,Q’)`)
-   How they enable short proofs (Groth16, BLS signatures)
-   Succinctness for large computations
