import React from "react";
import { motion } from "motion/react";
import { riskAnnotations } from "../data/storySections";

const toneClass = {
  cyan: "border-cyan-100/65 bg-slate-950/42 text-cyan-50",
  blue: "border-cyan-100/45 bg-slate-950/36 text-cyan-50",
  slate: "border-white/45 bg-slate-950/34 text-cyan-50",
} as const;

const labelSideClass = {
  right: "left-4",
  left: "right-4",
} as const;

export const RiskAnnotations: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0">
      {riskAnnotations.map((item, index) => (
        <motion.div
          key={item.label}
          className="absolute"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          initial={{ scale: 0.92, y: 18 }}
          whileInView={{ scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: index * 0.16, duration: 0.55, ease: "easeOut" }}
        >
          <span className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_26px_rgba(96,210,190,0.8)]" />
          <span className="absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-cyan-200/35" />
          <span
            data-risk-label
            className={`absolute top-1/2 inline-flex min-w-[4.75rem] -translate-y-1/2 flex-col rounded-lg border px-3 py-2 text-left text-xs shadow-2xl backdrop-blur-md sm:min-w-[8.5rem] ${labelSideClass[item.side]} ${toneClass[item.tone]}`}
          >
            <strong className="whitespace-nowrap text-sm font-semibold">{item.label}</strong>
            <span className="mt-0.5 hidden whitespace-nowrap text-white/60 sm:block">{item.detail}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
};
