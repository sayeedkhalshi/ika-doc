---
title: Elliptic Curves & Pairing-Friendly Groups → Geometry Meets Cryptography
sidebar_position: 18
---

# Elliptic Curves & Pairing-Friendly Groups → Geometry Meets Cryptography

In Part 17, we explored attack models & UC security. Now let’s go deeper into the mathematical structures that power modern crypto—**Elliptic Curves**, the backbone of ECDSA, EdDSA, pairings, zk-SNARKs, and threshold MPC. We’ll see why curves give strong security with small keys and how pairing-friendly curves enable advanced protocols.

## 1️⃣ What Are Elliptic Curves?

An elliptic curve (EC) over a finite field `Fₚ` is the set of points `(x,y)` satisfying:

```

y^2 = x^3 + ax + b \quad (\text{mod } p)

```

plus a special point at infinity (`𝒪`). The curve forms an **Abelian group**:

-   **Point addition**: Geometric rule (line intersects curve, reflect over x-axis)
-   **Scalar multiplication**: `kP = P + P + … + P` (k times)

So we can do group operations just like modular arithmetic.

---

## 2️⃣ Why Are ECs Useful in Crypto?

They give smaller key sizes for the same security because:

-   **Elliptic Curve Discrete Logarithm Problem (ECDLP)** is much harder than classic DLP.
-   Example:
    -   256-bit EC ≈ 3072-bit RSA security.

Thus ECC = strong security + efficiency.

---

## 3️⃣ EC Hardness Assumptions

-   **ECDLP**: Given `P` and `Q = kP`, find `k`.
-   **ECDH**: Given `P, aP, bP` → compute `abP`.
-   **EC-DDH**: Decide if `R = abP` or random.

All known attacks are exponential, no sub-exponential like for RSA.

---

## 4️⃣ Common EC Forms

-   **Weierstrass Form**:

```

y² = x³ + ax + b

```

-   Used in **secp256k1** (Bitcoin, Ethereum)

-   **Montgomery Form**:

```

By² = x³ + Ax² + x

```

-   Used in **Curve25519**

-   **Edwards Form**:

```

x² + y² = 1 + dx²y²

```

-   Used in **Ed25519** (faster, safer addition law)

Each form optimizes for speed, safety, or pairing compatibility.

---

## 5️⃣ Pairing-Friendly Curves

Some curves allow bilinear pairings `e: G₁ × G₂ → Gₜ`, crucial for zk-SNARKs & BLS signatures. Examples:

-   **BLS12-381**: Used in Ethereum 2.0 & zk-SNARKs
-   **BN254**: Old Zcash SNARKs

These curves are special:

-   Have embedding degree `k` for efficient pairings
-   Preserve prime order subgroup security

---

## 6️⃣ Group Structure on Curves

The set of EC points modulo a prime `p` forms a group of order `n`:

```

n = h·q \quad (q \text{ prime}, h \text{ cofactor})

```

We usually work in the prime-order subgroup `G ⊆ E(Fₚ)`:

-   `h` ensures no small subgroup attacks
-   `q ~ 2²⁵⁶` for 128-bit security

---

## 7️⃣ Elliptic Curves in Protocols

-   ✅ **ECDSA / EdDSA**: Digital signatures
-   ✅ **ECDH**: Key exchange
-   ✅ **Pedersen commitments**: On EC groups
-   ✅ **Schnorr proofs**: Over EC groups
-   ✅ **Pairings for zk-SNARKs**: BLS12 curves
-   ✅ **BLS signatures**: Aggregate signatures

So almost every modern crypto scheme uses ECs.

---

## 8️⃣ Pairing Construction

For pairing-friendly ECs:

-   `e(P,Q)` → a value in `Gₜ` with bilinear property:

```

e(aP, bQ) = e(P,Q)^{ab}

```

This lets you:

-   Verify complex equations with 1 pairing check
-   Build SNARKs & short proofs.

---

## 9️⃣ Scalar Fields & Prime Order

-   Scalars live in `𝔽ₙ` (mod `q`)
-   Group operations in `G₁, G₂`
-   Pairing target group `Gₜ` also has order `q`

So everything stays in a prime-order cyclic group, avoiding unwanted leaks.

---

## 🔟 EC Implementation Details

Security depends on:

-   Choosing safe curves (no small cofactors, no backdoors)
-   Constant-time arithmetic (side-channel safe)
-   Correct subgroup checks (avoid invalid curve attacks)

That’s why:

-   Bitcoin uses **secp256k1**
-   Privacy coins prefer **Ed25519**
-   zk-SNARKs use **BLS12-381**

---

## 1️⃣1️⃣ Mathematical Recap

-   **EC equation**:

```

y² = x³ + ax + b

```

over `Fₚ`

-   **Point addition law** → group structure
-   **Scalar multiplication** → crypto operations
-   **ECDLP** = hard
-   **Pairings** `e(P,Q) = Gₜ` enable zk-SNARKs

---

## 🔗 How It Leads Forward

Now we understand elliptic curves & pairing-friendly groups, the algebraic engine of modern crypto. Next, we’ll see how **Signatures & Proof Systems** evolved on these curves:

-   Schnorr → ECDSA → BLS → threshold signatures
-   How they integrate with MPC, bridges, ZKPs.

---

## ✅ Next in Part 19

We’ll explore Signature Evolution & Threshold Signatures:

-   Schnorr, ECDSA, EdDSA, BLS
-   Threshold & aggregate signatures in MPC
-   How they secure wallets & cross-chain protocols
