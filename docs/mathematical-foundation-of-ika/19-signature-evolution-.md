---
title: Signature Evolution → From Schnorr to Threshold & Aggregate Signatures
sidebar_position: 19
---

# Signature Evolution → From Schnorr to Threshold & Aggregate Signatures

In Part 18, we explored elliptic curves & pairing-friendly groups, which are the playground for most modern cryptographic signatures. Now, let’s see how signatures evolved—from simple proofs of knowledge to **threshold**, **aggregate**, and **MPC-secure signatures**.

## 1️⃣ What Is a Digital Signature?

A signature on a message `m` is a pair `(σ)` that proves:

-   ✅ **Authenticity**: Came from the private key holder
-   ✅ **Integrity**: Message wasn’t changed
-   ✅ **Non-repudiation**: Signer can’t deny it later

Formally:

-   **Keygen**: `(sk, pk)`
-   **Sign(sk, m)** → `σ`
-   **Verify(pk, m, σ)** → true/false

---

## 2️⃣ Schnorr Signatures (the root)

Schnorr (1989) is a simple, elegant signature over a DLP group:

-   Pick random `r`, compute `R = g^r`
-   Compute challenge `e = H(m || R)`
-   Response `s = r + e·sk`
-   Signature = `(R, s)`
-   Verify: `g^s = R·pk^e`

✅ Linear, simple math
✅ Non-malleable
✅ Basis for threshold/MPC-friendly signatures

---

## 3️⃣ ECDSA

Bitcoin & Ethereum use **ECDSA (Elliptic Curve Digital Signature Algorithm)**:

-   Pick random `k`
-   Compute `R = k·G` → `r = x(R) mod n`
-   Compute `s = k⁻¹(m + r·sk) mod n`
-   Signature = `(r, s)`
-   Verify using EC equation

✅ Widely deployed
❌ More complex math → harder to do threshold securely
❌ Nonce reuse breaks private key!

---

## 4️⃣ EdDSA (Ed25519)

Modern crypto prefers **EdDSA** (Twisted Edwards curves):

-   Deterministic nonce from `H(sk, m)` → avoids ECDSA nonce leaks
-   Simpler, faster, safer

Used in:

-   Monero
-   Signal
-   SSH keys

---

## 5️⃣ BLS Signatures

**Boneh–Lynn–Shacham** uses pairings for super-short signatures:

-   `σ = sk·H(m)`
-   Verify: `e(σ, g) = e(H(m), pk)`

✅ Aggregatable: many sigs → 1 sig
✅ Used in Ethereum 2.0 consensus
❌ Requires pairing-friendly curves

---

## 6️⃣ Threshold Signatures

Threshold signature = `m` signed jointly by `n` parties, but private key never reconstructed.

-   **t-of-n scheme**: Only `t` participants needed to sign
-   Each holds secret share `skᵢ`
-   Combine partial sigs → final valid `σ`

For MPC wallets:

-   Threshold ECDSA → Fireblocks, Coinbase MPC
-   Threshold Schnorr → Simpler & faster

✅ Removes single point of failure
✅ Used in secure wallets, bridges

---

## 7️⃣ Multi-Signatures vs Aggregated

-   **Multi-signature**: Multiple parties sign one message → one aggregated sig
-   **Aggregate signature**: One signer signs multiple messages → one sig

Example: BLS multi-signatures combine:

```

σ = ∏ σᵢ, pk = ∏ pkᵢ

```

---

## 8️⃣ Signatures + MPC

Threshold signing uses MPC:

-   **Keygen** → secret-shared
-   **Signing** → MPC computes partial signature
-   **Combine** → final signature

Protocols:

-   GG18/20 → Threshold ECDSA
-   Lindell’s TSS → efficient Schnorr threshold sig

---

## 9️⃣ ZK-Friendly Signatures

For ZK systems:

-   Need signatures efficient to prove in circuits
-   EdDSA/BLS are ZK-friendly → used in zk-rollups
-   ECDSA is expensive inside ZK circuits

---

## 🔟 Usage in Real Systems

-   **Bitcoin/Ethereum** → ECDSA
-   **Monero/Zcash** → EdDSA/Schnorr
-   **Ethereum 2.0 consensus** → BLS
-   **Bridges/MPC wallets** → Threshold Schnorr/ECDSA
-   **Rollups** → ZK-friendly EdDSA/BLS

---

## 1️⃣1️⃣ Mathematical Recap

-   **Schnorr**: `g^s = R·pk^e`
-   **ECDSA**: `s = k⁻¹(m + r·sk) mod n`
-   **BLS**: `e(σ,g) = e(H(m),pk)`
-   **Threshold**: Partial sigs `σᵢ` combined via Lagrange interpolation

So all signatures are just proving knowledge of `sk` with algebraic relations.

---

## 🔗 How It Leads Forward

Now we understand signature evolution:

-   Schnorr → ECDSA → EdDSA → BLS
-   Threshold + MPC → secure wallets & bridges

Next, we’ll cover **Commitment & Encryption Schemes Together**—how commitments, HE, and signatures interact in privacy coins, MPC, and bridges.

---

## ✅ Next in Part 20

We’ll explore Commitments, Encryption & Hybrid Schemes:

-   Pedersen vs ElGamal vs Paillier
-   Hybrid encryption (KEM+DEM)
-   How commitments & encryption combine in privacy protocols
