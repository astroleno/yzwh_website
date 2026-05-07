import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

type SectionFrameProps = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

export const SectionFrame: React.FC<SectionFrameProps> = ({
  id,
  eyebrow,
  title,
  body,
  children,
  className,
  align = "left",
}) => {
  return (
    <section id={id} className={cn("relative min-h-[100dvh] overflow-hidden px-5 py-24 md:px-10 lg:px-16", className)}>
      <div className={cn("section-frame-inner relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12", align === "center" && "items-center text-center")}>
        <motion.div
          initial={{ y: 28 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className={cn("max-w-3xl", align === "center" && "mx-auto")}
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">{eyebrow}</p>
          <h2 className="font-heading text-4xl leading-tight text-white md:text-6xl">{title}</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">{body}</p>
        </motion.div>
        {children}
      </div>
    </section>
  );
};
