"use client";
import React from "react";
import { createConfig, WagmiProvider } from "wagmi";
import { http } from "viem";
import { celoAlfajores, celo } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

// Create wagmi config
const config = getDefaultConfig({
  appName: "EcoPay",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "your-project-id",
  chains: [celoAlfajores, celo],
  transports: {
    [celoAlfajores.id]: http(process.env.NEXT_PUBLIC_ALFAJORES_RPC_URL || "https://alfajores-forno.celo-testnet.org"),
    [celo.id]: http("https://forno.celo.org"),
  },
  ssr: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiProvider>
  );
}

export default Providers;
