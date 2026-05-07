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
import { ScrollStoryController } from "../components/ScrollStoryController";
import { SectionFrame } from "../components/SectionFrame";
import { assetAlts, assetPaths, heroCopy } from "../data/storySections";

export const LandingPage: React.FC = () => {
  const contactFormAction = import.meta.env.VITE_CONTACT_FORM_ACTION || "/contact";

  return (
    <div className="min-h-[100dvh] bg-[var(--color-ink)] text-white selection:bg-cyan-200/30 selection:text-white">
      <Navbar />
      <ScrollStoryController />

      <section id="hero" className="relative flex min-h-[92dvh] flex-col justify-end overflow-hidden px-5 pb-12 pt-28 md:px-10 lg:px-16">
        <FadingVideo
          src={assetPaths.heroVideo}
          fallbackSrc={assetPaths.heroVideoFallback}
          sources={[
            { src: assetPaths.heroVideoMobile, type: "video/webm", media: "(max-width: 767px)" },
            { src: assetPaths.heroVideoFallback, type: "video/mp4", media: "(max-width: 767px)" },
            { src: assetPaths.heroVideoMp4, type: "video/mp4", media: "(min-width: 768px)" },
            { src: assetPaths.heroVideo, type: "video/webm", media: "(min-width: 768px)" },
          ]}
          className="absolute inset-0 z-0"
          videoClassName="object-[58%_50%] md:object-center"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/16 via-slate-950/20 to-slate-950/82" />
        <div className="absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-t from-[var(--color-ink)] to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start">
          <motion.p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100/70"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
          >
            {heroCopy.eyebrow}
          </motion.p>
          <motion.h1
            className="w-full max-w-6xl font-heading text-[clamp(3.1rem,6.8vw,6.6rem)] leading-[0.96] text-white"
            initial={{ y: 28 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.45, duration: 0.78, ease: "easeOut" }}
            aria-label={`${heroCopy.title}，${heroCopy.subtitle}`}
          >
            <span className="block">{heroCopy.title}</span>
            <span className="mt-3 block text-white/86">{heroCopy.subtitle}</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg"
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.64, duration: 0.78, ease: "easeOut" }}
          >
            {heroCopy.body}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ y: 24 }}
            animate={{ y: 0 }}
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
        className="pin-buffer-section bg-[var(--color-deep)]"
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
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--color-blue)]">合作入口</p>
            <h2 className="mt-5 max-w-3xl font-heading text-4xl leading-tight md:text-7xl">让每一座地标，都被更早一步守护。</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              留下项目位置、建筑类型与联系方式，便于后续接入真实商务邮箱、企微或表单服务。
            </p>
          </div>
          <form id="contact-form" name="inspection-booking" method="post" action={contactFormAction} className="grid gap-4 rounded-[24px] border border-slate-950/10 bg-white p-5 shadow-[0_24px_80px_rgba(7,17,31,0.10)] md:p-7">
            <input type="hidden" name="form-name" value="inspection-booking" />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                项目联系人
                <input name="name" autoComplete="name" required className="rounded-xl border border-slate-950/12 px-4 py-3 font-normal outline-none transition-colors focus:border-[var(--color-blue)]" placeholder="姓名" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                联系方式
                <input name="contact" autoComplete="tel" required className="rounded-xl border border-slate-950/12 px-4 py-3 font-normal outline-none transition-colors focus:border-[var(--color-blue)]" placeholder="电话 / 邮箱 / 企微" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              巡检建筑
              <input name="building" required className="rounded-xl border border-slate-950/12 px-4 py-3 font-normal outline-none transition-colors focus:border-[var(--color-blue)]" placeholder="建筑名称、城市或园区位置" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              需求说明
              <textarea name="message" rows={4} className="resize-none rounded-xl border border-slate-950/12 px-4 py-3 font-normal leading-7 outline-none transition-colors focus:border-[var(--color-blue)]" placeholder="外立面、屋顶、热成像、报告交付等巡检需求" />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="rounded-pill bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]">
                提交巡检需求
              </button>
              <a href="#report" className="rounded-pill border border-slate-950/16 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-950/5">
                查看样例报告
              </a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
