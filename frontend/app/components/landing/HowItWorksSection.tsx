"use client";

import { motion } from "framer-motion";

import { fadeUp } from "./animations";
import { howItWorks } from "./constants";
import { SectionHeading } from "./ui";

export function HowItWorksSection() {
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
