//* x = a mod m
// x = 2 mod 3
// x = 3 mod 5
// x = 2 mod 7

// Find X
const a1 = 2,
    a2 = 3,
    a3 = 2;
const m1 = 3,
    m2 = 5,
    m3 = 7;
console.log("m1, m2, m3: ", m1, m2, m3);
console.log("a1, a2, a3: ", a1, a2, a3);

//* Step 1
const multiplication = 3 * 5 * 7;
console.log("multiplication ", multiplication);

//* Step 2
const M1 = multiplication / m1;
const M2 = multiplication / m2;
const M3 = multiplication / m3;
console.log("M1, M2, M3", M1, M2, M3);

//* Step 3
const y1 = M1 % m1;
const y2 = M2 % m2;
const y3 = M3 % m3;
console.log("y1, y2, y3 ", y1, y2, y3);
// M1*y1 = 2 mod 3
// M2*y2 = 3 mod 5
// M2*y3 = 2 mod 7

const total = a1 * M1 * y1 + a2 * M2 * y2 + a3 * M3 * y3;
console.log("total ", total);

const x = total % multiplication;

console.log("x value: ", x);

// Let’s deeply learn the **Chinese Remainder Theorem (CRT)** from scratch. I'll break it down in an intuitive way — no skipping steps, no fluff, only clarity.

// ---

// ## 🌟 The Heart of CRT:

// Suppose you know a number's remainders when divided by several **coprime** numbers.
// CRT helps you find **that number**.

// ---

// ## 📦 Problem Setup:

// Suppose you are given:

// ```
// x ≡ a₁ mod m₁
// x ≡ a₂ mod m₂
// x ≡ a₃ mod m₃
// ...
// x ≡ aₖ mod mₖ
// ```

// Where:

// * All the `mᵢ` are **pairwise coprime** (i.e., GCD(mᵢ, mⱼ) = 1 for i ≠ j)
// * The goal is to find **x** such that all these congruences are true.

// And CRT guarantees:

// > There exists a **unique solution mod M**, where `M = m₁ * m₂ * m₃ * ... * mₖ`

// ---

// ## 🧠 Intuition:

// You’re reconstructing a number `x` based on its **remainders in smaller worlds** (moduli).
// Like saying:

// * “x leaves remainder 2 when divided by 3”
// * “x leaves remainder 3 when divided by 5”
// * “x leaves remainder 2 when divided by 7”

// You want to find the **smallest x** that fits all.

// ---

// ## 🧮 Example:

// Solve:

// ```
// x ≡ 2 mod 3
// x ≡ 3 mod 5
// x ≡ 2 mod 7
// ```

// ---

// ## Step-by-step:

// ### 1. Compute total modulus:

// ```
// M = 3 × 5 × 7 = 105
// ```

// ---

// ### 2. Compute Mᵢ = M / mᵢ for each i:

// | i | mᵢ | aᵢ | Mᵢ = M/mᵢ    |
// | - | -- | -- | ------------ |
// | 1 | 3  | 2  | 105 / 3 = 35 |
// | 2 | 5  | 3  | 105 / 5 = 21 |
// | 3 | 7  | 2  | 105 / 7 = 15 |

// ---

// ### 3. For each Mᵢ, find the modular inverse `yᵢ` such that:

// ```
// Mᵢ * yᵢ ≡ 1 mod mᵢ
// ```

// We need:

// * 35 × y₁ ≡ 1 mod 3 → y₁ = 2 (because 35×2 = 70 ≡ 1 mod 3)
// * 21 × y₂ ≡ 1 mod 5 → y₂ = 1
// * 15 × y₃ ≡ 1 mod 7 → y₃ = 1

// ---

// ### 4. Compute the answer:

// ```
// x = a₁·M₁·y₁ + a₂·M₂·y₂ + a₃·M₃·y₃
// x = 2×35×2 + 3×21×1 + 2×15×1
// x = 140 + 63 + 30 = 233
// ```

// Final answer:

// ```
// x ≡ 233 mod 105
// → x = 233 % 105 = 23
// ```

// ✅ Check:

// * 23 ≡ 2 mod 3
// * 23 ≡ 3 mod 5
// * 23 ≡ 2 mod 7

// ---

// ## 🧰 Formula (General CRT):

// If:

// ```
// x ≡ aᵢ mod mᵢ  for i = 1 to k
// ```

// Where all `mᵢ` are pairwise coprime, then:

// ```
// M = m₁·m₂·...·mₖ
// Mᵢ = M / mᵢ
// yᵢ = inverse of Mᵢ mod mᵢ

// x = Σ (aᵢ × Mᵢ × yᵢ) mod M
// ```

// ---

// ## 🔁 Real Use Cases:

// * Reconstructing big numbers from small pieces
// * RSA optimizations
// * Secret sharing (Shamir's secret)
// * Distributed computation

// ---

// Let me know if you want:

// * A visual diagram
// * A coding version (Python/Rust/Solidity/etc.)
// * A second example
// * How CRT works when moduli are **not coprime**

// Want to try your own example now, and I walk you through it?
