"use client";

import { motion } from "framer-motion";

import { circles } from "./constants";
import { SectionHeading, CircleCard } from "./ui";

export function DashboardPreview() {
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
