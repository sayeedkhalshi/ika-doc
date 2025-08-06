---
title: Zero-Knowledge Proofs (ZKPs) → Schnorr Protocol → Fiat–Shamir → Foundation for Modern Proofs
sidebar_position: 9
id: knowledge-proofs-zkps
slug: knowledge-proofs-zkps
description: Learn about Zero-Knowledge Proofs (ZKPs), Schnorr Protocol, Fiat-Shamir heuristic, and their foundational role in modern cryptographic proofs. Understand how ZKPs enable secure computation and privacy in cryptography.
---

# Zero-Knowledge Proofs (ZKPs) → Schnorr Protocol → Fiat–Shamir → Foundation for Modern Proofs

In Part 8, we explored commitments and secret sharing — ways to hide data without losing structure. Now we enter the terrain of **Zero-Knowledge Proofs (ZKPs)**, a class of protocols where you can prove a fact is true without revealing why. This is the cryptographic knife-edge: full verification, zero exposure. ZKPs are the heartbeat of privacy coins, zk-SNARKs, secure voting, and multiparty computation.

## What Is Zero-Knowledge?

A proof is zero-knowledge if it satisfies three conditions:

-   **Completeness**: If the statement is true, the honest prover can always convince the verifier.
-   **Soundness**: If the statement is false, no cheating prover can convince the verifier — except with negligible probability.
-   **Zero-Knowledge**: The verifier learns nothing beyond the fact that the statement is true.

This isn’t abstraction. It’s power.

### Classic Example

-   You know the password to a locked door.
-   You want to prove you know it — but without saying what it is.
-   A ZKP lets you do exactly that: prove knowledge, not reveal it.

## Zero-Knowledge in Cryptographic Context

ZKPs aren’t about passwords — they’re about structure.

Typical statements in cryptography:

-   I know `x` such that `y = g^x mod p` (discrete logarithm)
-   I know the message `m` hidden inside a commitment: `C = g^m · h^r`
-   I know a valid solution to an NP problem — like a satisfiable circuit

ZKPs let you prove these facts without leaking `x`, `m`, or the witness.

## Schnorr’s Protocol (Interactive Zero-Knowledge)

Schnorr's protocol is a foundational ZKP for proving knowledge of a discrete logarithm.

-   **Public**: group `G` of order `q`, generator `g`, public value `y = g^x`
-   **Secret**: value `x`

Steps:

1. Prover chooses random `r`, sends `t = g^r`
2. Verifier sends random challenge `c ∈ ℤ_q`
3. Prover replies `s = r + c·x mod q`
4. Verifier checks:

```

g^s ?= t · y^c

```

Why it holds:

-   An honest prover passes the check
-   A cheater can't fake the response — because `c` wasn’t known in advance
-   The verifier learns nothing about `x` — only that someone _knows_ it

This is zero-knowledge, operationalized.

## Fiat–Shamir Heuristic → Making Proofs Non-Interactive

Interaction can be inconvenient — or impossible. The **Fiat–Shamir heuristic** eliminates it.

Replace the verifier’s random challenge `c` with a deterministic hash of the message and commitment:

```

c = H(statement || t)

```

Now the proof becomes **non-interactive**. A standalone transcript convinces anyone, without live interaction. This is how signatures are born:

-   Schnorr + Fiat–Shamir = digital signature
-   **ECDSA**, **EdDSA** — both are descendants of this transformation

Fiat–Shamir took ZKPs from protocol theory into executable cryptography.

## From Schnorr to Commitments

Pedersen commitments let you lock a value `x` with randomness `r`:

```

C = g^x · h^r

```

Using Schnorr-style ZKPs, you can prove knowledge of the committed value without revealing either `x` or `r`.

This unlocks:

-   **Range proofs**: Prove `m` lies in a valid numeric range
-   **Equality proofs**: Prove two commitments hide the same value

Now secrets can be both hidden and audited.

## More Complex Zero-Knowledge Constructions

ZKPs scale.

-   **Sigma protocols**: Generic 3-move interactive proofs
-   **OR-proofs**: Prove knowledge of _one_ of multiple secrets, without revealing which
-   **Proof of correct decryption**: Show a ciphertext was decrypted properly
-   **Proof of shuffle**: Verify a list was re-randomized without tracing elements (used in mixnets)

All of these follow the same skeleton: commitment, challenge, response. This pattern underpins nearly every honest-proof in cryptographic systems.

## Modern ZKP Systems

For real-world performance, we need compression:

-   **Bulletproofs**: Short range proofs without a trusted setup
-   **zk-SNARKs**: Succinct non-interactive proofs, fast to verify (e.g., Groth16)
-   **zk-STARKs**: Transparent, post-quantum secure alternatives to SNARKs

These systems let you prove full smart contract execution, without exposing inputs. Entire blockchains run on these ideas.

## ZKP and MPC: A Direct Line

Multiparty computation (MPC) doesn’t work without verification.

ZKPs guarantee:

-   Inputs are valid
-   Computation was carried out correctly
-   No one tampered with secret-shared data

Commitments + ZKPs → **Verifiable MPC**

Without ZKPs, MPC is blind trust. With ZKPs, it's auditable cooperation.

## Mathematical Recap

-   **Schnorr ZKP**:

```

s = r + c·x
g^s = t · y^c

```

-   **Fiat–Shamir**:

```

c = H(statement || t)

```

-   **Pedersen Commitment ZKP**:
    Prove that there exists `m, r` such that:

```

C = g^m · h^r

```

All of this happens over finite cyclic groups — no leaks, just math.

## How This Connects Forward

Now we have:

-   **Commitments** to lock data
-   **ZKPs** to prove facts about locked data

What’s next? We put them into motion. Securely.

In Part 10, we move into **Secure Multiparty Computation (MPC)** — where multiple parties compute together, each holding a secret, but no one sees the whole.

We’ll build:

-   Garbled circuits
-   Yao’s protocol
-   Secret-sharing MPC
-   Cryptographic protocols powered by trustless cooperation

## Next in Part 10

We dive into MPC:

-   Yao’s Millionaires Problem: the origin story
-   Garbled circuits: compute without revealing inputs
-   Secret-sharing-based MPC: from 2PC to nPC
-   How commitments and ZKPs enforce correctness

This is cryptography without a central actor. Just shared computation, sealed secrets, and verified outcomes.
