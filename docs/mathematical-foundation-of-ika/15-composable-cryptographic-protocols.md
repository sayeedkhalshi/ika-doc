---
title: Composable Cryptographic Protocols → Combining MPC, ZKPs, Commitments, HE for Real Systems
sidebar_position: 15
---

# Composable Cryptographic Protocols → Combining MPC, ZKPs, Commitments, HE for Real Systems

In Part 14, we saw zk-STARKs, a scalable & transparent proof system. Now we step back and see how all the primitives we’ve learned (**MPC**, **ZKPs**, **commitments**, **HE**, **pairings**) combine into real-world cryptographic protocols used in wallets, bridges, privacy coins, and cross-chain security. This is the integration layer—where theory becomes usable architecture.

## 1️⃣ Why Composability Matters?

No single primitive solves everything.

-   **MPC**: Hides inputs
-   **Commitments**: Lock values
-   **ZKPs**: Prove constraints
-   **Homomorphic encryption**: Lets you compute on ciphertexts
-   **Pairings/STARKs**: Give succinctness & scalability

Composable cryptography stacks these tools → build complex secure protocols.

---

## 2️⃣ Example: Threshold Wallets (MPC + HE + ZK)

Take threshold ECDSA in MPC wallets (like DWallet, Fireblocks):

### Key generation

-   Private key `x` never exists in one place
-   It’s secret-shared among `n` parties

### Signing

-   Parties compute signature components using **Paillier** (additive HE)
-   ZKPs ensure no malicious party injects wrong data

### Output

-   Combine shares → valid ECDSA signature

So you combine:

-   ✅ Shamir secret sharing (MPC)
-   ✅ Paillier HE (homomorphic add)
-   ✅ ZK proofs for input validity

---

## 3️⃣ Example: Confidential Transactions (CT)

In privacy coins (Monero, Mimblewimble):

-   **Pedersen commitments** hide transaction amounts
-   **Bulletproofs** prove each amount is non-negative
-   **Range proofs** ensure no inflation
-   **Ring signatures** hide sender identity

So CT = Commitments + Range Proofs + Ring Sig.

---

## 4️⃣ Example: zk-Rollups (Ethereum Scaling)

zk-Rollups (like zkSync, StarkNet) combine:

-   Execution trace commitments
-   zk-SNARK/STARK proofs of correct execution
-   Merkle commitments for state transitions

So scaling = batch compute + ZKPs for validity.

---

## 5️⃣ Example: Cross-Chain Bridges

A secure bridge proves event on Chain A → valid on Chain B:

-   **Light client proof**:
    -   SNARK/STARK verifies block header from Chain A
-   **MPC for key management**:
    -   Relayer keys split via MPC threshold scheme
-   **ZKPs for transaction validity**:
    -   Prove a transaction matches commitment

So bridges = MPC + ZKPs + Commitments.

---

## 6️⃣ Composable Design Patterns

Many real protocols use the same building blocks:

| Primitive           | Purpose                                  |
| ------------------- | ---------------------------------------- |
| **Commitments**     | Hide values but bind to them             |
| **ZKPs**            | Prove properties of hidden values        |
| **MPC**             | Jointly compute without revealing inputs |
| **HE**              | Outsource computation on encrypted data  |
| **Pairings/STARKs** | Compress proofs for large computations   |

By stacking them, you get **privacy + correctness + scalability**.

---

## 7️⃣ Example Flow: DWallet MPC Protocol

Let’s map all components together:

-   Key shares generated via **MPC** (Shamir)
-   Signing uses **Paillier HE** → combine shares homomorphically
-   **ZKPs** ensure no malicious manipulation
-   Optional **SNARK** → compress correctness proof for auditors

So every step reuses the cryptographic layers we’ve learned.

---

## 8️⃣ Universal Composability (UC) Framework

In formal crypto:

-   A protocol is **UC-secure** if it remains secure when composed with others.
-   ZKPs, MPC protocols often proven UC-secure to guarantee safety in any context.

This ensures secure building blocks stay secure in composition.

---

## 9️⃣ Mathematical Layering Recap

-   **Commitments**:

```

C = g^m h^r

```

-   **ZKPs**: Prove knowledge/constraints on `C`
-   **MPC**: Compute on secret shares → output secret/shared
-   **HE**: Compute on ciphertexts → decrypt final
-   **Pairings/STARKs**: Compress → succinct public proof

So it’s a hierarchy of algebraic abstractions.

---

## 🔗 How It Leads Forward

Now we understand how all these primitives interlock into real-world protocols for:

-   Threshold key management
-   Privacy-preserving transactions
-   Cross-chain security
-   Rollup scalability

Next, we’ll look into **noise, randomness & hardness assumptions** that make all these secure—Discrete Log, RSA, LWE (post-quantum).

---

## ✅ Next in Part 16

We’ll explore Security Assumptions & Noise:

-   Discrete Log, RSA, Elliptic Curve hardness
-   Lattice assumptions (LWE, Ring-LWE)
-   How noise & randomness give security
