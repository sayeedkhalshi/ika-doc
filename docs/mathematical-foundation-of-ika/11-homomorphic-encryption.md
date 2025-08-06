---
title: Homomorphic Encryption → Paillier Scheme → Computing on Encrypted Data
sidebar_position: 11
id: homomorphic-encryption
slug: homomorphic-encryption
description: Learn about Homomorphic Encryption, focusing on the Paillier scheme. Understand how it enables computing on encrypted data, its applications in secure multi-party computation (MPC), and how it enhances privacy in cryptographic protocols. Explore its role in modern cryptography and secure computation.
---

# Homomorphic Encryption → Paillier Scheme → Computing on Encrypted Data

In Part 10, we saw MPC via secret sharing & garbled circuits. Now we explore another powerful tool: **Homomorphic Encryption (HE)**, which allows computing directly on ciphertexts without decrypting them. This is key for:

-   Privacy-preserving computation
-   MPC without heavy interaction
-   Threshold cryptography

## 1️⃣ What is Homomorphic Encryption?

A cryptosystem `Enc, Dec` is homomorphic if:

```

Enc(m₁) ⊗ Enc(m₂) = Enc(m₁ ⊕ m₂)

```

Where `⊗` is some operation on ciphertexts, and `⊕` is the corresponding plaintext operation.

### Types of Homomorphism

-   **Additive homomorphic** → `Enc(m₁+m₂)` computable
-   **Multiplicative homomorphic** → `Enc(m₁·m₂)` computable
-   **Fully homomorphic encryption (FHE)** → any function `f(m)` computable

For MPC, even partial homomorphism is useful.

---

## 2️⃣ Paillier Cryptosystem (Additive Homomorphism)

Paillier (1999) is a classic additively homomorphic encryption scheme:

### Keygen

-   Choose large primes `p,q`
-   `n = pq`, `λ = lcm(p-1,q-1)`
-   Pick `g ∈ ℤₙ²*`
-   Public key: `(n,g)`, secret key: `λ`

### Encryption

To encrypt `m ∈ ℤₙ`:

```

Enc(m; r) = g^m · r^n \bmod n²

```

where `r` is random.

### Decryption

```

m = \frac{L(c^λ \bmod n²)}{L(g^λ \bmod n²)} \bmod n, \quad L(u)=\frac{u-1}{n}

```

### Additive Homomorphism

```

Enc(m₁)·Enc(m₂) = g^{m₁+m₂} (r₁r₂)^n = Enc(m₁ + m₂)

```

So you can add plaintexts by multiplying ciphertexts.

---

## 3️⃣ Multiplicative Homomorphic Examples

ElGamal encryption over group `G` is multiplicatively homomorphic:

```

Enc(m₁) ⊗ Enc(m₂) = Enc(m₁·m₂)

```

---

## 4️⃣ Why Useful in MPC?

Homomorphic encryption allows offloading computation:

-   Parties encrypt inputs → aggregator computes on ciphertexts → decrypt result.

Example:

-   **Voting**: Each vote `Enc(v)`, server multiplies all votes → sum of plaintexts.
-   **Private machine learning**: Compute on encrypted data.

---

## 5️⃣ HE + Secret Sharing Hybrid

-   HE for addition
-   Beaver triples for multiplication
-   Hybrid = efficient MPC without full FHE complexity.

---

## 6️⃣ Fully Homomorphic Encryption (FHE)

Craig Gentry (2009) gave first FHE scheme:

-   Supports arbitrary circuits
-   Heavy computational cost, but improving
-   FHE allows MPC with minimal interaction.

---

## 7️⃣ Homomorphic Commitments

Similar to HE, Pedersen commitments are additively homomorphic:

```

Com(m₁)·Com(m₂)=Com(m₁+m₂)

```

This duality (commitments ↔ HE) shows same group properties drive both.

---

## 8️⃣ MPC Use Cases of HE

-   **Threshold ECDSA**: Paillier for homomorphic addition of key shares
-   **Voting**: Homomorphic tallying
-   **Private DeFi analytics**: Aggregate encrypted balances
-   DWallet-like systems often combine Paillier + MPC.

---

## 9️⃣ Mathematical Representation Recap

-   **Paillier encryption**:

```

Enc(m) = g^m r^n \mod n²

```

-   **Additive homomorphism**:

```

Enc(m₁)·Enc(m₂) = Enc(m₁+m₂)

```

-   **ElGamal multiplicative**:

```

Enc(m₁)·Enc(m₂)=Enc(m₁·m₂)

```

---

## 🔗 How It Leads Forward

Now we’ve added homomorphic encryption, which allows partial computation on ciphertexts and boosts MPC. Next, we’ll move to **Proofs of Correctness in MPC**:

-   Range proofs, equality proofs
-   Bulletproofs
-   Why these matter in secure computation & privacy coins

---

## ✅ Next in Part 12

We’ll explore Range Proofs & Advanced ZKPs:

-   How to prove “value is in valid range” without revealing it
-   Bulletproofs for confidential transactions
-   Link to MPC & ZKP composition
