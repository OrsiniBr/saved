"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { parseUnits } from "viem";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { FACTORY_ADDRESS } from "./config";
import { factoryAbi } from "./abi";

const SECONDS_PER_DAY = 86_400;

const defaultFormState = {
  name: "",
  contribution: "50",
  cycleLengthDays: "7",
  maxMembers: "6",
  payoutOrder: "",
};

type FormState = typeof defaultFormState;

export function CreateCircleDialog({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}) {
  const { isConnected } = useAccount();
  const [form, setForm] = useState<FormState>(defaultFormState);
  const [error, setError] = useState<string | null>(null);

  const {
    writeContract,
    data: txHash,
    isPending,
    error: writeError,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (txSuccess) {
      setForm(defaultFormState);
      setError(null);
      onCreated?.();
      onClose();
    }
  }, [txSuccess, onClose, onCreated]);

  const isBusy = isPending || isConfirming;

  const parsedMaxMembers = Number(form.maxMembers || "0");
  const parsedCycleDays = Number(form.cycleLengthDays || "0");
  const parsedContribution = Number(form.contribution || "0");

  const payoutPreview = useMemo(() => {
    if (form.payoutOrder.trim().length > 0) {
      return form.payoutOrder
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => value > 0)
        .join(" → ");
    }

    if (parsedMaxMembers > 0) {
      return Array.from({ length: parsedMaxMembers }, (_, idx) => idx + 1).join(" → ");
    }

    return "—";
  }, [form.payoutOrder, parsedMaxMembers]);

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!isConnected) {
      setError("Connect your wallet to deploy a circle.");
      return;
    }

    if (parsedContribution <= 0) {
      setError("Contribution must be greater than zero.");
      return;
    }

    if (parsedCycleDays <= 0) {
      setError("Cycle length must be at least 1 day.");
      return;
    }

    if (!Number.isInteger(parsedMaxMembers) || parsedMaxMembers <= 1) {
      setError("Max members must be at least 2.");
      return;
    }

    const payoutTokens = form.payoutOrder.trim().length > 0
      ? form.payoutOrder.split(",").map((value) => Number(value.trim()))
      : Array.from({ length: parsedMaxMembers }, (_, idx) => idx + 1);

    const payoutOrderArray = payoutTokens.filter((value) => Number.isInteger(value) && value > 0).slice(0, parsedMaxMembers);

    if (payoutOrderArray.length !== parsedMaxMembers) {
      setError("Payout order must list each member exactly once.");
      return;
    }

    const payoutOrderBigInt = payoutOrderArray.map((value) => BigInt(value));

    try {
      writeContract({
        address: FACTORY_ADDRESS,
        abi: factoryAbi,
        functionName: "createCircle",
        args: [
          parseUnits(form.contribution, 18),
          BigInt(parsedCycleDays * SECONDS_PER_DAY),
          BigInt(parsedMaxMembers),
          payoutOrderBigInt,
        ],
      });
    } catch (contractError) {
      setError((contractError as Error).message);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">New circle</p>
            <h2 className="mt-2 text-3xl font-semibold">Design your rotation</h2>
            <p className="mt-1 text-sm text-slate-400">Set contribution, cadence, and member cap in one go.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 px-3 py-1 text-sm text-slate-300 hover:border-white/40"
            disabled={isBusy}
          >
            Close
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm">
            <span className="text-slate-300">Circle label (for your dashboard)</span>
            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Sunrise Rotations"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              disabled={isBusy}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm">
              <span className="text-slate-300">Contribution (cUSD)</span>
              <input
                type="number"
                min="1"
                step="0.1"
                value={form.contribution}
                onChange={handleChange("contribution")}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                disabled={isBusy}
              />
            </label>

            <label className="text-sm">
              <span className="text-slate-300">Cycle length (days)</span>
              <input
                type="number"
                min="1"
                value={form.cycleLengthDays}
                onChange={handleChange("cycleLengthDays")}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                disabled={isBusy}
              />
            </label>

            <label className="text-sm">
              <span className="text-slate-300">Max members</span>
              <input
                type="number"
                min="2"
                value={form.maxMembers}
                onChange={handleChange("maxMembers")}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                disabled={isBusy}
              />
            </label>
          </div>

          <label className="block text-sm">
            <span className="text-slate-300">Custom payout order (comma separated, optional)</span>
            <input
              type="text"
              value={form.payoutOrder}
              onChange={handleChange("payoutOrder")}
              placeholder="1,2,3,4"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              disabled={isBusy}
            />
          </label>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Rotation preview</p>
            <p className="mt-1 text-slate-400">{payoutPreview}</p>
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}
          {writeError && <p className="text-sm text-rose-300">{writeError.message}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-300 px-6 py-3 text-base font-semibold text-slate-900 transition disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isBusy}
          >
            {isPending && "Confirm in wallet…"}
            {isConfirming && !isPending && "Waiting for finality…"}
            {!isBusy && "Deploy circle"}
          </button>

          {txHash && (
            <p className="text-center text-xs text-slate-500">
              Tx hash: <span className="font-mono">{txHash}</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
