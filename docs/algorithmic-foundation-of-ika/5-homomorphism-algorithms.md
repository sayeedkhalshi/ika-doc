---
id: homomorphism-isomorphism
title: Homomorphisms and Isomorphisms in Algebra
sidebar_label: Homomorphisms & Isomorphisms
---

## 5. Homomorphisms and Isomorphisms in Algebra

### What are they?

#### Group Homomorphism

A homomorphism between two groups $(G, ∗)$ and $(H, ⋅)$ is a function:

$$
'f: G \to H'
$$

such that for all '$a, b \in G$':

$$
'f(a * b) = f(a) \cdot f(b)'
$$

This means `f` preserves the group operation.

#### Group Isomorphism

An isomorphism is a **bijective** homomorphism. It means $G$ and $H$ are structurally the same — just different representations.

---

### Why is it important?

-   Homomorphisms help relate different algebraic structures and transfer properties.
-   In cryptography, structure-preserving maps enable transformations without losing essential properties (e.g., elliptic curve isomorphisms).
-   Isomorphisms identify groups that are “the same” algebraically.

---

### Mathematical Summary

-   **Homomorphism**:  
    '$$f(a * b) = f(a) \cdot f(b)$$'

-   **Isomorphism** = Homomorphism + Bijection

---

### 🦀 Rust Implementation

#### Traits & Example

```rust
/// Trait for Group Homomorphism between two groups
pub trait GroupHomomorphism<G: Group, H: Group> {
    fn map(&self, element: &G::Element) -> H::Element;
}
```

#### Example: Homomorphism from \$\mathbb{Z}/n\mathbb{Z}\$ to \$\mathbb{Z}/m\mathbb{Z}\$ where \$m\$ divides \$n\$

```rust
#[derive(Debug)]
pub struct ModReductionHomomorphism {
    pub n: u64,
    pub m: u64,
}
```

##### Define Cyclic Groups

```rust
impl Group for CyclicGroup {
    type Element = u64;

    fn identity(&self) -> Self::Element {
        0
    }

    fn op(&self, a: &Self::Element, b: &Self::Element) -> Self::Element {
        (a + b) % self.modulus
    }

    fn inverse(&self, a: &Self::Element) -> Self::Element {
        (self.modulus - a) % self.modulus
    }
}
```

##### Implement the Homomorphism

```rust
impl GroupHomomorphism<CyclicGroup, CyclicGroup> for ModReductionHomomorphism {
    fn map(&self, element: &u64) -> u64 {
        element % self.m
    }
}
```

##### Unit Test

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mod_reduction_homomorphism() {
        let g1 = CyclicGroup { modulus: 12 };
        let g2 = CyclicGroup { modulus: 4 };

        let hom = ModReductionHomomorphism { n: 12, m: 4 };

        let a = 7u64;
        let b = 5u64;

        let lhs = hom.map(&g1.op(&a, &b));  // map(a + b mod 12)
        let rhs = g2.op(&hom.map(&a), &hom.map(&b)); // map(a) + map(b) mod 4

        assert_eq!(lhs, rhs); // Homomorphism property holds
    }
}
```

---

### Explanation

-   Defined `GroupHomomorphism` trait to represent maps preserving group operations.
-   Implemented a simple **mod reduction homomorphism** from \$\mathbb{Z}/12\mathbb{Z}\$ to \$\mathbb{Z}/4\mathbb{Z}\$.
-   Verified homomorphism property:

$$
f(a + b) = f(a) + f(b)
$$

---

### 🔭 Next Steps

-   Study **kernel** and **image** of homomorphisms.
-   Explore **isomorphisms** and prove bijectivity in Rust.
-   Move towards **category theory basics** or **higher algebra structures**.
