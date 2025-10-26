# 🌿 Esperenza — ReFi Wallet + Eco Marketplace + Referral Hub

**Esperenza** is a web platform built with **Next.js 14 (TypeScript)** that turns every transaction into a small act of climate action.  
It combines a **Celo-powered wallet**, an **eco-goodie marketplace**, and a **referral exchange** connecting campus ambassadors (Granters) with users (Seekers).  
Every action contributes to greener initiatives through transparent, on-chain micro-donations.

---

## ✨ Core Idea

> *Grow your wallet. Grow the planet.*

Esperenza bridges digital finance, sustainability, and community:
- 🌱 **Eco Wallet** – simple Celo wallet tied to phone number or address, where each cUSD transaction contributes a micro-donation toward verified green projects.  
- 🎁 **Marketplace** – redeem eco-points for sustainable goodies and merch.  
- 🤝 **Referral Exchange** – connect **Granters** (who share referral codes for tools like Gemini, Comet, or Perplexity) with **Seekers** (who need them).  
  - Each successful referral = +1 eco-point.  
  - At 50 points, Granters become **Closed** until they donate Celo tokens to reopen.  
  - Donations go directly to partnered NGOs via smart contract.  

---

## 🧭 Features

| Feature | Description |
|----------|-------------|
| 🔐 **Wallet Dashboard** | View cUSD balance, transactions, and donation impact. |
| 🌍 **Eco-Impact Tracker** | See trees planted, carbon offset, and personal contribution. |
| 🛍️ **Marketplace** | Redeem eco-points for goodies and sustainable products. |
| 💬 **Referral Hub** | Discover and share referral codes (Granter/Seeker system). |
| 🌱 **ReFi Loop** | Automatic smart-contract donations for verified NGOs. |

---

## 🧱 Tech Stack

**Frontend:**  
- [Next.js 14 (App Router)](https://nextjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)  
- [Framer Motion](https://www.framer.com/motion/) for animations  
- [Zustand](https://github.com/pmndrs/zustand) for state management  
- [Celo Composer](https://docs.celo.org/) / [Wagmi](https://wagmi.sh/) + [RainbowKit](https://www.rainbowkit.com/) for wallet integration  

**Optional Backend / Smart Contracts:**  
- Solidity contracts for Donation & Referral logic  
- Supabase or Prisma + PostgreSQL for off-chain storage  

---

## 📁 Frontend Folder Structure


---

## 💡 Landing Page Overview

The landing page introduces Esperenza with:
1. **Hero section** – “Turn Every Transaction Into a Tree Planted”  
2. **How It Works** – visual cards showing wallet, marketplace, referral system.  
3. **Impact Stats** – live counters for trees, carbon offset, and donations.  
4. **Marketplace Preview** – scrollable eco-goodie showcase.  
5. **Referral Flow Visualization** – Granter → Seeker → Donation loop.  
6. **Join Section** – CTA: “Create Wallet” and “Start Growing with Esperenza.”

---

## 🧩 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourusername/esperenza.git
cd esperenza/frontend
npm install
# or
yarn install
npm run dev
