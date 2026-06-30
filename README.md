# Arc Quest Hub

Arc Quest Hub is an onchain builder identity platform built for **Arc Testnet**.

It transforms builder activity into a portable onchain profile by combining daily quests, reputation, achievements, Passport NFTs and public builder profiles.

---

# Features

- Wallet Connection
- Arc Testnet Network Validation
- Wallet Verification
- Daily Onchain Check-In
- XP System
- Builder Score
- Reputation Engine
- Achievement Engine
- Quest Engine
- Passport NFT
- Dynamic NFT Metadata
- IPFS Metadata
- Public Builder Profiles
- Leaderboard
- Activity Timeline
- Analytics Dashboard
- Security Audit Panel
- Transaction Status
- Demo Flow
- Launch Checklist
- Toast Notifications
- Error Boundary

---

# Architecture

```
User Wallet
      │
      ▼
React + Vite
      │
      ▼
wagmi + viem
      │
      ▼
Arc Quest Hub Smart Contract
      │
      ├───────────────► CheckIn
      │
      ├───────────────► Reputation
      │
      ├───────────────► Achievements
      │
      └───────────────► Passport NFT
                              │
                              ▼
                           Pinata IPFS
```

---

# Smart Contracts

## Arc Quest Hub

```
0x9c4A47D7Ea291905393Fef8878E2322138968bDE
```

---

## Builder Passport NFT

```
0xD7c13571F3DC037B23F484005D407F59D7Ae49Be
```

---

## CheckIn

```
0x4A37492539270A97c44F90DFc889EA742DF68497
```

---

# Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- wagmi
- viem
- Hardhat
- Pinata
- Vercel
- Arc Testnet

---

# Project Structure

```
src/

components/
hooks/
lib/
providers/
data/

contracts/

api/

public/
```

---

# Installation

```bash
npm install
```

```bash
npm run dev
```

Production:

```bash
npm run build
```

---

# Environment Variables

```
PINATA_JWT=

VITE_...
```

---

# Security

Arc Quest Hub never requests:

- Private Keys
- Seed Phrase
- Recovery Phrase

All blockchain operations require explicit wallet approval.

Passport metadata is generated server-side and uploaded through Pinata.

---

# Current Status

Current Version:

```
MVP v1
```

Completed:

- Wallet
- Check-In
- Reputation
- XP
- Passport
- NFT
- Leaderboard
- Achievements
- Dashboard
- Security
- Demo Flow

---

# Roadmap

- Demo improvements
- Performance optimization
- Mobile optimization
- Additional quests
- Multi-chain support
- Builder analytics

---

# License

MIT