# 云筑万合滚动叙事站资产清单

## 资产策略

第一版把现有截图作为参考和临时占位，不把它们当最终视觉。原因很简单：这些素材带字幕、无人机 UI、品牌水印和视频帧构图，直接全屏使用会削弱 Apple-like 的品牌质感。

最终站点生产资产统一放在 repo 根目录的 `public/` 下：

```text
/Users/aitoshuu/Documents/GitHub/yzwh_website/public/
```

代码里使用 public 路径：

```text
/video/hero-4k.mp4
/video/hero.webm
/video/hero-mobile.webm
/video/hero.mp4
/images/risk-facade.jpg
/images/flight-building.jpg
/images/intelligence-facade.jpg
/images/report-aerial-thumb.jpg
/images/report-thermal-thumb.jpg
/images/report-facade-thumb.jpg
/images/science-museum-case.jpg
```

第一版运行时图片格式统一为 JPG，路径必须和上面完全一致。暂不实现 AVIF/WebP `picture/srcset` 分支；如果二期要做多格式，再新增完整编码、引用和 QA 清单。

## 当前 Hero 视频状态

已到位文件：

```text
/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero-4k.mp4
/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero.webm
/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero-mobile.webm
/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero.mp4
```

已检查参数：

```text
desktop primary codec: h264
desktop fallback codec: vp9
size: 3840x2160
pixel format: yuv420p
frame rate: 24fps
duration: 15.00s
desktop MP4 file size: 9.65MB
desktop WebM file size: 9.37MB
audio: none
```

视觉判断：城市公共建筑主体明确，航拍推进和蓝色扫描光符合 Hero 方向，适合作为首屏视频。运行时桌面优先播放 4K H.264 MP4，降低 VP9 4K 解码卡顿风险；4K WebM 保留为后备，不使用 hero poster 或图片占位层。

## 现有参考素材

| 文件 | 用途 | 不直接成片原因 |
|---|---|---|
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/docs/assets/opening-aerial.jpg` | Hero 和案例段的城市尺度、深圳科学馆空间关系参考 | 有字幕、水印、视频帧锐度不足 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/docs/assets/thermal-ui.jpg` | 热成像色彩、无人机巡检 UI、采集状态参考 | 原始 UI 太重，不适合作为品牌站主视觉 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/docs/assets/report-spread.jpg` | 报告内容结构、病害框选、屋顶视角参考 | 拼贴感强，不够高级，需要重新设计报告界面 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/docs/assets/material-demo.jpg` | 材料病害解释、纸皮石脱落纹理参考 | 人手和桌面画面过于纪实，适合转译为材质局部 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/docs/assets/video-contact-sheet.jpg` | 全流程镜头、四幕案例结构、业务闭环参考 | 接触表只用于研究，不用于页面展示 |

## 第一版生产资产

| 目标文件 | 类型 | 推荐尺寸 | 使用章节 | 生产说明 |
|---|---|---:|---|---|
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero-4k.mp4` | MP4 | 3840x2160 | Hero desktop primary | 已到位。H.264、24fps、无音轨、约 9.65MB；桌面首选，`faststart` |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/hero.webm` | WebM | 3840x2160 | Hero desktop fallback | 已到位。VP9、24fps、无音轨、约 9.37MB；不作为桌面首选 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/risk-facade.jpg` | JPG | 2200x1400 | Invisible Risk | 干净建筑外立面近景，留足标注空间；可参考 `report-spread.jpg` 的外墙材质 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/flight-building.jpg` | JPG | 2200x1400 | Flight To Insight | 俯瞰或三分之二角度建筑图，适合叠加航线和采集点 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/intelligence-facade.jpg` | JPG | 1800x1200 | Intelligence Layer | 正立面或局部立面，适合 AI 框选和风险标签 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/report-aerial-thumb.jpg` | JPG | 1200x800 | Report As Decision | 报告 DOM 中的建筑定位缩略图，不承载生成文字 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/report-thermal-thumb.jpg` | JPG | 1200x800 | Report As Decision | 报告 DOM 中的热成像缩略图，不承载生成文字 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/report-facade-thumb.jpg` | JPG | 1200x800 | Report As Decision | 报告 DOM 中的病害标注缩略图，不承载生成文字 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/images/science-museum-case.jpg` | JPG | 2200x1400 | Flagship Case | 深圳科学馆案例主图，必须来自已验证源帧/照片，只允许裁切、去字幕水印、调色和轻量修复；严禁纯文本自由生成深圳科学馆外观 |

## 可选二期 GLB 资产

第一版不依赖这些文件。只有在静态/2.5D 版本完成并通过视觉验证后才加入。

| 目标文件 | 类型 | 使用章节 | 加入条件 |
|---|---|---|---|
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/models/drone.glb` | GLB | Flight To Insight | 需要真实三维绕行时加入；文件体积控制在 1.5MB 以内 |
| `/Users/aitoshuu/Documents/GitHub/yzwh_website/public/models/facade-shell.glb` | GLB | Hero 或 Invisible Risk | 只有当 2.5D 立面深度不够时加入；不做完整城市模型 |

## 生成提示方向

### Hero Loop

```text
现代中国城市公共建筑，类似科学馆或文化建筑，清晨柔和自然光，高层城市背景克制，镜头极慢推进，建筑立面有非常细的青绿色扫描光，真实摄影质感，干净、可信、低饱和、无字幕、无水印、无 UI、无 logo
```

### Risk Facade

```text
现代建筑外立面近景，浅灰石材或金属板幕墙，少量窗带，真实材质细节，局部存在细微渗漏、空鼓、脱落风险痕迹，但整体画面干净克制，适合叠加检测标注，无文字、无水印、无人物
```

### Report Thumbnails

```text
生成 3 张用于 DOM 报告界面的证据缩略图：建筑定位航拍、热成像异常、外立面病害标注。图片中不要出现可读文字、标题、表格、logo、水印或生成报告正文；报告标题、摘要、风险等级和结论必须由网页 DOM/SVG 实现。
```

### 深圳科学馆案例图

```text
输入角色：edit target = /Users/aitoshuu/Documents/GitHub/yzwh_website/docs/assets/opening-aerial.jpg 或从 /Users/aitoshuu/Documents/GitHub/yzwh_website/public/video/source/hero-source-4k-audio.mp4 导出的深圳科学馆源帧。
只做去字幕、去水印、调色、裁切、锐化和轻量背景清理。必须保留建筑几何、屋顶轮廓、立面关系、周边道路和城市空间关系。不得根据文字提示重新虚构一座“类似科学馆”的建筑。
```

## 验收标准

- 所有最终图片没有字幕、水印、明显视频 UI 或无关人物。
- 所有报告核心内容以 DOM/SVG 文字实现；位图只作为证据缩略图或材质图。
- 第一版运行时图片全部为 JPG，路径以 `/images/*.jpg` 为准；不存在未接入的 WebP/AVIF 旁路格式。
- Hero 视频循环点不可感知，首帧和尾帧亮度、镜头位置、扫描光状态连续。
- Hero 桌面主视频为 `/video/hero-4k.mp4`：H.264、yuv420p、4K、24fps、无音轨、10MB 以内、`faststart`；`/video/hero.webm` 只作为 VP9 后备。
- `science-museum-case.jpg` 必须能追溯到已验证源图或源帧，并通过人工对照：建筑几何、屋顶轮廓、立面比例和周边关系不得被生成模型改写。
- 移动端可以使用同一素材裁切，不出现关键建筑主体被完全裁掉。
- GLB 若加入，移动端必须有纯图片/SVG fallback。
