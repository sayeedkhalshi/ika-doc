---
title: Security Assumptions, Noise & Randomness → Why Crypto is Hard to Break
sidebar_position: 16
---

# Security Assumptions, Noise & Randomness → Why Crypto is Hard to Break

In Part 15, we saw how MPC, ZKPs, commitments, and HE compose into real protocols. But why are they secure? It all boils down to **hardness assumptions**, **randomness**, and **noise**—the mathematical bedrock that makes cryptography practically unbreakable.

## 1️⃣ What Are Security Assumptions?

Cryptography relies on problems believed to be computationally hard:

-   Given reasonable resources (time, memory), no known algorithm can solve them efficiently.
-   Different primitives → different assumptions.

---

## 2️⃣ Classic Hardness Assumptions

### (a) Discrete Logarithm Problem (DLP)

Given `g` and `y = g^x \mod p`, find `x`.

-   No known sub-exponential algorithm for large primes or elliptic curves.
-   Used in:
-   Schnorr signatures
-   Pedersen commitments
-   ECDSA

### (b) Computational Diffie–Hellman (CDH)

Given `(g, g^a, g^b)`, compute `g^{ab}`.

-   Hard if DLP is hard.
-   Used in:
-   DH key exchange
-   Pairings

### (c) Decisional Diffie–Hellman (DDH)

Given `(g, g^a, g^b, g^c)`, decide if `c = ab` or random.

-   Stronger than CDH → security for ElGamal encryption.

### (d) RSA Hardness

Given `N = pq`, hard to factor `N` → RSA cryptosystem.

---

## 3️⃣ Elliptic Curve Hardness

Elliptic curves give same security with smaller keys:

-   **Elliptic Curve Discrete Logarithm (ECDLP)** → no sub-exponential attacks known.
-   Basis for:
-   ECDSA, EdDSA
-   Pairing-based SNARKs
-   So ECC = higher security per bit.

---

## 4️⃣ Noise in Lattice-Based Crypto

For post-quantum cryptography, we rely on **Lattice problems**:

-   **LWE (Learning With Errors)**:
    Given `A, A·s + e` (with small noise `e`), recover `s`.
-   **Ring-L WE**:
    Structured version for efficiency.
-   Noise makes solving lattice equations exponentially hard.
-   Used in:
-   FHE (fully homomorphic encryption)
-   Post-quantum KEMs
-   zk-STARKs indirectly via hash assumptions

---

## 5️⃣ Random Oracles & Fiat–Shamir

Many ZKPs need a random challenge:

-   **Interactive**: Verifier sends random `c`
-   **Non-interactive**: Replace verifier with hash function `H()` (Random Oracle Model assumption)

This randomness prevents replaying & forging proofs.

---

## 6️⃣ Entropy & Secure Randomness

-   **Entropy** = unpredictability in random numbers.
-   If randomness is weak → crypto breaks.
-   Example: bad RNG leaks private keys in ECDSA.
-   So all protocols rely on strong, unpredictable randomness.

---

## 7️⃣ Noise in MPC & HE

-   **MPC secret sharing** adds random masks to hide inputs.
-   **Paillier HE** randomness prevents ciphertext pattern leaks.
-   **FHE** requires noise to hide structure, but must manage noise growth.
-   So controlled noise = security.

---

## 8️⃣ Quantum Threats

Quantum algorithms break some assumptions:

-   **Shor’s algorithm** → breaks RSA, DLP, ECDLP.
-   **Grover’s algorithm** → halves brute-force security for symmetric crypto.

So post-quantum secure assumptions = LWE, hash-based (STARKs).

---

## 9️⃣ Hierarchy of Hardness

| Assumption                          | Used In                            |
| ----------------------------------- | ---------------------------------- |
| **DLP/CDH/DDH**                     | ECC, Schnorr, Pedersen commitments |
| **RSA Factoring**                   | RSA signatures/encryption          |
| **Pairing Bilinear Diffie–Hellman** | zk-SNARKs                          |
| **LWE / Ring-LWE**                  | FHE, PQ crypto                     |
| **Collision-resistant hashing**     | STARKs, Merkle proofs              |

Each layer builds on a different hardness assumption.

---

## 🔟 Mathematical Recap

-   **DLP**: `y = g^x \mod p` → find `x` is hard
-   **LWE**: Solve `As ≈ b (mod q)` with small noise
-   **Pairings**: Bilinear map security relies on BDH problem
-   **STARKs**: Only need collision-resistant hash

---

## 🔗 How It Leads Forward

Now we know why crypto stays secure:

-   Hard math problems (DLP, LWE)
-   Randomness & noise to mask structure
-   Hash-based proofs for transparency

Next, we’ll tie hardness assumptions → real-world **attack models**:

-   Side-channel attacks
-   Adaptive security in MPC
-   UC security proofs

---

## ✅ Next in Part 17

We’ll explore Attack Models & Adaptive Security:

-   Side-channel, chosen-ciphertext attacks
-   Active vs passive adversaries in MPC
-   How UC (Universal Composability) protects protocols
