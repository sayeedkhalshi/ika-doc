---
sidebar_position: 3
---

```
The history of secure multi-party computation (MPC) is a captivating journey through the evolution of cryptography, from theoretical breakthroughs to practical applications that safeguard privacy in a digital world. MPC allows multiple parties to jointly compute a function over their private inputs without revealing those inputs to each other, a concept that has transformed how we handle sensitive data. Below, I’ll trace the full story—from its intellectual origins to modern applications—without summarizing the intricate details that make this field so fascinating.

---

### 🌍 Prehistory: Cryptography Before MPC

Cryptography’s roots stretch back millennia, focused on concealing messages from external adversaries. Around 500 BCE, the Greek tyrant Histiaeus hid messages tattooed on slaves’ scalps to evade interception, an early example of secrecy in communication. By the 20th century, cryptography had evolved with tools like the Enigma machine, emphasizing secure communication against outsiders. However, these methods assumed adversaries were external to the system, not participants in the computation itself. The idea of protecting privacy among mutually distrusting parties—central to MPC—was absent until the late 20th century.

---

### 🧠 The 1970s: Mental Poker and the Spark of MPC

The conceptual foundation for MPC emerged in the late 1970s with the problem of **mental poker**: how can two players play a fair game of poker over a distance without revealing their cards or relying on a trusted third party? This required computing a function (the game’s outcome) while keeping inputs (each player’s cards) private.

-   **1979: Shamir, Rivest, and Adleman**: In their paper “Mental Poker,” Adi Shamir, Ronald Rivest, and Leonard Adleman (the RSA trio) proposed a cryptographic solution using commutative encryption. Players encrypt their cards in a way that allows shuffling and dealing without revealing individual hands. For example, if Alice and Bob each have a private key, they can encrypt and re-encrypt a deck such that neither learns the other’s cards, yet the game proceeds fairly. This was a precursor to MPC, introducing the idea of computing with encrypted data among distrusting parties.

This work highlighted a new cryptographic challenge: protecting privacy not from an external eavesdropper but from the participants themselves. It set the stage for formalizing MPC.

---

### 🔐 The 1980s: Formalizing MPC with Yao’s Breakthrough

The 1980s saw MPC formalized as a subfield of cryptography, driven by Andrew Yao’s seminal contributions.

-   **1982: Yao’s Two-Party Computation and the Millionaires’ Problem**: Andrew Yao introduced secure two-party computation (2PC) in his paper “Protocols for Secure Computations.” He posed the **Millionaires’ Problem**: two millionaires want to determine who is richer without revealing their wealth. Formally, given Alice’s wealth \( x \) and Bob’s wealth \( y \), they compute the Boolean function \( f(x, y) = 1 \) if \( x \geq y \), else \( 0 \), without disclosing \( x \) or \( y \). Yao’s solution used **garbled circuits**, a technique where a function is encoded as a circuit of encrypted gates. Each party inputs their encrypted data, evaluates the circuit, and learns only the output.

    -   **How Garbled Circuits Work**: Alice constructs a circuit where each gate’s truth table is encrypted (e.g., using a symmetric key). Bob receives the garbled circuit and encrypted inputs, evaluates it without learning intermediate values, and shares the result. Oblivious transfer ensures Bob gets only the necessary input keys without revealing Alice’s data.
    -   **Impact**: This was the first general solution for 2PC, showing any computable function could be securely evaluated.

-   **1986: Generalizing to Multi-Party Computation**: Yao’s work was extended to multiple parties by Oded Goldreich, Silvio Micali, and Avi Wigderson in their paper “How to Play Any Mental Game.” They introduced a general framework for MPC, proving that any function computable by a circuit could be securely computed by multiple parties, even if some are malicious. Their protocol used:

    -   **Secret Sharing**: Inputs are split into shares (e.g., using Shamir’s secret sharing, where a secret \( s \) is encoded as a polynomial evaluated at multiple points). Each party holds a share, and no subset below a threshold can reconstruct the secret.
    -   **Zero-Knowledge Proofs (ZKPs)**: To handle malicious parties, players prove their computations are correct without revealing inputs, using techniques from Goldwasser, Micali, and Rackoff’s 1985 ZKP framework.
    -   **GMW Paradigm**: They introduced a method to compile protocols secure against **semi-honest adversaries** (who follow the protocol but try to learn extra information) into ones secure against **malicious adversaries** (who may deviate arbitrarily). This involved adding ZKPs to verify compliance.

    -   **Example**: For a function \( f(x_1, x_2, \ldots, x_n) \), each party \( i \) shares their input \( x_i \) across all parties using secret sharing. They compute the function gate by gate, sharing intermediate results, and use ZKPs to ensure honesty. The final output is reconstructed from shares.

This work established MPC’s theoretical feasibility in the **computational model**, where security relies on adversaries being limited to polynomial-time computations. However, these protocols were computationally heavy, making them impractical for real-world use at the time.

---

### 🛠️ Late 1980s–1990s: Refining Security Models

The late 1980s and 1990s focused on refining MPC’s security models and exploring different adversarial settings.

-   **1987: Secure Channels and Honest Majority**: Goldreich, Micali, and Wigderson showed that in a model with **secure point-to-point channels** (where an adversary cannot intercept messages), MPC is possible even if up to one-third of parties are malicious, without relying on computational assumptions. This relied on **verifiable secret sharing**, ensuring shares are consistent even if some parties lie.

-   **1988: Broadcast Channels**: Adding a broadcast channel (where messages are sent to all parties simultaneously) allowed MPC to tolerate up to one-half malicious parties, as shown by David Chaum, Ivan Damgård, and Jeroen van de Graaf. This reduced the need for cryptographic assumptions by leveraging communication constraints.

-   **Share of Shares Idea**: Introduced by Damgård and others, this technique allowed parties to share shares of a secret, enhancing fault tolerance. For example, if Alice shares her input \( x \) into \( n \) shares, each party can further share their share, ensuring robustness against failures or malice.

-   **Perfectly Secure MPC**: In settings with secure channels and an honest majority, MPC protocols were developed that achieve **perfect security** (no information leakage, even to computationally unbounded adversaries), as opposed to computational security (secure against polynomial-time adversaries).

These advancements clarified MPC’s limits and possibilities, but protocols remained inefficient due to high communication and computation costs.

---

### 🌐 2000s: Practical MPC Emerges

The 2000s marked a shift from theoretical MPC to practical applications, driven by advances in computing power and protocol efficiency.

-   **2004: Fairplay System**: Dahlia Malkhi, Noam Nisan, Benny Pinkas, and Yaron Sella introduced Fairplay, a practical 2PC system for garbled circuits. It allowed two parties to compute functions like auctions or data matching securely. For example, two companies could compute the intersection of customer lists without revealing the lists themselves. Fairplay was a proof-of-concept, showing MPC could move beyond theory.

-   **2008: Danish Sugar Beet Auction**: A landmark real-world application occurred in January 2008 in Denmark, where MPC was used for a double auction of sugar beet contracts. Farmers and buyers submitted bids privately, and the MPC protocol computed the market-clearing price without revealing individual bids. This demonstrated MPC’s ability to handle sensitive economic data, with no trusted third party. The protocol, developed by researchers like Peter Bogetoft and Ivan Damgård, used secret sharing and was secure against semi-honest adversaries.

-   **Efficiency Improvements**: Researchers began optimizing garbled circuits and secret sharing. For example, **oblivious transfer optimizations** reduced communication overhead, and **homomorphic encryption** allowed computations on encrypted data, complementing MPC.

---

### 🚀 2010s: MPC Goes Mainstream

The 2010s saw MPC become a practical tool, driven by blockchain, digital assets, and privacy demands. Key developments included:

-   **Threshold Signature Schemes (TSS)**: MPC was adapted to distribute cryptographic operations, like signing transactions, across multiple parties. Instead of a single private key, a key is split into shares, and a threshold (e.g., \( t \) out of \( n \) parties) is needed to sign. This eliminated single points of failure in cryptocurrency wallets.

    -   **Example**: In a 3-of-5 TSS, five parties hold key shares, and any three can collaborate to sign a Bitcoin transaction using an MPC protocol, without reconstructing the full key.

-   **Applications in Blockchain**:

    -   **Zcash and Privacy Coins**: MPC was used to initialize parameters for zk-SNARKs (a ZKP variant) in Zcash’s “trusted setup” ceremonies, ensuring privacy for transaction data.
    -   **Monero**: Adopted MPC-inspired techniques for confidential transactions, hiding amounts while proving validity.
    -   **Qredo (2021)**: Combined MPC with a Layer-2 blockchain for secure, instant digital asset transfers, using TSS to distribute signing.

-   **Real-World Use Cases**:

    -   **Estonia (2015)**: MPC detected tax fraud by analyzing encrypted tax data across agencies without revealing individual records.
    -   **Gender Pay Gap Analysis**: Companies used MPC to compute wage statistics privately, protecting employee data.
    -   **Satellite Collision Prevention**: Space agencies shared encrypted orbital data to compute collision risks without disclosing satellite positions.

-   **Protocol Optimizations**:

    -   **SPDZ (2012)**: Pronounced “speeds,” this protocol by Damgård, Pastro, Smart, and Zakarias improved efficiency for arithmetic circuits, used in machine learning and financial applications.
    -   **ABY Framework (2015)**: Combined arithmetic, Boolean, and Yao’s circuits for hybrid protocols, balancing efficiency and security.
    -   **Oblivious RAM and Secure Databases**: MPC was extended to secure database queries, allowing private information retrieval (e.g., querying a database without revealing the query).

-   **Universal Composability**: Yehuda Lindell and others developed frameworks ensuring MPC protocols remain secure when composed with other protocols, critical for real-world systems like blockchains.

---

### 🌟 2020s: MPC in the Digital Age

Today, MPC is a cornerstone of privacy-preserving technologies, with applications in finance, healthcare, and beyond. Key trends include:

-   **Scalability**: Protocols like SPDZ2k and MPC for machine learning (e.g., secure federated learning) allow computations on large datasets. For example, hospitals can train AI models on encrypted patient data without sharing raw data.

-   **Post-Quantum MPC**: With quantum computing looming, researchers are developing MPC protocols resistant to quantum attacks, using lattice-based cryptography or hash-based signatures.

-   **Blockchain and DeFi**: MPC underpins decentralized finance (DeFi) platforms, enabling private smart contracts, cross-chain bridges, and secure custody. For instance, Fireblocks uses MPC for institutional crypto custody, distributing key shares across nodes for secure transfers.

-   **Authentication**: MPC enhances authentication by splitting keys across devices, reducing risks compared to public-key cryptography. For example, HYPR’s MPC-based authentication splits keys to prevent interception.

---

### 🧩 The Evolution of MPC: Key Milestones

-   **1979**: Mental poker introduces the idea of computing with private inputs.
-   **1982**: Yao’s garbled circuits solve 2PC, formalizing MPC.
-   **1986**: Goldreich, Micali, and Wigderson generalize to multi-party settings with the GMW paradigm.
-   **1987–1988**: Secure channels and broadcast models tolerate more malicious parties.
-   **2004**: Fairplay demonstrates practical 2PC.
-   **2008**: Danish Sugar Beet Auction proves MPC’s real-world viability.
-   **2010s**: TSS, blockchain applications, and optimizations (SPDZ, ABY) make MPC practical.
-   **2020s**: MPC supports DeFi, machine learning, and post-quantum security.

---

### 🔗 Why MPC Matters

MPC transformed cryptography from concealing messages to enabling collaborative computation without trust. It builds on number theory (e.g., modular arithmetic from the Chinese Remainder Theorem), zero-knowledge proofs, and secret sharing, creating a “game” where players compute jointly while guarding their secrets. From securing crypto wallets to protecting sensitive data in auctions or healthcare, MPC’s impact is profound.

If you’d like a deeper dive—say, a worked example of Yao’s garbled circuits, a TSS in action, or how MPC integrates with ZKPs like Schnorr or Bulletproofs—let me know![](https://en.wikipedia.org/wiki/Secure_multi-party_computation)[](https://www.qredo.com/blog/what-is-multi-party-computation-mpc)[](https://theorydish.blog/2021/05/26/few-lessons-from-the-history-of-multiparty-computation/)
```
