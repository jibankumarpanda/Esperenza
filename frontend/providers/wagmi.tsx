"use client";
import React from "react";
import { createConfig, WagmiProvider } from "wagmi";
import { http } from "viem";
import { celoAlfajores, celo } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

// Create wagmi config
const config = getDefaultConfig({
  appName: "EcoPay",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "a7f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5", // Fallback ID
  chains: [celoAlfajores, celo],
  transports: {
    [celoAlfajores.id]: http(process.env.NEXT_PUBLIC_ALFAJORES_RPC_URL || "https://alfajores-forno.celo-testnet.org"),
    [celo.id]: http(process.env.NEXT_PUBLIC_CELO_RPC_URL || "https://forno.celo.org"),
  },
  ssr: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider
        modalSize="compact"
        showRecentTransactions={true}
        appInfo={{
          appName: "EcoPay",
          learnMoreUrl: "https://docs.celo.org/",
        }}
        initialChain={celoAlfajores}
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default Providers;
