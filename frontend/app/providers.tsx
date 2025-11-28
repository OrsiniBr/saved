"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig, http } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "@wagmi/connectors";
import { walletConnect } from "@wagmi/connectors";
import { coinbaseWallet } from "@wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "demo";

// Explicit connector list without Base smart account
const config = createConfig({
  chains: [celoAlfajores, celo],
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({ projectId, showQrModal: true }),
    coinbaseWallet({ appName: "Ajo/Esusu" }),
  ],
  transports: {
    [celoAlfajores.id]: http(),
    [celo.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
