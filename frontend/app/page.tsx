"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";
import { celoAlfajores } from "wagmi/chains";

export default function Home() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const onAlfajores = chainId === celoAlfajores.id;

  return (
    <main className="min-h-screen p-6 sm:p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Ajo/Esusu</h1>
        <ConnectButton />
      </div>

      <section className="mt-8">
        {!isConnected ? (
          <p className="text-gray-600">Connect your wallet to get started.</p>
        ) : !onAlfajores ? (
          <p className="text-amber-600">Please switch to Celo Alfajores.</p>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-800">Welcome. You are connected on Alfajores.</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Create or join a circle</li>
              <li>Contribute cUSD each cycle</li>
              <li>Trigger payout when due</li>
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
