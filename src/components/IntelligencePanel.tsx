import React from "react";
import { motion } from "motion/react";
import { assetAlts, assetPaths, intelligenceFindings } from "../data/storySections";

const boxes = [
  { x: 22, y: 44, w: 21, h: 18, label: "渗漏痕迹" },
  { x: 58, y: 34, w: 17, h: 15, label: "空鼓风险" },
  { x: 66, y: 61, w: 22, h: 16, label: "热异常" },
];

export const IntelligencePanel: React.FC = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
      <div className="story-media relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950">
        <img src={assetPaths.intelligenceFacade} alt={assetAlts.intelligenceFacade} className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <motion.div
          className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-cyan-200/28 to-transparent"
          initial={{ x: "-130%" }}
          whileInView={{ x: "calc(100vw + 160px)" }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.25, ease: "easeInOut" }}
        />
        {boxes.map((box, index) => (
          <motion.div
            key={box.label}
            className="absolute border border-cyan-200/80 bg-cyan-200/10 shadow-[0_0_30px_rgba(96,210,190,0.18)]"
            style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}
            initial={{ scale: 0.96 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ delay: 0.48 + index * 0.2, duration: 0.42 }}
          >
            <span className="absolute -top-8 left-0 rounded bg-cyan-200 px-2 py-1 text-[11px] font-semibold text-slate-950">{box.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col justify-end gap-3">
        {intelligenceFindings.map((finding, index) => (
          <motion.div
            key={finding.label}
            className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl"
            initial={{ y: 18 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.24 + index * 0.12, duration: 0.48 }}
          >
            <p className="text-xs font-semibold tracking-[0.22em] text-cyan-200/70">{finding.label}</p>
            <p className="mt-2 text-lg font-semibold text-white">{finding.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
