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
    <div data-scroll-scene="report" className="story-media relative z-30 isolate w-full overflow-hidden rounded-[28px] bg-[var(--color-mist)] p-6 text-slate-950 md:p-10">
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
