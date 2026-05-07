import React from "react";
import { motion } from "motion/react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "word" | "character";
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = "",
  delay = 0,
  splitBy = "character",
}) => {
  const units = splitBy === "word" ? text.split(" ") : Array.from(text);

  return (
    <motion.p
      className={className}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: "0.1em" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          aria-hidden="true"
          style={{ display: "inline-block", marginRight: splitBy === "word" ? "0.28em" : "0.02em" }}
          variants={{
            hidden: { filter: "blur(10px)", opacity: 0, y: 36 },
            visible: {
              filter: ["blur(10px)", "blur(4px)", "blur(0px)"],
              opacity: [0, 0.55, 1],
              y: [36, -3, 0],
              transition: {
                duration: 0.62,
                times: [0, 0.55, 1],
                ease: "easeOut",
                delay: delay + i * 0.045,
              }
            }
          }}
        >
          {unit === " " ? "\u00A0" : unit}
        </motion.span>
      ))}
    </motion.p>
  );
};
