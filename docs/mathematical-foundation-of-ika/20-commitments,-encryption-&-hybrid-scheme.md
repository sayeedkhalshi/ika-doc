---
title: Commitments, Encryption & Hybrid Schemes → Foundations for Privacy & MPC
sidebar_position: 20
---

# Commitments, Encryption & Hybrid Schemes → Foundations for Privacy & MPC

In Part 19, we covered signature evolution and threshold signing. Now, as the grand finale, we dive into how **commitments**, **encryption schemes**, and **hybrid constructions** interplay to enable privacy, MPC, and cross-chain protocols.

## 1️⃣ Commitment Schemes

A commitment lets you bind to a secret value without revealing it, with two properties:

-   **Hiding**: The commitment hides the value (like encryption).
-   **Binding**: You cannot change the committed value later.

### Pedersen Commitment:

```

C = g^m h^r

```

-   `m` = message
-   `r` = random blinding factor
-   `g, h` = generators of a prime order group

### Properties:

-   **Perfect hiding**: Due to randomness `r`
-   **Computational binding**: Hard to find collisions

Used in range proofs, MPC, and confidential transactions.

---

## 2️⃣ Encryption Schemes

-   **ElGamal encryption** (based on DLP) is probabilistic and homomorphic for multiplication.
-   **Paillier encryption** is additively homomorphic over integers modulo `n^2`.

Homomorphic properties enable computations on encrypted data, vital for MPC and privacy.

---

## 3️⃣ Homomorphic Encryption (HE)

Allows performing algebraic operations directly on ciphertexts.

### Paillier:

```

Enc(m_1) \times Enc(m_2) = Enc(m_1 + m_2)

```

Enables secure MPC protocols where parties operate on encrypted shares without decrypting.

---

## 4️⃣ Hybrid Encryption

Combines two schemes for efficiency and security:

-   **Key Encapsulation Mechanism (KEM)**: Securely shares a symmetric key.
-   **Data Encapsulation Mechanism (DEM)**: Encrypts bulk data symmetrically.

KEM + DEM = hybrid encryption used widely (e.g., TLS).

---

## 5️⃣ Commitments + Encryption in Protocols

-   **Commitments** bind secret inputs in MPC.
-   **Encryption** hides data in transit.
-   **ZK proofs** verify committed/encrypted values without revealing them.

### Example: Confidential Transactions

-   Commit amounts via Pedersen commitments
-   Prove validity via Bulletproof range proofs
-   Encrypt transaction data using ElGamal or Paillier

---

## 6️⃣ Applications in MPC & Bridges

-   **MPC protocols** use commitments to ensure inputs aren’t changed mid-computation.
-   **Paillier** used in threshold signing (Fireblocks, DWallet) for additive homomorphic operations.
-   **Bridges** combine commitments, MPC, and ZKPs to prove cross-chain validity.

---

## 7️⃣ Mathematical Summary

-   **Commitment**:

```

C = g^m h^r

```

-   **Paillier encryption**:

```

Enc(m) = g^m r^n \mod n^2

```

-   **Homomorphic**:

```

Enc(m_1) \cdot Enc(m_2) = Enc(m_1 + m_2)

```

-   **Hybrid encryption**:

```

Enc_{hybrid}(M) = Enc_{KEM}(k) || Enc_{DEM}(M, k)

```

---

## 8️⃣ Final Thoughts

These cryptographic building blocks—**commitments**, **encryption**, **ZKPs**, **MPC**, **signatures**—form the foundation of secure, private, and scalable blockchain and cryptographic systems. You now have a comprehensive map from the roots of number theory through to modern cryptographic engineering, especially as applied in 2PC MPC, wallets, ZK proofs, and cross-chain protocols.

---

## 🔗 How It Leads Forward

If you want to dive deeper, consider exploring:

-   Detailed Rust implementations of 2PC MPC primitives
-   Mathematical proofs for a chosen protocol
-   Practical system design for MPC wallets or bridges
