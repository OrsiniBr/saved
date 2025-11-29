"use client";

import { motion } from "framer-motion";

import { fadeUp } from "./animations";
import { stats } from "./constants";

export function StatsRow() {
  return (
    <motion.section
      className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-3"
      {...fadeUp}
    >
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
