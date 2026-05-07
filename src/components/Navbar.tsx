import React from "react";
import { ArrowUpRight } from "lucide-react";
import { LiquidGlass } from "./LiquidGlass";
import { navItems } from "../data/storySections";

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-4 z-50 flex w-full items-center justify-between px-5 md:px-10 lg:px-16">
      <a href="#hero" className="group flex items-center gap-3 text-white">
        <LiquidGlass className="flex h-11 w-11 items-center justify-center rounded-full">
          <span className="text-sm font-semibold tracking-wide">YZ</span>
        </LiquidGlass>
        <span className="hidden text-sm font-medium text-white/80 transition-colors group-hover:text-white sm:block">
          云筑万合
        </span>
      </a>

      <LiquidGlass className="hidden items-center gap-1 rounded-pill p-1.5 md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-pill px-3 py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="ml-1 flex items-center gap-2 rounded-pill bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          预约巡检
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
        </a>
      </LiquidGlass>

      <a
        href="#contact"
        className="rounded-pill border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md md:hidden"
      >
        联系
      </a>
    </nav>
  );
};
