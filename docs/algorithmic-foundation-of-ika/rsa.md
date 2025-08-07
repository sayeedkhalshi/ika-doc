---
title: RSA - Algorithmic Foundation of IKA
sidebar_position: 6
---

1. Foundational Theories (11):
   Prime Numbers

2. Coprimality → Euclid

3. GCD → Euclidean Algorithm

Inverses → Extended Euclidean Algorithm

5. Modular Arithmetic

6. Euler’s Theorem (or Fermat’s Little Theorem)

7. Modular Exponentiation

8. Group Theory Concepts

9. Ring Theory (Z/nZ)

10. Chinese Remainder Theorem

11. Hardness Assumption (Difficulty of factoring)

12. Production-Ready Enhancements:

---

Used in Real Projects Purpose
✅ Probabilistic Primality Tests (e.g. Miller-Rabin) Faster prime checks
✅ Big Integer Libraries (e.g. node-forge, jsbn) Handle massive numbers
✅ CSPRNG (crypto.getRandomValues / crypto.randomBytes) For secure p, q
✅ Padding (PKCS#1, OAEP) Prevent chosen-plaintext attacks
✅ Side-Channel Resistance Avoid timing/power attacks
✅ Standards (e.g., PKCS, RFCs) Ensure interoperability
✅ Hybrid Encryption (RSA + AES)

---

```js
// rsa.js — Full Real-World RSA Implementation in JS (Educational)

/**
 * WARNING: This is a **simplified and educational** version of real-world RSA
 * DO NOT use this for production cryptography. Use audited libraries like OpenSSL.
 */

// ------------------------
// 1. Big Integer Support
// ------------------------
const forge = require("node-forge");
const crypto = require("crypto");

const BigInteger = forge.jsbn.BigInteger;

// ------------------------
// 2. CSPRNG (Crypto Secure Random)
// ------------------------
function getRandomPrime(bits = 2048) {
    return new Promise((resolve) => {
        forge.prime.generateProbablePrime(bits, (err, num) => {
            resolve(num);
        });
    });
}

// ------------------------
// 3. GCD & Extended Euclidean Algorithm
// ------------------------
function egcd(a, b) {
    if (b.equals(BigInteger.ZERO))
        return { g: a, x: BigInteger.ONE, y: BigInteger.ZERO };
    const { g, x: y, y: x } = egcd(b, a.mod(b));
    return { g, x: y, y: x.subtract(a.divide(b).multiply(y)) };
}

// ------------------------
// 4. Modular Inverse
// ------------------------
function modInverse(e, phi) {
    const { g, x } = egcd(e, phi);
    if (!g.equals(BigInteger.ONE)) throw new Error("Inverse doesn't exist");
    return x.mod(phi).add(phi).mod(phi); // ensure positive result
}

// ------------------------
// 5. Modular Exponentiation
// ------------------------
function modPow(base, exponent, modulus) {
    return base.modPow(exponent, modulus);
}

// ------------------------
// 6. Padding (PKCS#1 v1.5, OAEP is better but forge supports v1.5 easily)
// ------------------------
function padMessage(message, keySize) {
    const padded = forge.util.encodeUtf8(message);
    return forge.pkcs1.pad(padded, keySize / 8, { type: 2 });
}

function unpadMessage(paddedMsg) {
    return forge.util.decodeUtf8(forge.pkcs1.unpad(paddedMsg, 2));
}

// ------------------------
// 7. Generate RSA Keypair
// ------------------------
async function generateRSA(bits = 2048) {
    const e = new BigInteger("65537");
    let p, q, n, phi, d;

    do {
        p = await getRandomPrime(bits / 2);
        q = await getRandomPrime(bits / 2);
        n = p.multiply(q);
        phi = p.subtract(BigInteger.ONE).multiply(q.subtract(BigInteger.ONE));
    } while (!e.gcd(phi).equals(BigInteger.ONE));

    d = modInverse(e, phi);

    return { p, q, n, e, d, phi };
}

// ------------------------
// 8. Encrypt / Decrypt
// ------------------------
// function encrypt(message, e, n) {
//     const m = new BigInteger(
//         forge.util.createBuffer(padMessage(message, n.bitLength())).toHex(),
//         16
//     );
//     const c = modPow(m, e, n);
//     return c.toString(16);
// }

// function decrypt(cipherHex, d, n) {
//     const c = new BigInteger(cipherHex, 16);
//     const m = modPow(c, d, n);
//     const buffer = forge.util.createBuffer(m.toByteArray());
//     return unpadMessage(buffer.getBytes());
// }

function encrypt(message, e, n) {
    // Create a forge public key object
    const publicKey = forge.pki.setRsaPublicKey(n, e);
    // Encrypt using PKCS#1 v1.5 padding (default)
    return forge.util.bytesToHex(publicKey.encrypt(message, "RAW"));
}

function decrypt(cipherHex, d, n) {
    // Create a forge private key object
    const privateKey = forge.pki.setRsaPrivateKey(n, d, null, null, null, null);
    const encryptedBytes = forge.util.hexToBytes(cipherHex);
    return privateKey.decrypt(encryptedBytes, "RAW");
}

// ------------------------
// 9. Hybrid Encryption (AES + RSA)
// ------------------------
function hybridEncrypt(plaintext, publicKey) {
    const aesKey = crypto.randomBytes(32); // AES-256
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", aesKey, iv);
    let encrypted = cipher.update(plaintext, "utf8", "hex");
    encrypted += cipher.final("hex");

    const aesKeyHex = aesKey.toString("hex");
    const encryptedKey = encrypt(aesKeyHex, publicKey.e, publicKey.n);

    return { encrypted, encryptedKey, iv: iv.toString("hex") };
}

function hybridDecrypt({ encrypted, encryptedKey, iv }, privateKey) {
    const aesKeyHex = decrypt(encryptedKey, privateKey.d, privateKey.n);
    const aesKey = Buffer.from(aesKeyHex, "hex");
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        aesKey,
        Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

// ------------------------
// 10. Usage Example
// ------------------------
(async () => {
    const keypair = await generateRSA();

    console.log(
        "Public Key (n, e):",
        keypair.n.toString(16),
        keypair.e.toString(16)
    );
    console.log("Private Key (d):", keypair.d.toString(16));

    //!This part and padding still has errors, but the main RSA logic is correct.
    const plaintext = "Encrypt me like a pro";
    const hybrid = hybridEncrypt(plaintext, keypair);

    console.log("Hybrid Encrypted:", hybrid);

    const decrypted = hybridDecrypt(hybrid, keypair);
    console.log("Decrypted:", decrypted);
})();
```

---

Cybersecurity/MPC Deep Dive:Build on your MPC knowledge with free resources:Read “Introduction to Secure Multi-Party Computation” by Lindell (free PDF online).
Explore TryHackMe’s free cryptography labs (e.g., Diffie-Hellman, AES).
Watch YouTube talks from Crypto conferences (e.g., Real World Crypto) on MPC applications.

---

## Need Implement a small MPC protocol (e.g., Yao’s Garbled Circuits) in Rust or Python to solidify for understanding.
