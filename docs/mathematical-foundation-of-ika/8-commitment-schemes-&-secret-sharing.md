---
title: Commitment Schemes & Secret Sharing → Foundations for MPC & ZKPs
sidebar_position: 8
id: commitment-schemes-secret-sharing
slug: commitment-schemes-secret-sharing
---

# Commitment Schemes & Secret Sharing → Foundations for MPC & ZKPs

In Part 7, we examined how elliptic curve groups provide both efficiency and security. Now, we elevate the discussion to two essential cryptographic constructs built atop groups:

-   **Commitment schemes**: Securely lock a value without revealing it.
-   **Secret sharing**: Distribute a secret across multiple parties in such a way that only specific combinations can reconstruct it.

These two primitives form the cryptographic foundation for **multi-party computation (MPC)** and **zero-knowledge proofs (ZKPs)**—protocols critical for privacy-preserving and trustless computation.

## 1. What is a Commitment Scheme?

A commitment scheme is analogous to sealing a value inside a tamper-proof, opaque box. The scheme must satisfy two properties:

-   **Hiding**: The committed value remains secret.
-   **Binding**: Once committed, the value cannot be changed.

The scheme operates in two stages:

-   **Commit**:

```

Commit(m, r) → C

```

Given a message `m` and random blinding value `r`, produce a commitment `C`.

-   **Open**:

```

Open(C, r) → m

```

Reveal and verify the original message using `r`.

These schemes are used pervasively across cryptographic systems:

-   Zero-knowledge proof systems
-   Secure multiparty protocols
-   Blockchain consensus and privacy layers

### Pedersen Commitment

A widely adopted group-based commitment mechanism:

```math
C = g^m \cdot h^r
```

Where:

-   `m`: the message being committed
-   `r`: random blinding factor
-   `g`, `h`: independent generators of a group of prime order `q`

**Key Properties**:

-   **Perfect hiding**: The blinding factor `r` ensures `C` reveals no information about `m`.
-   **Computational binding**: Under the discrete logarithm assumption, one cannot open the same commitment to a different message.

Pedersen commitments are integral to advanced privacy-preserving systems such as Bulletproofs and Confidential Transactions.

## 2. Homomorphic Properties of Commitments

One powerful feature of Pedersen commitments is their **additive homomorphism**:

```math
C(m₁, r₁) \cdot C(m₂, r₂) = g^{m₁ + m₂} \cdot h^{r₁ + r₂} = C(m₁ + m₂, r₁ + r₂)
```

This means:

-   Commitments can be combined linearly without opening.
-   Enables secure computations on hidden values.
-   Critical for constructing both MPC protocols and ZKPs.

## 3. Shamir’s Secret Sharing (SSS)

To distribute a secret `s` among `n` participants such that any `t` can reconstruct it, define a random polynomial of degree `t - 1`:

```math
f(x) = s + a₁x + a₂x^2 + \dots + a_{t-1}x^{t-1}
```

Each participant receives a share:

```math
\text{share}_i = f(i)
```

Reconstruction requires at least `t` shares using Lagrange interpolation. With fewer than `t`, the secret remains information-theoretically hidden.

### Significance of SSS

-   Enables **threshold cryptography**, where operations depend on group consensus.
-   Powers **distributed key generation** and **MPC** protocols.
-   Operates securely even in hostile or unreliable environments.

## 4. Polynomial Interpolation (Lagrange Form)

To reconstruct the secret from `t` shares `(x₁, y₁), ..., (xₜ, yₜ)`, use:

```math
f(x) = \sum_{j=1}^{t} y_j \cdot \prod_{\substack{1 \le m \le t \\ m \ne j}} \frac{x - x_m}{x_j - x_m}
```

Evaluating at `x = 0` reveals:

```math
f(0) = s
```

This illustrates how **finite field linear algebra** enables efficient and exact recovery of secrets.

## 5. Combining Commitments with Secret Sharing

**Verifiable Secret Sharing (VSS)** strengthens traditional secret sharing by allowing participants to verify that their received shares are consistent with a committed polynomial.

Method:

-   The dealer commits to each coefficient of `f(x)` using Pedersen commitments.
-   Participants check the validity of their shares against these commitments, ensuring integrity without leaking information.

### Application

VSS forms a secure backbone for distributed computation, where no single party can corrupt the protocol without detection.

## 6. Why These Primitives Are Foundational

Both primitives support different but complementary cryptographic guarantees:

-   **Commitments** secure values against premature disclosure while enabling verifiable manipulation.
-   **Secret sharing** decentralizes trust by distributing sensitive data.

Combined, they enable:

-   **MPC**: Securely computing on secret-shared inputs.
-   **ZKPs**: Proving knowledge or correctness about committed values without revealing them.

This dual capability empowers privacy and trust in decentralized systems.

## 7. From Commitment to Secure Computation (MPC)

MPC protocols typically proceed as follows:

1. Each party secret-shares their input.
2. Perform linear operations (additions, scalar multiplications) directly on shares.
3. Handle non-linear operations (e.g., multiplication) through interaction, typically using **Beaver triples** or **preprocessing techniques**.

The homomorphic properties of commitments, when combined with secret sharing, allow computation on hidden inputs with verifiable integrity.

## 8. Mathematical Summary

To recap:

-   **Pedersen Commitment**:

    ```math
    Com(m, r) = g^m \cdot h^r
    ```

-   **Shamir’s Secret Sharing**:

    ```math
    f(x) = s + \sum_{i=1}^{t-1} a_i x^i \quad \text{with share}_j = f(j)
    ```

-   **Lagrange Interpolation**:

    ```math
    s = f(0) = \sum_{j=1}^{t} \text{share}_j \cdot \lambda_j(0)
    ```

This trifecta of equations encodes the foundational operations of modern secure computation.

## 9. What This Enables

With commitment schemes and secret sharing in place, we now possess the two core ingredients for building privacy-preserving protocols:

-   **Commitments** = secure value locks
-   **Secret sharing** = controlled access across participants

In the next section, we will integrate these into full-fledged **Zero-Knowledge Proof systems**, where one can prove statements about committed secrets without revealing them.

## 10. Preview of Part 9

We now transition to formal ZKP constructions:

-   The definition and purpose of Zero-Knowledge Proofs
-   The Schnorr protocol for proving discrete log knowledge
-   Fiat–Shamir transformation for non-interactive proofs
-   How to combine commitments and ZKPs into larger secure systems

This sets the stage for protocols that offer both correctness and confidentiality—pillars of trustless computing.

---
