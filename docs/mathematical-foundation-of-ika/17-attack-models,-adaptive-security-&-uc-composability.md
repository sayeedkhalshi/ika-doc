---
title: Attack Models, Adaptive Security & UC-Composability
sidebar_position: 17
---

# Attack Models, Adaptive Security & UC-Composability

In Part 16, we saw the hardness assumptions & randomness that protect cryptography. But theory isn’t enough—real systems face attack models that go beyond pure math. Here we’ll learn how protocols defend against real-world adversaries:

-   Side-channel attacks
-   Malicious vs semi-honest behavior
-   Adaptive corruption in MPC
-   UC (Universal Composability) security

## 1️⃣ Adversary Models in Cryptography

When designing protocols, we classify adversaries by capabilities:

-   **Passive (honest-but-curious)**:
    -   Follows protocol, but tries to learn extra info.
    -   Easier to secure against.
-   **Active (malicious)**:
    -   Deviates arbitrarily to break security.
    -   Requires stronger proofs (ZKP, VSS).
-   **Covert adversary**:
    -   Will cheat only if won’t get caught.

So MPC protocols differ by security model.

---

## 2️⃣ Side-Channel Attacks

Even if math is solid, physical leakage can break security:

-   **Timing attacks**: Measure how long operations take.
-   **Power analysis**: Measure power consumption patterns.
-   **EM leakage**: Infer keys from electromagnetic emissions.
-   **Cache attacks**: Observe CPU cache behavior.

### Defenses

-   Constant-time implementations
-   Masking & blinding techniques
-   Secure hardware enclaves (TEE)

---

## 3️⃣ Chosen-Ciphertext Attacks (CCA)

Some adversaries can query decryption oracle with chosen ciphertexts:

-   **CCA1 (lunchtime attack)**: Query before seeing challenge
-   **CCA2 (adaptive)**: Query anytime

Modern encryption must be **IND-CCA2 secure** (e.g., using hybrid encryption, MACs).

---

## 4️⃣ Adaptive Corruption in MPC

In long-lived MPC:

-   Adversary can corrupt parties adaptively over time.
-   Security requires **proactive secret sharing** → refresh shares periodically.
-   Without this, a slow adversary could learn all shares eventually.

---

## 5️⃣ Robust MPC Against Malicious Adversaries

For malicious MPC, need extra mechanisms:

-   **Verifiable Secret Sharing (VSS)**: Ensure dealer gave correct shares.
-   **Zero-Knowledge Proofs** of correct behavior: Detect cheating.
-   **Consistency checks**: Prevent malicious manipulation.

Protocols like **SPDZ** achieve malicious security using:

-   MACs over secret shares
-   HE for preprocessing

---

## 6️⃣ Universal Composability (UC) Framework

A protocol `Π` is **UC-secure** if:

-   It behaves the same whether run standalone or inside any larger system.
-   Achieved by comparing with an **ideal functionality** `F`.

### Why UC?

-   Real-world systems combine multiple protocols (MPC + ZKP + commitments).
-   UC ensures no unexpected vulnerabilities appear when composed.

---

## 7️⃣ Real-World Examples of Attacks

-   **ECDSA nonce reuse**: Leaked private keys (Sony PS3 case).
-   **Cache-timing attacks** on RSA/ECDSA in browsers.
-   **Rowhammer + DRAM fault attacks** on MPC servers.
-   **Fake trusted setups** for SNARKs → generate toxic waste & forge proofs.

So implementations matter as much as math.

---

## 8️⃣ Security in Cross-Chain Bridges

Bridges are complex → must defend against:

-   **Replay attacks**: Same proof reused
-   **Fork attacks**: Chain reorg invalidates proof
-   **Key compromise**: MPC threshold helps here

So bridges combine:

-   ZKP for validity
-   MPC for key management
-   Light client verification for chain state

---

## 9️⃣ Mathematical & Security Layer Recap

-   **Side-channel safe**: Constant-time crypto
-   **CCA-safe**: IND-CCA2 encryption (like hybrid KEM + MAC)
-   **Adaptive MPC**: Proactive secret sharing
-   **UC**: Ensures protocols remain secure when composed

So beyond hardness assumptions, protocol security = model + implementation resilience.

---

## 🔗 How It Leads Forward

Now we know attack models & defenses:

-   Side-channels, adaptive corruption, malicious behavior
-   UC framework for composition

Next, we’ll move to **Elliptic Curves & Advanced Group Math**—how special curve structures enable pairing-friendly crypto & efficient MPC.

---

## ✅ Next in Part 18

We’ll explore Elliptic Curves & Pairing-Friendly Groups:

-   Curve types (Weierstrass, Edwards, Montgomery)
-   Pairing-friendly BLS12-381 curves
-   Scalar fields, prime order groups
