---
title: Secure Multi-Party Computation (MPC) → Yao’s Protocol → Secret-Sharing-Based MPC
sidebar_position: 10
id: secure-multi-party-computation-mpc
slug: secure-multi-party-computation-mpc
description: Explore Secure Multi-Party Computation (MPC) including Yao's Protocol and Secret-Sharing-Based MPC. Understand how these concepts enable secure joint computation without revealing private inputs, forming the foundation for cryptographic protocols like threshold signatures and distributed key generation.
---

# Secure Multi-Party Computation (MPC) → Yao’s Protocol → Secret-Sharing-Based MPC

In Part 9, we explored Zero-Knowledge Proofs, which let you prove correctness without revealing secrets. Now we move to **Secure Multi-Party Computation (MPC)**—where multiple parties jointly compute a function without revealing their private inputs. This is a core concept in 2PC/MPC protocols like DWallet’s, enabling collaborative cryptography (threshold signatures, private key management, etc.).

## 1️⃣ What is MPC?

`n` parties, each with input `xᵢ`, want to compute a function:

```

f(x₁, x₂, …, xₙ) = y

```

Goals:

-   **Privacy**: No one learns others’ inputs
-   **Correctness**: Output is correct
-   **Security**: No cheating

So MPC generalizes ZKP & commitments into joint computation.

---

## 2️⃣ Yao’s Millionaires Problem (1982)

Andrew Yao posed a simple 2-party problem:

-   Two millionaires want to know who is richer without revealing their wealth.

This sparked the idea of **Secure Two-Party Computation (2PC)**.

---

## 3️⃣ Yao’s Garbled Circuits (2PC)

Yao’s protocol for 2PC:

-   Represent `f(x₁,x₂)` as a Boolean circuit.
-   **Garbler** (Alice) encrypts each gate so it can only be evaluated with correct input keys.
-   **Evaluator** (Bob) obtains his input keys via **Oblivious Transfer (OT)**.
-   Bob evaluates garbled circuit → gets `f(x₁,x₂)`.

Security:

-   Bob learns only output
-   Alice learns nothing about Bob’s input

Used in:

-   Private set intersection
-   Threshold ECDSA signing (e.g., DWallet MPC)

---

## 4️⃣ Oblivious Transfer (OT)

A primitive in Yao’s protocol:

-   Sender has `m₀, m₁`
-   Receiver chooses bit `b`, learns `m_b` but nothing about `m_{1-b}`
-   Sender doesn’t learn `b`

Efficient OT → efficient 2PC.

---

## 5️⃣ n-Party MPC via Secret Sharing

For >2 parties, a better approach = secret-sharing-based MPC:

-   Each party secret shares their input (Shamir SSS).
-   Parties do linear operations on shares locally.
-   For multiplication → need **Beaver triples**.

### Beaver Triples

A precomputed triple `(a,b,c)` where `c = a·b`. To multiply `x·y` securely:

-   Parties hold `(x-a)`, `(y-b)` shares
-   Open these masked differences
-   Compute:

```

xy = c + (x−a)·b + (y−b)·a + (x−a)(y−b)

```

This allows efficient secure multiplication without revealing `x,y`.

---

## 6️⃣ Commitments + MPC

-   **Verifiable Secret Sharing (VSS)**: Ensures dealer shares correctly
-   **Commitments + ZKPs**: Ensure correctness without leaking info

So commitments + secret sharing + ZKPs = full MPC.

---

## 7️⃣ MPC Security Models

-   **Semi-honest**: Parties follow protocol but try to learn extra info
-   **Malicious**: Parties may deviate arbitrarily
-   **Covert**: Malicious but fear detection

Modern MPC ensures malicious security with:

-   ZKPs for correctness
-   Consistency checks for shares

---

## 8️⃣ How MPC Is Used in Crypto

-   **Threshold ECDSA/EdDSA**:
    -   Private key split across parties
    -   They jointly sign without reconstructing the key
-   **Distributed Key Generation (DKG)**:
    -   No single party knows full key
-   **DeFi & Wallets**:
    -   MPC-based wallets (e.g., DWallet)

---

## 9️⃣ Mathematical Representation Recap

-   **Yao 2PC**:

```

f(x₁,x₂) → GarbledCircuit(f)

```

-   **Secret Sharing MPC**:

```

[x] + [y] = [x+y] \quad (\text{linear})
[x]·[y] → requires Beaver triple

```

-   **Beaver triple**:

```

xy = c + (x−a)b + (y−b)a + (x−a)(y−b)

```

---

## 🔗 How It Leads Forward

Now we have:

-   **2PC (Yao)** for pairwise secure computation
-   **nPC (secret sharing)** for multiparty computation

Used in threshold signatures, private key management.

Next, we’ll expand MPC with **homomorphic encryption** & homomorphic commitments, which allow computing directly on encrypted data.

---

## ✅ Next in Part 11

We’ll explore Homomorphic Encryption:

-   Additive vs multiplicative homomorphisms
-   Paillier cryptosystem (additively homomorphic)
-   How homomorphisms combine with MPC
