---
title: Modular Arithmetic & Modular Exponentiation
sidebar_position: 3
---

## 3. Modular Arithmetic & Modular Exponentiation

---

### 📌 What is it?

Modular arithmetic is the arithmetic of integers "wrapped around" a modulus `m`. In simple terms, it's math on a clock. Once you hit the modulus, you wrap around to zero again.

In cryptography, it’s indispensable—because nearly all cryptosystems work over finite fields or rings.

Modular exponentiation calculates:

```
b^e mod m
```

Efficiently—even when `e` is very large.

---

### 🚀 Why is it important?

-   🔐 Used in **RSA**, **Diffie-Hellman**, **ElGamal**, **ECC**, etc.
-   🧠 Direct computation of `b^e` then `% m` is **computationally infeasible** when `e` is huge.
-   ⚙️ Efficient algorithms allow **real-world cryptography** to function securely and fast.

---

### 🔧 Core Modular Operations

| Operation              | Formula         |
| ---------------------- | --------------- |
| Modular Addition       | `(a + b) mod m` |
| Modular Multiplication | `(a * b) mod m` |
| Modular Exponentiation | `(b^e) mod m`   |

---

### 📚 Algorithm: Right-to-Left Binary Exponentiation

Instead of brute-force powering, we use a fast method:

```text
Initialize result = 1

While exponent > 0:
    If exponent is odd:
        result = (result * base) % m
    base = (base * base) % m
    exponent = exponent >> 1  (i.e., divide by 2)

Return result
```

-   Works in `O(log e)` time.
-   Highly efficient.
-   Bitwise, iterative, and memory-light.

---

### 🦀 Rust Implementation

```rust
/// Compute (base^exponent) mod modulus using binary exponentiation.
pub fn mod_exp(mut base: u64, mut exponent: u64, modulus: u64) -> u64 {
    if modulus == 1 {
        return 0;
    }

    let mut result = 1u64;
    base = base % modulus;

    while exponent > 0 {
        if exponent & 1 == 1 {
            result = (result * base) % modulus;
        }
        base = (base * base) % modulus;
        exponent >>= 1;
    }

    result
}
```

### ✅ Test Cases

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mod_exp() {
        assert_eq!(mod_exp(2, 10, 1000), 24);  // 2^10 = 1024 % 1000 = 24
        assert_eq!(mod_exp(3, 0, 7), 1);
        assert_eq!(mod_exp(10, 1, 6), 4);
        assert_eq!(mod_exp(5, 117, 19), 1); // classic RSA test
    }
}
```

---

### 🧠 How it works

-   Uses bitwise ops (`& 1`, `>> 1`) to reduce exponent fast.
-   Applies `% modulus` **after every step** to prevent overflow.
-   Doesn't store full power `b^e`—so works for **very large** `e`.

---

### ➡️ Coming Next

**4. Modular Inverse & Extended Euclidean Algorithm**
