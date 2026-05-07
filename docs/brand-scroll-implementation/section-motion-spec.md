# 云筑万合滚动叙事站 Section / Motion Spec

## 总体节奏

页面是一条从「看不见」到「可决策」的叙事链：

```text
Hero -> Invisible Risk -> Flight To Insight -> Intelligence Layer -> Report As Decision -> Flagship Case / CTA
```

每一段只承担一个任务：

- Hero：建立品牌高度。
- Invisible Risk：把问题变得可感知。
- Flight To Insight：解释无人机是感知入口，桌面必须是 pinned scrubbed scroll scene。
- Intelligence Layer：解释影像如何被识别、定位、解释。
- Report As Decision：把交付物提升为决策依据，报告核心内容必须由 DOM/SVG 承载。
- Flagship Case / CTA：用深圳科学馆做信任锚点，并导向合作。

## 视觉基调

克制、可信、城市工程感。不是无人机玩具站，也不是满屏 dashboard。主色以深蓝灰、雾白、玻璃青为基础，热成像色只作为局部信号色。

推荐色值：

```css
--color-ink: #07111f;
--color-deep: #101b2b;
--color-steel: #213246;
--color-blue: #2e5c97;
--color-cyan: #60d2be;
--color-mist: #f3f6fa;
--color-line: rgba(216, 224, 232, 0.32);
```

## Hero

**目的**：第一屏让用户记住品牌和上层定位，而不是解释功能。

**主文案**：

```text
云筑万合
城市地标的隐形守护系统
```

**辅助文案**：

```text
以无人机、AI 识别、热成像与工程分析，为建筑建立更早一步的健康感知。
```

**视觉**：

- 全屏首尾循环视频 `/video/hero.webm`（桌面 4K）。
- 文案左下或偏左下，避开视频主体高亮区域；主品牌陈述必须是单个语义 `h1`，宽容器、起始对齐。
- 移动端视频和 poster 使用同一组 `object-position` 裁切类，先按 `object-[58%_50%] md:object-center` 执行，再用 390x844 和桌面截图复核建筑主体。
- 不放统计卡片、logo 列表、功能标签堆。
- 底部露出下一节 8-12vh，让滚动叙事有牵引。

**动效**：

- 初载：视频先出现，品牌名 300ms 后淡入。
- 循环：扫描光和镜头轻微漂移。
- 下滚：hero 文案淡出，视频压暗，第一枚风险标注在画面下缘出现。

**组件落点**：

- `FadingVideo` 负责视频循环和淡入。
- `LandingPage.tsx` 负责 Hero 结构。
- Hero 资产已放入 `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero.webm`，代码里使用 `/video/hero.webm`（桌面 4K）。

## Invisible Risk

**目的**：把「隐形风险」变成用户能直观看到的问题。

**主文案**：

```text
真正的建筑风险，往往不在显眼处。
```

**辅助文案**：

```text
外立面空鼓、脱落、渗漏与热异常，常常先以微小变化隐藏在材料深处。
```

**视觉**：

- 使用 `risk-facade.jpg` 做主画面。
- 标注点直接贴在建筑表面，不使用普通 icon card。
- 风险标签控制在 4 个：空鼓、脱落、渗漏、热异常。
- 每个风险点在数据层必须带 `side: "left" | "right"`，移动端不能靠固定 `ml` 推标签；最右侧点默认向左展开，防止窄屏溢出。

**动效**：

- 滚动进入后，立面从自然光逐渐叠加一层诊断光。
- 四个标注按顺序出现，出现后保持极轻微 pulse。
- 标签随主图有 1-2px 的 parallax 漂移，制造贴合表面感。

**组件落点**：

- `RiskAnnotations.tsx` 渲染风险点和标签。
- `storySections.ts` 保存风险点坐标、标签和等级。

## Flight To Insight

**目的**：无人机不是噱头，而是建筑健康感知的数据入口。

**主文案**：

```text
从一次飞行，到一套可判断的建筑数据。
```

**辅助文案**：

```text
航线、采集点、可见光与热成像数据被组织成可追溯的建筑感知层。
```

**视觉**：

- 使用 `flight-building.jpg` 作为建筑空间底图。
- 用 SVG path 绘制航线。
- 用 CSS/SVG 小型无人机轮廓或轻量图片模拟飞行点。
- 第一版不强依赖 GLB。

**动效**：

