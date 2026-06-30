# Arc Quest Hub

Arc Quest Hub is an onchain builder identity and quest product for Arc Testnet.

It combines daily onchain activity, wallet verification, reputation, achievements, public profiles and Passport NFT minting into one builder-focused experience.

## Core Flow

1. Connect wallet
2. Switch to Arc Testnet
3. Verify wallet locally
4. Complete daily onchain check-in
5. Earn XP and Builder Score
6. Build reputation and streaks
7. Generate Builder Passport
8. Mint Passport NFT with IPFS metadata
9. View activity, leaderboard and demo readiness

## Key Features

- Arc Testnet wallet connection
- Onchain daily check-in
- XP and Builder Score system
- Reputation Engine
- Builder Passport
- Dynamic Passport NFT metadata
- IPFS metadata through server-side Pinata integration
- Achievement Engine
- Quest Engine v2
- Public Builder Profile
- Dashboard v2
- Security Audit Panel
- Demo Flow Panel
- Launch Checklist Panel
- Transaction Explorer integration
- Error Boundary
- Toast notifications
- Global configuration layer

## Smart Contracts

Arc Quest Hub Contract:

`0x9c4A47D7Ea291905393Fef8878E2322138968bDE`

Builder Passport NFT Contract:

`0xD7c13571F3DC037B23F484005D407F59D7Ae49Be`

CheckIn Contract:

`0x4A37492539270A97c44F90DFc889EA742DF68497`

## Technical Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- wagmi
- viem
- Hardhat
- Vercel
- Pinata IPFS
- Arc Testnet

## Security Notes

Arc Quest Hub never asks for private keys, seed phrases or wallet secrets.

All wallet actions are explicit user-approved transactions.

Pinata JWT is stored server-side through Vercel Environment Variables.

The Passport NFT contract prevents duplicate minting by the same wallet.

## Presentation Summary

Arc Quest Hub turns builder activity on Arc Testnet into a visible, verifiable and shareable identity layer.

Instead of only tracking transactions, it creates a complete builder journey:

- activity
- reputation
- achievements
- leaderboard status
- Passport NFT
- public profile
- demo readiness

This makes Arc Testnet participation more engaging, measurable and presentable.