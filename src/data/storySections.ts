export const assetPaths = {
  heroVideo: "/video/hero.webm",
  heroVideoMobile: "/video/hero-mobile.webm",
  heroVideoFallback: "/video/hero.mp4",
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
