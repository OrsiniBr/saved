"use client";

import { motion } from "framer-motion";
import { Trophy, ShieldCheck } from "lucide-react";

import { fadeUp } from "./animations";
import { GradientStat, SecondaryHint, SectionHeading, StatusPill } from "./ui";
import { useSelfId } from "@/app/hooks/useSelfId";
import { SelfVerification } from "../self/SelfVerification";

export function SelfIdPanel({
  isConnected,
  onSupportedChain,
}: {
  isConnected: boolean;
  onSupportedChain: boolean;
}) {
  const {
    isLinked,
    handle,
    reputationScore,
    attestations,
    verificationData,
    linkSelfId,
    unlinkSelfId,
    isLinking,
    showVerification,
    isSubmittingOnchain,
    isVerificationPending,
    isVerificationConfirming,
    isVerificationSuccess,
    verificationError,
    handleVerificationSuccess,
    handleVerificationError,
    setShowVerification,
    submitProofOnchain,
  } = useSelfId();

  return (
    <>
      <motion.div
        className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6"
        {...fadeUp}
      >
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
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              <button
                className={
                  isLinked
                    ? "rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                    : "rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
                }
                onClick={isLinked ? unlinkSelfId : linkSelfId}
                disabled={isLinking || !isConnected || isSubmittingOnchain}
              >
                {(() => {
                  if (isLinking) return "Linking…";
                  if (isSubmittingOnchain) return "Submitting…";
                  return isLinked ? "Disconnect SelfID" : "Link with Self";
                })()}
              </button>
              {isLinked && verificationData && !isVerificationSuccess && (
                <button
                  className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-300 disabled:opacity-50"
                  onClick={() => submitProofOnchain(verificationData)}
                  disabled={isVerificationPending || isVerificationConfirming || !onSupportedChain}
                >
                  {isVerificationPending || isVerificationConfirming
                    ? "Submitting to chain…"
                    : "Submit Proof Onchain"}
                </button>
              )}
            </div>
            {isVerificationSuccess && (
              <SecondaryHint text="✓ Verification submitted onchain successfully" />
            )}
            {verificationError && (
              <SecondaryHint text={`Error: ${verificationError.message}`} />
            )}
            {!isConnected && <SecondaryHint text="Connect your wallet to sign with Self" />}
            {isConnected && !onSupportedChain && (
              <SecondaryHint text="Switch to Celo or Alfajores to finalize Self link" />
            )}
            {isLinked && verificationData && !isVerificationSuccess && (
              <SecondaryHint text="Submit your proof onchain to complete verification" />
            )}
          </div>
        </div>
      </motion.div>

      {showVerification && (
        <SelfVerification
          onSuccess={handleVerificationSuccess}
          onError={handleVerificationError}
          onClose={() => setShowVerification(false)}
        />
      )}
    </>
  );
}