- 桌面章节由 GSAP/ScrollTrigger pin 住，滚动距离建议 180-220vh。
- 滚动前 35% 绘制航线。
- 滚动 35%-70% 点亮采集点。
- 滚动 70%-100% 叠加可见光、热成像、局部细节三层数据 chip。
- 移动端不 pin，改为正常文档流中的短 reveal。
- 桌面 GSAP timeline 必须显式设置 `route`、`points`、`data` 三个 label，位置分别为 `0`、`0.35`、`0.70`。
- DOM targets 必须完整：`data-flight-route`、`data-flight-point`、`data-flight-drone`、`data-flight-layer`；不能只做路线和数据层。

**组件落点**：

- `FlightPathScene.tsx` 负责航线、采集点、图层 DOM 和移动端 fallback。
- `ScrollStoryController.tsx` 负责桌面 GSAP pin、scrub 和 scoped cleanup；只清理自己创建的 timeline / ScrollTrigger，不调用全局 `ScrollTrigger.getAll().forEach(kill)`。
- 二期如加入 GLB，再单独新增 `DroneModel.tsx`，不要把 GLB 逻辑塞进 `FlightPathScene.tsx`。

## Intelligence Layer

**目的**：讲 AI 识别和专业工程判断，不做功能堆砌。

**主文案**：

```text
影像被识别，问题被定位，风险被解释。
```

**辅助文案**：

```text
系统先定位异常，再由工程经验复核成因、范围与维护优先级。
```

**视觉**：

- 使用 `intelligence-facade.jpg` 做一张主影像平面。
- AI 框选逐步出现，最终收束成 3 条判断信息。
- 不做满屏 dashboard，不堆数字。

**动效**：

- scan bar 从左到右扫过影像，只能用 `transform` / `x` 动画，不动画 `left`。
- 框选按「疑似 -> 确认 -> 归类」出现。
- 右侧结论栏只显示：问题类型、位置、风险等级、工程复核。

**组件落点**：

- `IntelligencePanel.tsx` 负责影像读取、框选和判断栏。
- `storySections.ts` 保存检测框坐标和标签。

## Report As Decision

**目的**：把「报告」提升为「可行动的建筑健康证据」。

**主文案**：

```text
不是一组照片，而是一份可行动的建筑健康证据。
```

**辅助文案**：

```text
现场影像、热成像、病害位置和工程结论，被整理成可追溯、可沟通、可执行的报告。
```

**视觉**：

- 使用 DOM/SVG report mock；位图只作为航拍、热成像、病害标注缩略图。
- 信息从左侧/上方汇入报告：航拍图、热成像、病害标注、结论摘要。
- 报告标题使用 `建筑环境安全分析报告`。

**动效**：

- 检测图层飞入报告版式。
- 标注线对齐到报告图位。
- 最终页面停止在完整报告上，背景变浅，给用户呼吸感。

**组件落点**：

- `ReportSequence.tsx` 负责 DOM/SVG 报告结构和移动端 fallback。
- `ScrollStoryController.tsx` 负责桌面报告汇聚的 pin + scrub 编排。

## Flagship Case / CTA

**目的**：用深圳科学馆作为真实案例锚点，并回到合作入口。

**标题**：

```text
深圳科学馆建筑健康巡检
```

**四幕**：

```text
建筑定位 -> 巡检路径 -> 风险发现 -> 报告交付
```

**收尾文案**：

```text
让每一座地标，都被更早一步守护。
```

**CTA**：

```text
预约建筑健康巡检
查看样例报告
```

**视觉**：

- 不做普通案例卡片。
- 案例做成故事板：同一建筑，不同信息层替换。
- 案例主图必须来自已验证深圳科学馆源帧/照片，只能编辑、裁切和修复，不能纯文本生成一个相似建筑。
- CTA 是沉稳的品牌落点，不做销售横幅。

**动效**：

- 四幕随滚动切换，每幕保留同一建筑锚点。
- 进入 CTA 时所有技术 UI 收束，只留下建筑、品牌和行动按钮。

**组件落点**：

- `CaseStoryboard.tsx` 负责四幕。
- `LandingPage.tsx` 负责最终 CTA。

## 移动端策略

- Hero 使用 `min-height: 92dvh` 留出下一节提示；section 使用 `100dvh/svh/dvh` 稳定移动端视口。
- Hero 使用同一视频，但通过 `object-position` 保住建筑主体，并始终显示 poster fallback。
- Sticky 滚动段在移动端改为短 section 叠加 reveal，避免长 pin 造成卡顿。
- 标注点数量保持 4 个以内。
- LiquidGlass 降低 blur 强度或不用，用半透明深色面替代。
- 若二期加入 GLB，移动端默认关闭 GLB，使用 SVG 无人机或图片帧。
