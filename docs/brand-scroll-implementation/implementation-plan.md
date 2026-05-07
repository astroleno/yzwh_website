# 云筑万合 Scroll Story Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the reference Vite React site into a premium scroll-story landing page for 云筑万合, following `Hero -> Invisible Risk -> Flight To Insight -> Intelligence Layer -> Report As Decision -> Flagship Case / CTA`.

**Architecture:** Keep the current Vite/React/Tailwind stack and replace the space-tourism template with a data-driven long page. Build a static accessible baseline first, then add an isolated desktop GSAP/ScrollTrigger pass for pinned scrubbed scrolltelling; mobile uses transform/opacity reveal fallbacks. Defer Three.js/GLB until the scroll story is visually stable.

**Tech Stack:** React 19, TypeScript, Vite 6, Tailwind CSS v4, `motion` for simple UI entrances outside pinned scenes, `gsap` + `@gsap/react` + `ScrollTrigger` for desktop scrolltelling, `lucide-react`, static assets in the repo root `public/` directory.

---

## Planning Notes

**Visual thesis:** A restrained city-engineering product story: cinematic public-building imagery, dark blue-gray surfaces, thin diagnostic cyan lines, sparse high-density Chinese copy, and no generic SaaS card grid.

**Content plan:** Hero establishes brand height; Invisible Risk reveals hidden facade problems; Flight To Insight shows drone sensing; Intelligence Layer turns imagery into explained risk; Report As Decision turns data into an actionable engineering report; Flagship Case / CTA anchors the story in 深圳科学馆.

**Interaction plan:** Use one entrance sequence for Hero, GSAP-pinned desktop scenes for Flight, scrubbed transform/opacity progress for routes, scan bars, report assembly, and case state changes. Mobile uses shorter reveal sections instead of pinned scenes, and all continuous motion uses transform/opacity rather than layout properties.

## Non-Goals For First Pass

- Do not add `three`, `@react-three/fiber`, or GLB model loading in the first pass.
- Do not ship the page as a premium scroll story if desktop GSAP/ScrollTrigger pinning and scrubbed progress are missing.
- Do not create a full city/building GLB for the site.
- Do not keep the current space-travel copy, stats cards, partner logo strip, or purple space gradients.
- Do not use `docs/assets` screenshots as final full-screen media without cleanup.
- Do not hide core report content inside generated raster text; build report structure and important copy in DOM/SVG.

## File Structure

