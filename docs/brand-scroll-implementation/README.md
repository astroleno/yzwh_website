# 云筑万合滚动叙事站实现计划

创建日期：2026-05-07

这个目录把 `docs/brand-scroll-story-brief.md` 和项目根目录里的实际站点实现收束成一组可执行文档。

## 核心结论

- 第一版采用「首尾循环视频 + 2.5D 图层 + SVG/DOM 标注 + 桌面 GSAP/ScrollTrigger + 移动端轻量 reveal」实现，不把整站押在 GLB 或 Three.js 上。
- GLB 只作为二期增强项：优先考虑一个轻量无人机 GLB，用在 `Flight To Insight` 段；不建议第一版制作整栋建筑或城市 GLB。
- 项目根目录已经落成 Vite、React、Tailwind v4、`motion`、`FadingVideo`、`LiquidGlass` 与 `gsap` / `@gsap/react` 的实现。
- 参考站的内容和视觉要大幅替换：去掉太空模板、英文占位文案、统计卡片、合作 logo、紫蓝太空氛围。
- 现有 `docs/assets` 是业务参考素材，不直接作为最终全屏视觉使用；当前 Hero 使用 `/images/pan_view.webp` 作为常驻母场景，桌面主视频为 `/video/hero-4k.mp4`，并保留 `/video/hero.webm`、`/video/hero.mp4` 作为 fallback。最终站点运行资产统一放到 repo 根目录的 `public/` 下。

## 文档索引

- [implementation-plan.md](./implementation-plan.md)：给执行 agent 使用的任务拆解、文件清单、依赖、验证方式。
- [section-motion-spec.md](./section-motion-spec.md)：每个滚动章节的视觉目标、文案、动效和组件落点。
- [asset-manifest.md](./asset-manifest.md)：现有素材用途、生产素材清单、命名规范和 GLB 决策。

## 推荐执行顺序

1. 先实现静态可滚动版本：所有章节、真实中文文案、响应式布局、素材占位稳定。
2. 再实现桌面滚动编排：Flight 使用 GSAP pin + scrub；Report 保持稳定 DOM section，避免与案例段叠层。
3. 最后补齐和优化运行资产：Hero 母场景和视频层已到位，桌面优先 4K H.264 MP4，移动端走轻量视频；继续生成风险立面、航线背景、报告缩略图、案例图层，并压缩上线版本。
4. 若第一版体验稳定，再评估是否加入无人机 GLB。
