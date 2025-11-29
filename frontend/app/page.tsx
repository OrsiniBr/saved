"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  ArrowRight,
  Clock8,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wallet2,
  Zap,
} from "lucide-react";
import { useAccount, useChainId } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { useSelfId } from "./hooks/useSelfId";

const stats = [
  { label: "Trust attestations", value: "1,240+", detail: "via Self Protocol" },
  { label: "Average payout", value: "2,150 cUSD", detail: "per completed circle" },
  { label: "Completion rate", value: "95%", detail: "last 90 days" },
];

const howItWorks = [
  {
    title: "Verify",
    description: "Creators vouch for members with Self attestations to unlock trusted entry.",
    icon: ShieldCheck,
  },
  {
    title: "Contribute",
    description: "Members set a cadence, lock in cUSD contributions, and see live status cues.",
    icon: Wallet2,
  },
  {
    title: "Rotate payouts",
    description: "Trigger payouts on-chain with transparent history and automated reputation.",
    icon: Clock8,
  },
];

type CirclePreview = {
  name: string;
  members: number;
  contribution: string;
  status: string;
  progress: number;
  nextPayout: string;
  badge: string;
};

const circles: CirclePreview[] = [
  {
    name: "Market Queens",
    members: 8,
    contribution: "75 cUSD / wk",
    status: "Contribution window",
    progress: 72,
    nextPayout: "Ama • Cycle 4",
    badge: "Verified",
  },
  {
    name: "Diaspora Connect",
    members: 12,
    contribution: "120 cUSD / mo",
    status: "Payout queued",
    progress: 100,
    nextPayout: "Kweku • Cycle 8",
    badge: "Global",
  },
  {
    name: "Campus Builders",
    members: 6,
    contribution: "40 cUSD / wk",
    status: "Grace period",
    progress: 54,
    nextPayout: "Ada • Cycle 3",
    badge: "New",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function Home() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const onSupportedChain =
    typeof chainId === "number" && (chainId === celoAlfajores.id || chainId === celo.id);

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

function HeroSection({
  isConnected,
  onSupportedChain,
}: {
  isConnected: boolean;
  onSupportedChain: boolean;
}) {
  return (
    <motion.header className="flex flex-col gap-10" {...fadeUp}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">Self-enabled circles</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl">
            Trust-first group savings for every community on Celo
          </h1>
        </div>
        <ConnectButton />
      </div>

      <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <p className="text-lg text-slate-200">
            Create verifiable Ajo/Esusu circles, rotate payouts on-chain, and grow shareable
            reputation—all in one elegant flow built for low fees and high trust.
          </p>
          <ul className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            {["SelfID gated membership", "cUSD smart contracts", "Transparent payouts", "Mobile-perfect UX"].map(
              (item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2"
                >
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                  {item}
                </li>
              )
            )}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <PrimaryButton label={isConnected ? "Create a circle" : "Connect to begin"} />
            <ChainStatus isConnected={isConnected} onSupportedChain={onSupportedChain} />
          </div>
        </div>

        <motion.div
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-transparent p-6"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <p className="text-sm uppercase tracking-wider text-cyan-200">Live circle signal</p>
          <div className="mt-4 flex flex-col gap-4">
            {circles.slice(0, 2).map((circle) => (
              <CircleCard key={circle.name} circle={circle} minimal />
            ))}
            <motion.div
              className="rounded-xl border border-white/10 p-4"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-sm text-slate-300">Reputation boost in progress…</p>
              <div className="mt-2 flex items-center gap-2 text-cyan-200">
                <Zap className="h-4 w-4" />
                +3 score after cycle completion
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}

function StatsRow() {
  return (
    <motion.section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-3" {...fadeUp}>
      {stats.map((item) => (
        <div key={item.label} className="rounded-xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
          <p className="text-sm text-slate-400">{item.detail}</p>
        </div>
      ))}
    </motion.section>
  );
}

function HowItWorksSection() {
  return (
    <motion.section className="space-y-8" {...fadeUp}>
      <SectionHeading
        eyebrow="Flow"
        title="How trusted savings circles run themselves"
        description="From onboarding to payouts, every touchpoint blends identity, incentives, and beautiful motion cues."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {howItWorks.map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/20">
              <Icon className="h-5 w-5 text-cyan-200" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-slate-300">{description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function ExperienceSection({
  isConnected,
  onSupportedChain,
}: {
  isConnected: boolean;
  onSupportedChain: boolean;
}) {
  return (
    <motion.section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]" {...fadeUp}>
      <SelfIdPanel isConnected={isConnected} onSupportedChain={onSupportedChain} />
      <DashboardPreview />
    </motion.section>
  );
}

function SelfIdPanel({
  isConnected,
  onSupportedChain,
}: {
  isConnected: boolean;
  onSupportedChain: boolean;
}) {
  const { isLinked, handle, reputationScore, attestations, linkSelfId, unlinkSelfId, isLinking } =
    useSelfId();

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6">
      <SectionHeading
        eyebrow="Identity"
        title="Self Protocol authentication"
        description="Gate participation with verifiable identity, recovery, and portable reputation."
      />
      <div className="mt-6 space-y-4 text-sm text-slate-300">
        <StatusPill
          icon={isLinked ? Trophy : ShieldCheck}
          label={
            isLinked
              ? `Linked as ${handle}`
              : "Link your SelfID to unlock attestations and invites"
          }
        />
        <div className="flex gap-3 text-white">
          <GradientStat label="Reputation" value={reputationScore.toString()} />
          <GradientStat label="Attestations" value={attestations.toString()} />
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              isLinked
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
            )}
            onClick={isLinked ? unlinkSelfId : linkSelfId}
            disabled={isLinking}
          >
            {isLinking ? "Linking…" : isLinked ? "Disconnect SelfID" : "Link with Self"}
          </button>
          {!isConnected && <SecondaryHint text="Connect your wallet to sign with Self" />}
          {isConnected && !onSupportedChain && (
            <SecondaryHint text="Switch to Celo or Alfajores to finalize Self link" />
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
      <SectionHeading
        eyebrow="Operations"
        title="Savings command center"
        description="Monitor contribution streaks, payout queues, and on-chain reputation in real time."
      />
      <div className="space-y-4">
        {circles.map((circle, index) => (
          <motion.div
            key={circle.name}
            custom={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <CircleCard circle={circle} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CircleCard({ circle, minimal = false }: { circle: CirclePreview; minimal?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-[0_15px_60px_rgba(8,47,73,0.4)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-white">{circle.name}</p>
          <p className="text-sm text-slate-400">
            {circle.members} members • {circle.contribution}
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-cyan-200">
          {circle.badge}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-300">{circle.status}</p>
      <div className="mt-3 h-2 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-300"
          style={{ width: `${circle.progress}%` }}
        />
      </div>
      {!minimal && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
          <p>
            Next payout <span className="text-white">{circle.nextPayout}</span>
          </p>
          <button className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-cyan-200">
            Manage <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

function ChainStatus({
  isConnected,
  onSupportedChain,
}: {
  isConnected: boolean;
  onSupportedChain: boolean;
}) {
  if (!isConnected) {
    return <StatusPill icon={Users} label="Wallet not connected" tone="muted" />;
  }
  if (!onSupportedChain) {
    return <StatusPill icon={ShieldCheck} label="Switch to Celo or Alfajores" tone="warning" />;
  }
  return <StatusPill icon={Sparkles} label="Ready on Celo" tone="success" />;
}

function StatusPill({
  icon: Icon,
  label,
  tone = "success",
}: {
  icon: typeof Users;
  label: string;
  tone?: "success" | "warning" | "muted";
}) {
  const tones: Record<typeof tone, string> = {
    success: "text-emerald-200 border-emerald-500/30",
    warning: "text-amber-200 border-amber-400/30",
    muted: "text-slate-300 border-white/10",
  } as const;
  return (
    <span className={clsx("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs", tones[tone])}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

function GradientStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
    </div>
  );
}

function SecondaryHint({ text }: { text: string }) {
  return <span className="text-xs text-slate-400">{text}</span>;
}

function PrimaryButton({ label }: { label: string }) {
  return (
    <button className="group inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
      {label}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </button>
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