| Path | Action | Responsibility |
|---|---|---|
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/package.json` | Modify | Add `gsap` and `@gsap/react` for desktop scrolltelling |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/vite.config.ts` | Modify | Serve repo-root `public/` so `/video/hero.webm`（桌面 4K） resolves from the root Vite app |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/pages/LandingPage.tsx` | Modify | Page orchestration and all section order |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/Navbar.tsx` | Modify | Brand navigation and primary CTA |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/BlurText.tsx` | Optional modify | Chinese-friendly text reveal only if reused outside the Hero; Hero `h1` must not depend on BlurText |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/FadingVideo.tsx` | Modify | Render poster underlay, fade video on `canplay`, and keep visible fallback on error |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/index.css` | Modify | Design tokens, section utilities, reduced glass intensity |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/data/storySections.ts` | Create | Copy, labels, coordinates, case steps |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/SectionFrame.tsx` | Create | Shared section heading and layout shell |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/RiskAnnotations.tsx` | Create | Invisible Risk labels and points |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/FlightPathScene.tsx` | Create | SVG route, drone marker, data layer chips with GSAP data hooks |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/IntelligencePanel.tsx` | Create | AI boxes, scan bar, engineering confirmation |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/ReportSequence.tsx` | Create | DOM/SVG report mock and report aggregation visual |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/CaseStoryboard.tsx` | Create | 深圳科学馆 four-step case |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/ScrollStoryController.tsx` | Create | Isolated GSAP/ScrollTrigger desktop orchestration and cleanup |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero.webm` | Existing | Hero runtime video source |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/` | Create if missing | Runtime image assets |

## Milestones

| # | Milestone | Success Criteria |
|---|---|---|
| 1 | Static story complete | All six sections render in order with Chinese copy and stable responsive layout |
| 2 | Static accessibility complete | All story images have meaningful alt text or adjacent accessible summaries; report core content is DOM text |
| 3 | Desktop scrolltelling complete | GSAP pins Flight and keeps Report as a stable DOM section by scroll progress, and cleans up on unmount |
| 4 | Asset pass complete | Hero video loads from `/video/hero.webm`（桌面 4K）, section images load from `/images/*`, no remote CloudFront template videos remain, and media meets byte/codec/dimension budgets |
| 5 | QA complete | `npm run lint` and `npm run build` pass; desktop and mobile visual checks show no blank media or overlapping text |

## Task 1: Dependencies, Asset Directory, And Story Data

**Files:**
- Modify: `/Users/aitoshuu/Documents/GitHub/yzwh_website/package.json`
- Modify: `/Users/aitoshuu/Documents/GitHub/yzwh_website/vite.config.ts`
- Create: `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/.gitkeep`
- Create: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/data/storySections.ts`

- [ ] **Step 1: Install desktop scrolltelling dependencies**

Run:

```bash
cd /Users/aitoshuu/Documents/GitHub/yzwh_website
npm install gsap @gsap/react
```

Expected: `package.json` and the lockfile include `gsap` and `@gsap/react`. Do not install `three`, `@react-three/fiber`, or GSAP plugins beyond the bundled `ScrollTrigger`.

- [ ] **Step 2: Configure Vite to serve the repo-root public directory**

Modify `/Users/aitoshuu/Documents/GitHub/yzwh_website/vite.config.ts` so the returned config includes:

```ts
publicDir: path.resolve(__dirname, "public"),
```

Expected config shape:

```ts
export default defineConfig(() => {
  return {
    publicDir: path.resolve(__dirname, "public"),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
```

Expected: running the root Vite app from `/Users/aitoshuu/Documents/GitHub/yzwh_website` serves `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero.webm` at `/video/hero.webm`（桌面 4K）.

- [ ] **Step 3: Create the public asset directory**

Run:

```bash
mkdir -p /Users/aitoshuu/Documents/GitHub/yzwh_website/public/images /Users/aitoshuu/Documents/GitHub/yzwh_website/public/video
touch /Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/.gitkeep
```

Expected: `public/video/hero.webm` exists, and `public/images/` can hold section images.

- [ ] **Step 4: Add `storySections.ts`**

Create `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/data/storySections.ts`:

```ts
export const assetPaths = {
  heroVideo: "/video/hero.webm",
  heroVideoMobile: "/video/hero-mobile.webm",
  riskFacade: "/images/risk-facade.jpg",
  flightBuilding: "/images/flight-building.jpg",
  intelligenceFacade: "/images/intelligence-facade.jpg",
  reportAerialThumb: "/images/report-aerial-thumb.jpg",
  reportThermalThumb: "/images/report-thermal-thumb.jpg",
  reportFacadeThumb: "/images/report-facade-thumb.jpg",
  scienceMuseumCase: "/images/science-museum-case.jpg",
} as const;

export const assetAlts = {
  riskFacade: "建筑外立面局部，风险标注展示空鼓、脱落、渗漏和热异常在真实材料表面的分布。",
  flightBuilding: "无人机巡检建筑的俯视空间，航线和采集点覆盖外立面与屋顶。",
  intelligenceFacade: "建筑立面影像被系统读取，检测框标出疑似渗漏、空鼓和热异常位置。",
  reportAerialThumb: "报告中的建筑定位缩略图。",
  reportThermalThumb: "报告中的热成像异常缩略图。",
  reportFacadeThumb: "报告中的外立面病害标注缩略图。",
  scienceMuseumCase: "深圳科学馆及周边城市环境，作为建筑健康巡检旗舰案例。",
} as const;

export const navItems = [
  { label: "隐形风险", href: "#risk" },
  { label: "巡检路径", href: "#flight" },
  { label: "智能分析", href: "#intelligence" },
  { label: "报告交付", href: "#report" },
  { label: "案例", href: "#case" },
] as const;

export const heroCopy = {
  eyebrow: "建筑健康感知系统",
  title: "云筑万合",
  subtitle: "城市地标的隐形守护系统",
  body: "以无人机、AI 识别、热成像与工程分析，为建筑建立更早一步的健康感知。",
  primaryCta: "预约建筑健康巡检",
  secondaryCta: "查看样例报告",
} as const;

export const riskAnnotations = [
  { label: "空鼓", detail: "材料层异常", x: 24, y: 58, side: "right", tone: "cyan" },
  { label: "脱落", detail: "外立面风险", x: 42, y: 36, side: "right", tone: "blue" },
  { label: "渗漏", detail: "水迹扩散", x: 61, y: 62, side: "left", tone: "cyan" },
  { label: "热异常", detail: "温差异常", x: 76, y: 44, side: "left", tone: "slate" },
] as const;

export const flightPoints = [
  { label: "屋顶边缘", x: 24, y: 64 },
  { label: "东侧立面", x: 42, y: 42 },
  { label: "转角节点", x: 61, y: 38 },
  { label: "高区幕墙", x: 78, y: 24 },
] as const;

export const flightLayers = [
  { label: "航线规划", value: "路径覆盖" },
  { label: "可见光采集", value: "立面影像" },
  { label: "热成像采集", value: "温差信号" },
  { label: "局部细节", value: "病害证据" },
] as const;

export const intelligenceFindings = [
  { label: "问题类型", value: "疑似空鼓 / 渗漏" },
  { label: "定位范围", value: "外立面东南侧 12-18m" },
  { label: "风险等级", value: "需复核" },
  { label: "工程判断", value: "建议纳入维护优先级" },
] as const;

export const caseSteps = [
  { label: "建筑定位", body: "深圳科学馆位于罗湖核心区，周边建筑密集，巡检需要兼顾安全距离与覆盖完整性。" },
  { label: "巡检路径", body: "无人机沿外立面、屋顶和周边环境建立采集路径，记录可见光与热成像数据。" },
  { label: "风险发现", body: "系统辅助识别空鼓、脱落、渗漏等疑似隐患，再由工程经验进行复核解释。" },
  { label: "报告交付", body: "最终形成建筑环境安全分析报告，为后续维护和管理决策提供依据。" },
] as const;
```

- [ ] **Step 5: Verify TypeScript import works**

Run:

```bash
cd /Users/aitoshuu/Documents/GitHub/yzwh_website
npm run lint
```

Expected: TypeScript still compiles or only reports pre-existing unrelated issues.

## Task 2: Design Tokens, Navbar, And Optional Chinese Text Reveal

**Files:**
- Modify: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/index.css`
- Modify: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/Navbar.tsx`
- Optional modify: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/BlurText.tsx`

- [ ] **Step 1: Replace global visual tokens**

In `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/index.css`, keep the Tailwind import and add these tokens/utilities:

```css
@import "tailwindcss";

@theme {
  --font-heading: "Helvetica Neue", "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
  --font-body: "Helvetica Neue", "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
}

:root {
  --color-ink: #07111f;
  --color-deep: #101b2b;
  --color-steel: #213246;
  --color-blue: #2e5c97;
  --color-cyan: #60d2be;
      --color-mist: #f3f6fa;
  --color-line: rgba(216, 224, 232, 0.32);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100dvh;
  background-color: var(--color-ink);
  color: #fff;
  font-family: var(--font-body);
}

.font-heading {
  font-family: var(--font-heading);
}

.font-body {
  font-family: var(--font-body);
}

.rounded-pill {
  border-radius: 9999px;
}

.tracking-tighter-max {
  letter-spacing: 0;
}

.liquid-glass {
  background: rgba(7, 17, 31, 0.34);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(216, 224, 232, 0.18);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
}

.liquid-glass-strong {
  background: rgba(243, 246, 250, 0.9);
  color: var(--color-ink);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.18);
}

.diagnostic-grid {
  background-image:
    linear-gradient(rgba(96, 210, 190, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(96, 210, 190, 0.08) 1px, transparent 1px);
  background-size: 48px 48px;
}

.story-media {
  min-height: 620px;
}

.gsap-desktop-only {
  display: block;
}

@media (max-width: 767px) {
  .story-media {
    min-height: 520px;
  }

  .diagnostic-grid {
    background-size: 32px 32px;
  }

  .gsap-desktop-only {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Update Navbar**

Replace `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/Navbar.tsx` with:

```tsx
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
```

- [ ] **Step 3: Make `BlurText` Chinese-friendly if it is still used**

Hero no longer uses `BlurText`; the primary Hero statement is one semantic `h1`. If `BlurText` is reused elsewhere, replace word splitting in `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/BlurText.tsx` with character-aware splitting:

```tsx
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
              },
            },
          }}
        >
          {unit === " " ? "\u00A0" : unit}
        </motion.span>
      ))}
    </motion.p>
  );
};
```

- [ ] **Step 4: Verify**

Run:

```bash
cd /Users/aitoshuu/Documents/GitHub/yzwh_website
npm run lint
```

Expected: no TypeScript errors from the modified files.

## Task 3: Shared Section Components

**Files:**
- Create: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/SectionFrame.tsx`
- Create: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/RiskAnnotations.tsx`

- [ ] **Step 1: Add `SectionFrame.tsx`**

```tsx
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
      <div className={cn("relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12", align === "center" && "items-center text-center")}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
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
```

- [ ] **Step 2: Add `RiskAnnotations.tsx`**

```tsx
import React from "react";
import { motion } from "motion/react";
import { riskAnnotations } from "../data/storySections";

const toneClass = {
  cyan: "border-cyan-200/70 bg-cyan-200/10 text-cyan-50",
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
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: index * 0.16, duration: 0.55, ease: "easeOut" }}
        >
          <span className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_26px_rgba(96,210,190,0.8)]" />
          <span className="absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-cyan-200/35" />
          <span
            className={`absolute top-1/2 inline-flex max-w-[11rem] -translate-y-1/2 flex-col text-balance rounded-lg border px-3 py-2 text-xs shadow-2xl backdrop-blur-md ${labelSideClass[item.side]} ${toneClass[item.tone]}`}
          >
            <strong className="text-sm font-semibold">{item.label}</strong>
            <span className="mt-0.5 text-white/60">{item.detail}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
};
```

- [ ] **Step 3: Verify**

Run:

```bash
cd /Users/aitoshuu/Documents/GitHub/yzwh_website
npm run lint
```

Expected: created components compile.

## Task 4: Flight, Intelligence, Report, And Case Components

**Files:**
- Create: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/FlightPathScene.tsx`
- Create: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/IntelligencePanel.tsx`
- Create: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/ReportSequence.tsx`
- Create: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/CaseStoryboard.tsx`

- [ ] **Step 1: Add `FlightPathScene.tsx`**

Use an SVG path and DOM drone marker. Do not add GLB in this task. This component is the accessible static/mobile fallback plus DOM target for Task 7; desktop scroll-story acceptance depends on the GSAP controller, not `whileInView`.

```tsx
import React from "react";
import { Radio, ScanLine, Thermometer, Waypoints } from "lucide-react";
import { assetAlts, assetPaths, flightLayers, flightPoints } from "../data/storySections";

const icons = [Waypoints, ScanLine, Thermometer, Radio];

export const FlightPathScene: React.FC = () => {
  return (
    <div data-scroll-scene="flight" className="story-media relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 shadow-2xl">
      <img src={assetPaths.flightBuilding} alt={assetAlts.flightBuilding} className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/10 to-slate-950/80" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
        <path
          data-flight-route
          d="M160 470 C260 280 420 190 610 240 C760 280 825 180 900 92"
          fill="none"
          stroke="rgba(96,210,190,0.85)"
          strokeWidth="3"
          strokeDasharray="12 14"
        />
      </svg>
      {flightPoints.map((point) => (
        <div
          key={point.label}
          data-flight-point
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/80 bg-cyan-100 shadow-[0_0_24px_rgba(96,210,190,0.72)]"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
          aria-label={`采集点：${point.label}`}
        />
      ))}
      <div
        data-flight-drone
        className="absolute left-[54%] top-[36%] rounded-full border border-cyan-100/30 bg-cyan-100/10 px-4 py-2 text-xs font-semibold text-cyan-50 backdrop-blur-md"
      >
        无人机采集中
      </div>
      <div className="absolute bottom-6 left-6 right-6 grid gap-3 md:grid-cols-4">
        {flightLayers.map((layer, index) => {
          const Icon = icons[index];
          return (
            <div
              key={layer.value}
              data-flight-layer
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/56 p-4 backdrop-blur-lg"
            >
              <Icon className="h-5 w-5 text-cyan-200" />
              <div>
                <p className="text-sm font-semibold text-white">{layer.label}</p>
                <p className="text-xs text-white/50">{layer.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Add `IntelligencePanel.tsx`**

```tsx
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
      <div className="relative min-h-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950">
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
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
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
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
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
```

- [ ] **Step 3: Add `ReportSequence.tsx`**

Build the report as DOM/SVG content. Raster assets are only evidence thumbnails; do not generate unreadable report body text into an image.

```tsx
import React from "react";
import { FileText } from "lucide-react";
import { assetAlts, assetPaths } from "../data/storySections";

export const ReportSequence: React.FC = () => {
  const evidence = [
    { label: "航拍定位", src: assetPaths.reportAerialThumb, alt: assetAlts.reportAerialThumb },
    { label: "热成像", src: assetPaths.reportThermalThumb, alt: assetAlts.reportThermalThumb },
    { label: "病害标注", src: assetPaths.reportFacadeThumb, alt: assetAlts.reportFacadeThumb },
  ];

  return (
    <div data-scroll-scene="report" className="story-media relative overflow-hidden rounded-[28px] bg-[var(--color-mist)] p-6 text-slate-950 md:p-10">
      <div className="absolute inset-0 opacity-60 diagnostic-grid" aria-hidden="true" />
      <div className="relative z-10 grid h-full gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="flex flex-col justify-end gap-3">
          {evidence.map((item) => (
            <div
              key={item.label}
              data-report-evidence
              className="rounded-2xl border border-slate-900/10 bg-white/72 p-4 shadow-sm backdrop-blur"
            >
              <img src={item.src} alt={item.alt} className="mb-3 h-24 w-full rounded-xl object-cover" />
              <p className="text-sm font-semibold">{item.label}</p>
            </div>
          ))}
        </div>
        <div
          data-report-sheet
          className="relative overflow-hidden rounded-[24px] border border-slate-900/10 bg-white p-6 shadow-2xl"
        >
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-slate-500">YUNZHU WANHE</p>
              <h3 className="mt-2 font-heading text-3xl text-slate-950">建筑环境安全分析报告</h3>
            </div>
            <FileText className="h-8 w-8 text-[var(--color-blue)]" />
          </div>
          <div className="grid gap-5 md:grid-cols-[1fr_0.72fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-slate-500">结论摘要</p>
              <p className="mt-3 text-2xl font-semibold leading-snug text-slate-950">外立面局部存在疑似空鼓、渗漏与热异常，需要纳入维护优先级。</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {evidence.map((item) => (
                  <img key={item.label} src={item.src} alt={item.alt} className="h-28 rounded-xl object-cover" />
                ))}
              </div>
            </div>
            <dl className="rounded-2xl bg-slate-950 p-5 text-white">
              <div>
                <dt className="text-xs text-white/45">检测对象</dt>
                <dd className="mt-1 font-semibold">城市公共建筑外立面与屋顶</dd>
              </div>
              <div className="mt-5">
                <dt className="text-xs text-white/45">核心问题</dt>
                <dd className="mt-1 font-semibold">空鼓 / 脱落 / 渗漏 / 热异常</dd>
              </div>
              <div className="mt-5">
                <dt className="text-xs text-white/45">交付结果</dt>
                <dd className="mt-1 font-semibold">位置、证据、原因解释、处理建议</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 4: Add `CaseStoryboard.tsx`**

```tsx
import React from "react";
import { motion } from "motion/react";
import { assetAlts, assetPaths, caseSteps } from "../data/storySections";

export const CaseStoryboard: React.FC = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative min-h-[620px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950">
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
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
```

- [ ] **Step 5: Verify**

Run:

```bash
cd /Users/aitoshuu/Documents/GitHub/yzwh_website
npm run lint
```

Expected: all new component imports compile.

## Task 5: Replace Landing Page With The Brand Story

**Files:**
- Modify: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/pages/LandingPage.tsx`
- Modify: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/FadingVideo.tsx`

- [ ] **Step 1: Replace `FadingVideo` with a visible poster underlay**

Replace `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/FadingVideo.tsx` with a wrapper that loops the hero video directly without a poster or still-image placeholder:

```tsx
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

interface FadingVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
  videoClassName?: string;
}

export const FadingVideo: React.FC<FadingVideoProps> = ({
  src,
  className,
  videoClassName,
  style,
  onCanPlay,
  onError,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rAfRef = useRef<number>(0);
  const fadingOutRef = useRef(false);
  const [hasError, setHasError] = useState(false);

  const fadeTo = (targetOpacity: number) => {
    const video = videoRef.current;
    if (!video) return;

    cancelAnimationFrame(rAfRef.current);
    const startOpacity = parseFloat(video.style.opacity || "0");
    const startTime = performance.now();
    const fadeMs = 500;

    const animateFade = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / fadeMs, 1);
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      if (videoRef.current) videoRef.current.style.opacity = currentOpacity.toString();
      if (progress < 1) rAfRef.current = requestAnimationFrame(animateFade);
    };

    rAfRef.current = requestAnimationFrame(animateFade);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && remaining > 0 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      window.setTimeout(() => {
        if (!videoRef.current || hasError) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => setHasError(true));
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    return () => {
      cancelAnimationFrame(rAfRef.current);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [hasError]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        src={src}
        className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", videoClassName)}
        style={{ ...style, opacity: hasError ? 0 : 1 }}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={(event) => {
          event.currentTarget.play().catch(() => setHasError(true));
          fadeTo(1);
          onCanPlay?.(event);
        }}
        onError={(event) => {
          setHasError(true);
          onError?.(event);
        }}
        {...props}
      />
    </div>
  );
};
```

Expected: Hero contains a `<video>` as the visual layer and no poster `<img>` layer. The loop fade still works at the end of playback.

- [ ] **Step 2: Replace `LandingPage.tsx`**

Replace `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/pages/LandingPage.tsx` with:

```tsx
import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { CaseStoryboard } from "../components/CaseStoryboard";
import { FadingVideo } from "../components/FadingVideo";
import { FlightPathScene } from "../components/FlightPathScene";
import { IntelligencePanel } from "../components/IntelligencePanel";
import { Navbar } from "../components/Navbar";
import { ReportSequence } from "../components/ReportSequence";
import { RiskAnnotations } from "../components/RiskAnnotations";
import { SectionFrame } from "../components/SectionFrame";
import { assetAlts, assetPaths, heroCopy } from "../data/storySections";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[var(--color-ink)] text-white selection:bg-cyan-200/30 selection:text-white">
      <Navbar />

      <section id="hero" className="relative flex min-h-[92dvh] flex-col justify-end overflow-hidden px-5 pb-12 pt-28 md:px-10 lg:px-16">
        <FadingVideo
          src={assetPaths.heroVideo}
          className="absolute inset-0 z-0"
          videoClassName="object-[58%_50%] md:object-center"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/16 via-slate-950/20 to-slate-950/82" />
        <div className="absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-t from-[var(--color-ink)] to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start">
          <motion.p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
          >
            {heroCopy.eyebrow}
          </motion.p>
          <motion.h1
            className="w-full max-w-6xl font-heading text-[clamp(3.1rem,6.8vw,6.6rem)] leading-[0.96] text-white"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.78, ease: "easeOut" }}
            aria-label={`${heroCopy.title}，${heroCopy.subtitle}`}
          >
            <span className="block">{heroCopy.title}</span>
            <span className="mt-3 block text-white/86">{heroCopy.subtitle}</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.64, duration: 0.78, ease: "easeOut" }}
          >
            {heroCopy.body}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.72 }}
          >
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-pill bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.03] active:scale-[0.98]">
              {heroCopy.primaryCta}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#report" className="inline-flex items-center justify-center rounded-pill border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/15">
              {heroCopy.secondaryCta}
            </a>
          </motion.div>
        </div>
      </section>

      <SectionFrame
        id="risk"
        eyebrow="建筑风险显影"
        title="真正的建筑风险，往往不在显眼处。"
        body="外立面空鼓、脱落、渗漏与热异常，常常先以微小变化隐藏在材料深处。"
        className="bg-[var(--color-ink)]"
      >
        <div className="story-media relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950">
          <img src={assetPaths.riskFacade} alt={assetAlts.riskFacade} className="absolute inset-0 h-full w-full object-cover opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/75" aria-hidden="true" />
          <div className="absolute inset-0 diagnostic-grid opacity-40" aria-hidden="true" />
          <RiskAnnotations />
        </div>
      </SectionFrame>

      <SectionFrame
        id="flight"
        eyebrow="飞行采集"
        title="从一次飞行，到一套可判断的建筑数据。"
        body="航线、采集点、可见光与热成像数据被组织成可追溯的建筑感知层。"
        className="bg-[var(--color-deep)]"
      >
        <FlightPathScene />
      </SectionFrame>

      <SectionFrame
        id="intelligence"
        eyebrow="智能判读"
        title="影像被识别，问题被定位，风险被解释。"
        body="系统先定位异常，再由工程经验复核成因、范围与维护优先级。"
        className="bg-[var(--color-ink)]"
      >
        <IntelligencePanel />
      </SectionFrame>

      <SectionFrame
        id="report"
        eyebrow="报告决策"
        title="不是一组照片，而是一份可行动的建筑健康证据。"
        body="现场影像、热成像、病害位置和工程结论，被整理成可追溯、可沟通、可执行的报告。"
        className="bg-[var(--color-deep)]"
      >
        <ReportSequence />
      </SectionFrame>

      <SectionFrame
        id="case"
        eyebrow="深圳科学馆案例"
        title="深圳科学馆建筑健康巡检"
        body="以城市核心区公共建筑为样本，呈现从建筑定位、巡检路径、风险发现到报告交付的完整闭环。"
        className="bg-[var(--color-ink)]"
      >
        <CaseStoryboard />
      </SectionFrame>

      <section id="contact" className="relative overflow-hidden bg-[var(--color-mist)] px-5 py-24 text-slate-950 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--color-blue)]">合作入口</p>
            <h2 className="mt-5 max-w-3xl font-heading text-4xl leading-tight md:text-7xl">让每一座地标，都被更早一步守护。</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#contact-form" className="rounded-pill bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]">
              预约建筑健康巡检
            </a>
            <a href="#report" className="rounded-pill border border-slate-950/16 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-950/5">
              查看样例报告
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
```

- [ ] **Step 3: Verify**

Run:

```bash
cd /Users/aitoshuu/Documents/GitHub/yzwh_website
npm run lint
npm run build
```

Expected: page builds with no TypeScript or Vite errors.

## Task 6: Replace Temporary Assets

**Files:**
- Existing: `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero.webm`
- Add: `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/risk-facade.jpg`
- Add: `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/flight-building.jpg`
- Add: `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/intelligence-facade.jpg`
- Add: `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/report-aerial-thumb.jpg`
- Add: `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/report-thermal-thumb.jpg`
- Add: `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/report-facade-thumb.jpg`
- Add: `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/science-museum-case.jpg`

- [ ] **Step 1: Confirm the generated hero loop**

The generated loop is already at:

```text
/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero.webm
```

Expected: browser can load it at `/video/hero.webm`（桌面 4K）.

- [ ] **Step 2: Export the runtime hero video**

The runtime file should be 4K WebM, 24fps, no audio, and under 10MB. Keep a source backup first:

```bash
cd /Users/aitoshuu/Documents/GitHub/yzwh_website
mkdir -p public/video/source
test -f public/video/source/hero-source-4k-audio.mp4 || cp public/video/hero.webm public/video/source/hero-source-4k-audio.mp4
ffmpeg -y \
  -i public/video/source/hero-source-4k-audio.mp4 \
  -map 0:v:0 -an \
  -vf "fps=24,scale=3840:2160:flags=lanczos" \
  -c:v libvpx-vp9 -b:v 5000k -deadline good -cpu-used 4 -row-mt 1 \
  public/video/hero.webm
```

Expected: `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero.webm` itself is 3840x2160, 24fps, has no audio stream, and is `<= 10485760` bytes. Do not point the app at a second desktop hero video filename.

- [ ] **Step 3: Add section stills**

Until final generated stills are ready, use cleaned exports derived from the reference images and keep the filenames exact:

```text
risk-facade.jpg
flight-building.jpg
intelligence-facade.jpg
report-aerial-thumb.jpg
report-thermal-thumb.jpg
report-facade-thumb.jpg
science-museum-case.jpg
```

`science-museum-case.jpg` is the trust anchor, so it must be edited from a verified source frame or photo. Use `/Users/aitoshuu/Documents/GitHub/yzwh_website/docs/assets/opening-aerial.jpg` or a frame exported from `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/source/hero-source-4k-audio.mp4` as the imagegen edit target; do not free-generate the 深圳科学馆 case image from text alone.

Expected: image files live under `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/`, no image URL in code points to `docs/assets` or remote CloudFront, and the case image preserves the verified building geometry and surrounding context.

- [ ] **Step 4: Verify asset loading**

Run:

```bash
cd /Users/aitoshuu/Documents/GitHub/yzwh_website
npm run dev
```

Open:

```text
http://localhost:3000
```

Expected: no broken image icons, no blank hero background after video load, and no console 404 for `/video/*` or `/images/*`.

## Task 7: Desktop GSAP Scrolltelling And Mobile Fallback

**Files:**
- Create: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/ScrollStoryController.tsx`
- Modify: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/index.css`
- Modify: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/FlightPathScene.tsx`
- Modify: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/ReportSequence.tsx`
- Modify: `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/pages/LandingPage.tsx`

- [ ] **Step 1: Remove Motion ownership from GSAP-controlled nodes**

In `FlightPathScene.tsx` and `ReportSequence.tsx`, elements with these attributes must not also use `motion.*`, `initial`, `whileInView`, or Motion `transition` props:

```text
data-flight-route
data-flight-point
data-flight-drone
data-flight-layer
data-report-evidence
data-report-sheet
```

Expected: desktop scroll progress is owned by GSAP only; mobile fallback can use CSS opacity/transform classes and normal document flow.

- [ ] **Step 2: Create `ScrollStoryController.tsx`**

Create `/Users/aitoshuu/Documents/GitHub/yzwh_website/src/components/ScrollStoryController.tsx`:

```tsx
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const ScrollStoryController: React.FC = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const timelines: gsap.core.Timeline[] = [];
      const flight = document.querySelector<HTMLElement>("[data-scroll-scene='flight']");
      if (flight) {
        const route = flight.querySelector<SVGPathElement>("[data-flight-route]");
        const points = gsap.utils.toArray<HTMLElement>(flight.querySelectorAll("[data-flight-point]"));
        const drone = flight.querySelector<HTMLElement>("[data-flight-drone]");
        const layers = gsap.utils.toArray<HTMLElement>(flight.querySelectorAll("[data-flight-layer]"));

        if (route) {
          const routeLength = route.getTotalLength();
          gsap.set(route, {
            strokeDasharray: routeLength,
            strokeDashoffset: routeLength,
            opacity: 1,
          });
        }

        gsap.set(points, { autoAlpha: 0, scale: 0.62, transformOrigin: "50% 50%" });
        if (drone) {
          gsap.set(drone, { autoAlpha: 0, scale: 0.9, y: 18, transformOrigin: "50% 50%" });
        }
        gsap.set(layers, { autoAlpha: 0, y: 32 });

        const flightTl = gsap.timeline({
          scrollTrigger: {
            trigger: flight,
            start: "top top+=64",
            end: "+=180%",
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        timelines.push(flightTl);
        flightTl.addLabel("route", 0);
        flightTl.addLabel("points", 0.35);
        flightTl.addLabel("data", 0.70);

        if (route) {
          flightTl.to(route, { strokeDashoffset: 0, ease: "none", duration: 0.35 }, "route");
        }

        flightTl.to(points, { autoAlpha: 1, scale: 1, stagger: 0.06, ease: "back.out(1.8)", duration: 0.24 }, "points");

        if (drone) {
          flightTl.to(drone, { autoAlpha: 1, scale: 1, y: 0, ease: "power2.out", duration: 0.24 }, "points+=0.04");
        }

        flightTl.to(layers, { autoAlpha: 1, y: 0, stagger: 0.08, ease: "power2.out", duration: 0.28 }, "data");
      }

      const report = document.querySelector<HTMLElement>("[data-scroll-scene='report']");
      if (report) {
        const evidence = gsap.utils.toArray<HTMLElement>(report.querySelectorAll("[data-report-evidence]"));
        const sheet = report.querySelector<HTMLElement>("[data-report-sheet]");

        gsap.set(evidence, { autoAlpha: 0, x: -42 });
        if (sheet) {
          gsap.set(sheet, { autoAlpha: 0, y: 48, rotateX: 8, transformOrigin: "50% 70%" });
        }

        const reportTl = gsap.timeline({
          scrollTrigger: {
            trigger: report,
            start: "top top+=64",
            end: "+=160%",
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        timelines.push(reportTl);

        reportTl.to(evidence, { autoAlpha: 1, x: 0, stagger: 0.1, ease: "power2.out", duration: 0.45 }, 0);

        if (sheet) {
          reportTl.to(sheet, { autoAlpha: 1, y: 0, rotateX: 0, ease: "power2.out", duration: 0.5 }, 0.28);
        }
      }

      return () => {
        timelines.forEach((timeline) => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return null;
};
```

Expected: desktop Flight section pins and scrubs correctly; Report remains stable without overlapping the case section when the component unmounts.

- [ ] **Step 3: Mount the controller in `LandingPage.tsx`**

Add the import:

```tsx
import { ScrollStoryController } from "../components/ScrollStoryController";
```

Render it once near the top of the page:

```tsx
<Navbar />
<ScrollStoryController />
```

Expected: the controller does not render visible UI and does not affect mobile because it only runs for desktop media queries.

- [ ] **Step 4: Confirm mobile-safe section sizing**

Confirm these utilities from Task 2 exist in `index.css`:

```css
.story-media {
  min-height: 620px;
}

@media (max-width: 767px) {
  .story-media {
    min-height: 520px;
  }

  .diagnostic-grid {
    background-size: 32px 32px;
  }
}
```

- [ ] **Step 5: Apply `.story-media` to all large visual containers**

Replace repeated `min-h-[620px]` on large visual containers with `story-media`.

Expected: desktop stays immersive; mobile does not create excessive pinned-feeling blank scroll.

- [ ] **Step 6: Keep animation count low**

Ensure each section has no more than:

```text
Hero: 4 entrance animations
Invisible Risk: 4 annotation reveals
Flight: 1 route draw + 4 layer reveals
Intelligence: 1 scan + 3 detection boxes + 4 finding rows
Report: 4 data rows + 1 report reveal
Case: 4 case step reveals
```

Expected: animation feels intentional and stays smooth on mobile.

## Task 8: Asset QA

**Files:**
- Modify or replace assets only if QA fails.

- [ ] **Step 1: Inspect hero video codec, dimensions, duration, and size**

Run:

```bash
cd /Users/aitoshuu/Documents/GitHub/yzwh_website
ffprobe -v error \
  -select_streams v:0 \
  -show_entries stream=codec_name,width,height,pix_fmt,r_frame_rate \
  -show_entries format=duration,size \
  -of json /Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero.webm
```

Expected:

```text
codec_name is h264
pix_fmt is yuv420p
width >= 1920
height >= 1080
runtime duration preserves the loop seam; 15.07 seconds is acceptable if the seam is visually invisible
runtime size is <= 10485760 bytes
```

- [ ] **Step 2: Confirm the hero video has no audio stream**

Run:

```bash
ffprobe -v error -select_streams a -show_entries stream=codec_name -of csv=p=0 /Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero.webm
```

Expected: no output. If this command prints `aac` or any other codec, asset QA fails and Task 6 Step 2 must be rerun against the runtime `/public/video/hero.webm`.

- [ ] **Step 3: Inspect image dimensions**

Run:

```bash
sips -g pixelWidth -g pixelHeight -g format /Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/risk-facade.jpg /Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/flight-building.jpg /Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/intelligence-facade.jpg /Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/report-aerial-thumb.jpg /Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/report-thermal-thumb.jpg /Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/report-facade-thumb.jpg /Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/science-museum-case.jpg
```

Expected:

```text
risk-facade.jpg is at least 1800px wide
flight-building.jpg is at least 1800px wide
intelligence-facade.jpg is at least 1600px wide
report thumbnails are at least 900px wide
science-museum-case.jpg is at least 1800px wide
```

- [ ] **Step 4: Inspect byte sizes**

Run:

```bash
find /Users/aitoshuu/Documents/GitHub/yzwh_website/public -maxdepth 2 -type f \( -name "*.jpg" -o -name "*.mp4" \) -print0 | xargs -0 ls -lh
```

Expected:

```text
large section images <= 900KB each
report thumbnails <= 300KB each
hero.webm runtime file 4K WebM primary
```

- [ ] **Step 5: Manual asset invariant check**

Inspect every final visual asset at desktop and mobile crops. Reject and regenerate assets that contain:

```text
subtitles
watermarks
drone controller UI chrome
unrelated people
garbled generated text
fake logo text
critical building subject cropped out on 390x844
visible loop pop at the hero video seam
free-generated 深圳科学馆 geometry that does not match the verified source
```

Expected: every runtime asset passes the invariant check before visual QA.

## Task 9: Verification And Handoff

**Files:**
- Modify only if verification finds issues.

- [ ] **Step 1: Type check and build**

Run:

```bash
cd /Users/aitoshuu/Documents/GitHub/yzwh_website
npm run lint
npm run build
```

Expected:

```text
tsc --noEmit
vite build
```

Both commands complete successfully.

- [ ] **Step 2: Run local server**

Run:

```bash
cd /Users/aitoshuu/Documents/GitHub/yzwh_website
npm run dev
```

Expected: Vite serves the app at `http://localhost:3000`.

- [ ] **Step 3: Desktop visual check**

Check `1440x900`:

```text
Hero video visible and text readable.
Next section hint appears below Hero.
No cards/logos/stats from old template remain.
Risk labels attach to the facade.
Flight route is visible.
Report section becomes lighter and readable.
CTA buttons do not overlap.
```

- [ ] **Step 4: Mobile visual check**

Check `390x844`:

```text
Hero text fits without overlap.
Navbar does not cover title.
Risk labels remain inside image bounds.
Flight layer chips stack cleanly.
Report mock is readable enough and does not overflow horizontally.
CTA buttons stack.
```

- [ ] **Step 5: GLB decision checkpoint**

Only after Tasks 1-9 pass, decide whether to add:

```text
/Users/aitoshuu/Documents/GitHub/yzwh_website/public/models/drone.glb
```

Add it only if the 2.5D Flight section lacks spatial credibility. If added, create a separate plan for `three` / `@react-three/fiber` dependency, mobile fallback, and canvas verification.

## Dependency Map

```text
Story data
  -> Navbar / text reveal / design tokens
  -> Shared section components
  -> Section-specific components
  -> LandingPage orchestration
  -> Asset replacement
  -> GSAP desktop scrolltelling
  -> Asset QA
  -> Verification
```

## Risks And Mitigations

| Risk | Impact | Probability | Mitigation |
|---|---|---:|---|
| Existing reference site theme leaks through | High | Medium | Replace all LandingPage template copy and remove stats/logo sections in Task 5 |
| Missing assets create blank sections | High | Medium | Use exact `/video/*` and `/images/*` filenames and check console 404s in Task 6 |
| Hero video fails or loads slowly | High | Medium | Task 5 renders a visible poster underlay and keeps it visible on video error |
| Chinese animation looks broken if `BlurText` is reused | Medium | Medium | Task 2 makes `BlurText` optional and character-based; Hero itself uses one semantic `h1` |
| Heavy glass blur hurts mobile | Medium | Medium | Use LiquidGlass only for nav and small overlays; use normal surfaces elsewhere |
| GLB delays first launch | High | Medium | Explicitly defer GLB until after visual baseline passes |
| Scroll story devolves into one-shot reveals | High | Medium | Task 7 requires GSAP/ScrollTrigger pinning and scrubbed progress on desktop |
| Report content becomes inaccessible generated text | High | Medium | Task 4 builds the report as DOM/SVG content and uses raster only for thumbnails |
| Scan and scrub animation causes layout work | Medium | Medium | Animate transform/opacity only; do not animate `left`, `top`, `width`, or `height` |

## Self-Review Checklist

- The plan covers all requested sections: Hero, Invisible Risk, Flight To Insight, Intelligence Layer, Report As Decision, Flagship Case / CTA.
- The first pass requires GSAP/ScrollTrigger for desktop scrolltelling but does not require GLB or Three.js.
- Report core content is DOM/SVG, not generated text inside a raster image.
- Hero media has a visible poster fallback and codec/byte-size budgets.
- Every runtime source file path is exact.
- All asset filenames are exact and map to Vite public URLs.
- The plan includes asset QA, type/build verification, and desktop/mobile visual checks.
