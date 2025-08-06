---
title: Chinese Remainder Theorem (CRT)
sidebar_position: 2
---

# 🧩 Chinese Remainder Theorem (CRT)

---

## ❓ What Is It?

The Chinese Remainder Theorem allows you to solve systems of simultaneous congruences with pairwise coprime moduli.

In simpler terms:  
Given integers \( n_1, n_2, \ldots, n_k \) that are pairwise coprime, and remainders \( a_1, a_2, \ldots, a_k \), find an integer \( x \) such that:

```math
x \equiv a_1 \pmod{n_1} \\
x \equiv a_2 \pmod{n_2} \\
\vdots \\
x \equiv a_k \pmod{n_k}
```

---

## 🌟 Why Is It Important?

CRT is fundamental for:

-   Modular arithmetic optimizations
-   Fast computations with large numbers via smaller moduli
-   **RSA implementations**
-   **Secret sharing**
-   **Polynomial interpolation**

---

## 🧠 Mathematical Idea

Define:

```math
N = \prod_{i=1}^k n_i
```

For each $i$, define:

```math
N_i = \frac{N}{n_i}
```

Find the modular inverse $M_i$ of $N_i$ modulo $n_i$:

```math
M_i \equiv N_i^{-1} \pmod{n_i}
```

Then the solution is:

```math
x = \sum_{i=1}^k a_i \cdot M_i \cdot N_i \pmod{N}
```

---

## 🦀 Rust Implementation

### Modular Inverse (Extended Euclidean Algorithm)

```rust
/// Compute modular inverse of a modulo m using Extended Euclidean Algorithm
fn mod_inv(a: i64, m: i64) -> Option<i64> {
    let (mut t, mut new_t) = (0, 1);
    let (mut r, mut new_r) = (m, a % m);

    while new_r != 0 {
        let quotient = r / new_r;
        t = t - quotient * new_t;
        std::mem::swap(&mut t, &mut new_t);
        r = r - quotient * new_r;
        std::mem::swap(&mut r, &mut new_r);
    }

    if r > 1 {
        return None;
    }
    if t < 0 {
        t += m;
    }
    Some(t)
}
```

### CRT for Two Moduli

```rust
/// Solve CRT for two congruences x ≡ a1 mod n1 and x ≡ a2 mod n2
pub fn crt_two(a1: i64, n1: i64, a2: i64, n2: i64) -> Option<i64> {
    let n = n1.checked_mul(n2)?;
    let n1_inv = mod_inv(n2, n1)?;
    let n2_inv = mod_inv(n1, n2)?;

    let x = (a1 * n2 * n2_inv + a2 * n1 * n1_inv) % n;

    Some((x + n) % n)
}
```

### CRT for General $k$ Congruences

```rust
pub fn crt_general(a: &[i64], n: &[i64]) -> Option<i64> {
    assert_eq!(a.len(), n.len());
    let k = a.len();

    let n_prod = n.iter().try_fold(1i64, |acc, &x| acc.checked_mul(x))?;
    let mut x = 0i64;

    for i in 0..k {
        let ni = n[i];
        let ai = a[i];
        let Ni = n_prod / ni;
        let mi = mod_inv(Ni % ni, ni)?;
        x = (x + ai * mi * Ni) % n_prod;
    }

    Some((x + n_prod) % n_prod)
}
```

---

## ✅ Tests

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mod_inv() {
        assert_eq!(mod_inv(3, 11), Some(4));
        assert_eq!(mod_inv(10, 17), Some(12));
        assert_eq!(mod_inv(14, 15), Some(14));
        assert_eq!(mod_inv(6, 9), None);
    }

    #[test]
    fn test_crt_two() {
        let x = crt_two(2, 3, 3, 5).unwrap();
        assert_eq!(x, 8); // 8 ≡ 2 mod 3, 8 ≡ 3 mod 5
    }

    #[test]
    fn test_crt_general() {
        let a = vec![2, 3, 1];
        let n = vec![3, 5, 7];
        let x = crt_general(&a, &n).unwrap();
        assert_eq!(x, 52); // 52 ≡ 2 mod 3, 52 ≡ 3 mod 5, 52 ≡ 1 mod 7
    }
}
```

---

## 📌 Explanation

-   `mod_inv` implements the **Extended Euclidean Algorithm** to find modular inverses.
-   `crt_two` solves CRT for two congruences.
-   `crt_general` handles any number of congruences assuming moduli are pairwise coprime.
-   The test suite validates correctness across edge cases.

---
