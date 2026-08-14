# One Wish Willow｜一愿柳

> 愿望一定会实现，但结果未必如你所愿。  
> Your wish will come true. The outcome may not be what you meant.

[中文](#中文介绍) · [English](#english) · [在线体验](https://one-wish-willow-lyart.vercel.app/) · [产品需求文档](./docs/PRD.md) · [产品迭代复盘](./docs/PRODUCT_ITERATION.md) · [产品案例](./docs/PRODUCT_CASE_STUDY.md) · [迭代路线](./docs/ROADMAP.md)

## 中文介绍

One Wish Willow 是一款受恐怖电影《痴迷》（*Obsession*）核心道具“一愿柳”启发的非官方 AI 互动许愿网站。

影片中，Bear 折断一愿柳，许愿 Nikki 爱自己胜过任何人。愿望确实实现，但 Nikki 的爱逐渐演变为失控的病态痴迷，并引发一系列悲剧。本项目将这套设定转化为可参与的数字体验：用户亲自许下愿望、折断柳枝，并看到愿望如何以意料之外的方式成真。

### 产品定位

普通 AI 产品通常是“输入问题—获得答案”。一愿柳将一次文本生成重构为具有情绪铺垫的互动仪式：

1. 打开一愿柳包装盒；
2. 输入唯一的愿望；
3. 长按柳枝直至折断；
4. 等待一愿柳解读愿望；
5. 获得“愿望成真 + 意外代价”的结果。

产品不是随机制造灾难，也不是故意拒绝愿望。AI 必须先实现用户的愿望，再从愿望中未被限定的边界、规模或实现方式里推导后果，让用户产生“它确实实现了，但这不是我真正想要的”这一瞬间。

### 产品亮点

- **热点产品化：** 将《痴迷》爆火后观众对一愿柳的关注转化为可体验产品。
- **仪式化交互：** 通过开盒、输入、长按折断、等待和揭晓建立完整情绪曲线。
- **AI 生成策略：** 接入 DeepSeek `deepseek-v4-flash`，按照“先兑现、再揭示代价”的规则生成结果。
- **中英文适配：** 根据愿望的主要语言输出结果，主要语义为中文的混合输入优先使用中文。
- **异常降级：** 模型不可用或返回为空时展示策划兜底结果，保证折断后一定出现结局。
- **安全架构：** 模型密钥仅保存在服务端环境变量中，不暴露给浏览器。
- **无障碍体验：** 支持触屏、鼠标和键盘操作，并适配移动端及减少动态效果偏好。
- **双区域部署：** `main` 分支部署至 Vercel；`腾讯云` 分支服务中国大陆访问场景。

### AI 解释逻辑

```text
识别用户真正想获得的结果
            ↓
找到未说明的边界或隐藏假设
            ↓
明确让愿望实现
            ↓
推导与愿望直接相关的意外代价
```

Bear 的愿望是产品判断基准：Nikki 的确爱他胜过任何人，但 Bear 没有限定这份爱的健康程度和边界。结果不是随机惩罚，而是愿望本身被推向极端后的直接后果。

### 技术架构

```text
单页互动前端
      ↓
POST /api/wish
      ↓
Serverless Function
      ↓
DeepSeek deepseek-v4-flash
      ↓
愿望实现及其意外后果
      └── 接口异常 → 本地策划兜底结果
```

### 上线验证与 Prompt 迭代

截至统计截图，产品累计产生 **326 次 API 请求、处理 262,855 Tokens**。这组数据代表模型调用量，不等同于独立用户数或转化率。

首版以海外部署为起点，系统 Prompt 主要使用英文。朋友试玩后发现，中文结果存在表达不自然、篇幅过长和场景不匹配等问题，部分用户体验一次后没有继续使用。我据此加入中文本地化规则，补强混合语言判断、约 100 字长度限制、愿望因果关系和娱乐型场景处理。输出相关性改善后，观察到 API 请求增长速度明显加快；由于尚未保留完整的分日数据，暂不宣称具体增长比例。详细过程见[产品迭代复盘](./docs/PRODUCT_ITERATION.md)。

下一阶段重点验证：

- 首屏 → 开盒 → 提交 → 折断 → 结果的分步完成率；
- AI 成功率、降级率与 p50/p95 响应时间；
- 愿望实现度、因果相关性与语言匹配评分；
- 重玩、分享意愿及双区域访问表现。

### 部署策略

| 用户区域 | 分支 | 平台 | 用途 |
|---|---|---|---|
| 全球 | `main` | Vercel | 主生产环境与 Serverless API |
| 中国大陆 | `腾讯云` | 腾讯云 | 国内访问与区域部署适配 |

## English

One Wish Willow is an unofficial, fan-made AI wish experience inspired by the mysterious prop in Curry Barker’s horror film *Obsession*.

In the film, Bear wishes for Nikki to love him more than anyone. His wish comes true, but Nikki’s love becomes an uncontrollable obsession. This project turns that premise into an interactive website: make one wish, break the willow, and discover how getting exactly what you asked for can still go terribly wrong.

### Key features

- A five-stage ritual: unbox, wish, break, wait, and reveal.
- DeepSeek `deepseek-v4-flash` generation based on literal fulfillment and causal consequences.
- Chinese and English language matching.
- Curated fallbacks when the model endpoint fails.
- Touch, pointer, keyboard, responsive-layout, and reduced-motion support.
- Server-side credential isolation.
- Vercel deployment for global access and a Tencent Cloud branch for mainland China.

### Product validation

As of the supplied usage snapshot, the MVP recorded **326 API requests and 262,855 processed tokens**. Early playtests exposed outcomes that did not consistently follow the One Wish Willow premise. I revised the prompt constraints, language rules, and examples in GitHub; more accurate outcomes were followed by visibly faster API-request growth. These figures measure model usage rather than unique users or conversion.

## 免责声明 / Disclaimer

本项目是用于学习与作品集展示的非官方粉丝创作，与影片制作方、版权所有者、发行方或官方一愿柳商品不存在隶属、授权或商业合作关系。《痴迷》、相关角色及标识的权利归各自权利人所有。

This is an unofficial fan-made project created for educational and portfolio purposes. It is not affiliated with, endorsed by, or sponsored by the filmmakers, rights holders, distributors, or official One Wish Willow merchandise. *Obsession*, its characters, and related marks belong to their respective owners.
