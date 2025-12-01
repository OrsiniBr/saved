"use client";

import { useAccount, useChainId } from "wagmi";
import { celo } from "wagmi/chains";
import { HeroSection } from "./components/landing/HeroSection";
import { StatsRow } from "./components/landing/StatsRow";
import { HowItWorksSection } from "./components/landing/HowItWorksSection";
import { ExperienceSection } from "./components/landing/ExperienceSection";

export default function Home() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const onSupportedChain = typeof chainId === "number" && chainId === celo.id;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <BackgroundGlow />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 py-10 lg:px-10">
        <HeroSection isConnected={isConnected} onSupportedChain={onSupportedChain} />
        <StatsRow />
        <HowItWorksSection />
        <ExperienceSection isConnected={isConnected} onSupportedChain={onSupportedChain} />
      </div>
    </main>
  );
}

function BackgroundGlow() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[40rem] -translate-x-1/2 bg-[radial-gradient(circle,_rgba(16,185,129,0.3),_transparent_60%)] blur-3xl" />
    </>
  );
}
