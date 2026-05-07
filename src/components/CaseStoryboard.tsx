import React from "react";
import { motion } from "motion/react";
import { assetAlts, assetPaths, caseSteps } from "../data/storySections";

export const CaseStoryboard: React.FC = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="story-media relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950">
        <img src={assetPaths.scienceMuseumCase} alt={assetAlts.scienceMuseumCase} className="absolute inset-0 h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200/70">深圳科学馆实景案例</p>
          <h3 className="mt-3 font-heading text-4xl text-white md:text-5xl">深圳科学馆建筑健康巡检</h3>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        {caseSteps.map((step, index) => (
          <motion.article
            key={step.label}
            className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl"
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <h4 className="text-xl font-semibold text-white">{step.label}</h4>
            <p className="mt-3 text-sm leading-7 text-white/60">{step.body}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
