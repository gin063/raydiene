// composables/useNewsData.ts
// 新闻资讯数据源 — 图文公关稿 + 外链
// 后续新增文章只需向 articles 数组追加条目

export type NewsSource = "品牌新闻" | "行业资讯" | "媒体报道";

// 富文本正文的块结构 —— 详情页按块渲染，图片块走真正的 NuxtImg 组件
// 不用 HTML 字符串 + v-html 的原因：v-html 不会编译 Vue 组件，<NuxtImg> 会被当成未知元素静默失效
export type NewsBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "img"; src: string; alt: string; caption?: string };

export interface NewsArticle {
  slug: string;
  title: string;
  summary: string;
  cover: string; // 相对路径，走 NuxtImg aliyun provider
  source: NewsSource;
  date: string; // ISO 日期
  externalUrl?: string;
  body: NewsBlock[]; // 结构化正文块数组
  tags: string[];
  pinned?: boolean;
}

export const useNewsData = () => {
  const articles: NewsArticle[] = [
    {
      slug: "raydiene-panshi-max-launch-2026",
      title: "雷迪恩新品磐石Max上线：专业家用充电桩的“天花板”又高了",
      summary:
        "近日，专业家用充电桩品牌“雷迪恩”，重磅推出全新力作——磐石Max。这款新品在备受市场好评的爆品“磐石”基础之上再度优化升级，凭借智能交互、安全性能与用户体验的全方位跃升，迅速引发行业与消费者的广泛关注。",
      cover: "images/media/news/panshi-max-launch.jpg",
      source: "品牌新闻",
      date: "2026-03-25",
      externalUrl:
        "https://www.163.com/dy/article/KOSHTRN6054758MK.html?referFrom=",
      body: [
        {
          type: "p",
          text: `近日，专业家用充电桩品牌"雷迪恩"，重磅推出全新力作——磐石Max。这款新品在备受市场好评的爆品"磐石"基础之上再度优化升级，凭借智能交互、安全性能与用户体验的全方位跃升，迅速引发行业与消费者的广泛关注。`,
        },
        {
          type: "p",
          text: `作为雷迪恩"磐石系列"的第三次迭代之作，磐石Max的诞生，不仅展现了品牌对极致产品力的不懈追求，更以黑马之姿，再次印证了雷迪恩在家用充电桩领域的专业实力与成长速度。`,
        },
        { type: "h2", text: "从爆品到标杆：不到一年完成三次升级" },
        {
          type: "p",
          text: `在家用充电桩这个赛道，真正愿意沉下心把一款产品"死磕"到极致的品牌并不多见。雷迪恩，正是其中之一。`,
        },
        {
          type: "img",
          src: "images/media/news/panshi-series.png",
          alt: "雷迪恩磐石系列充电桩升级路线",
        },
        {
          type: "p",
          text: `磐石系列的成功并非偶然。初代"磐石"凭借扎实的性能与可靠的品质，上市首年销量即达到数万台，长期稳居各大电商平台充电桩品类TOP10，成为众多家庭用户的首选。在此基础上，雷迪恩并未止步。不到一年时间里，品牌先后推出磐石Pro与全新的磐石Max，完成了从性能优化到体验革新的两次快速迭代。这种迭代速度背后，不仅是品牌技术实力的集中爆发，更是其对"专业家用充电桩"这一身份的极致诠释。`,
        },
        { type: "h2", text: "智能升级：4.3寸大屏开启交互新体验" },
        {
          type: "p",
          text: `磐石Max此次最直观的升级，莫过于新增的智能4.3寸液晶显示屏。这块高清晰度屏幕可实时呈现充电状态、电流电压、充电时长、已充电量等关键信息，充电状态一目了然。这一设计极大提升了日常使用的便捷性，尤其对于家中多个用户或多台车辆的场景，操作更加直观友好。`,
        },
        {
          type: "img",
          src: "images/media/news/panshi-led.png",
          alt: "雷迪恩磐石Max充电桩4.3寸高清智慧屏显",
        },
        {
          type: "p",
          text: `与此同时，磐石Max延续并强化了雷迪恩强大的智能交互能力。产品支持近远程预约充电、分享充电、手机NFC刷卡充电，用户还可通过APP灵活调节电流，实现无感充电。同时，远程OTA功能让设备能够持续获得功能更新与体验优化，真正做到"常用常新"。`,
        },
        { type: "h2", text: "安全为本：3C认证+28重防护" },
        {
          type: "p",
          text: `对于家用充电桩而言，安全始终是用户最关心的问题。磐石Max在安全方面同样延续硬核保障。作为一款远超3C标准的产品，磐石Max达到了IP65整机防尘防水，枪头更是具备IP67加强防护，无惧户外严苛环境。`,
        },
        {
          type: "img",
          src: "images/media/news/panshi-max-protect.png",
          alt: "雷迪恩磐石Max充电桩28重防护设计",
        },
        {
          type: "p",
          text: `配合高达28重安全防护体系，从V0级阻燃、漏电保护、防反接，到过温过冷保护、谐波抑制、防凝露保护等，磐石Max几乎覆盖了家用充电场景中可能遇到的所有隐患。这一套几乎"无死角"的安全体系，让磐石Max在面对极端天气、电网波动、设备异常等复杂场景时，依然能够稳定运行，为家庭充电提供坚实保障。`,
        },
        { type: "h2", text: "权益保障：2+2质保&八大感恩服务&太平洋保险" },
        {
          type: "p",
          text: `雷迪恩在服务上的"温度"更让人动容。磐石Max不仅延续了高达28重安全防护，更在售后上给出了硬核承诺：2年质保期内只换不修，活动期间再叠加2年保修，合计质保4年。同时，设备内置的4G物联网卡，流量终生免费。产品整机由太平洋保险承保。`,
        },
        {
          type: "img",
          src: "images/media/news/panshi-max-3c.png",
          alt: "雷迪恩磐石Max充电桩3C认证",
        },
        {
          type: "p",
          text: `这意味着什么？意味着从你下单的那一刻起，雷迪恩就为你的充电安全兜底。从磐石到磐石Pro，再到磐石Max，雷迪恩告诉我们：真正的专业，就是不断超越自己，把更好的体验交到用户手中。`,
        },
        {
          type: "p",
          text: `从初代磐石的一鸣惊人，到磐石Max的智能进化，雷迪恩用不到一年的时间，证明了其作为专业家用充电桩品牌的深厚底蕴。在新能源汽车驶入千家万户的时代，雷迪恩愿做那个坚定守护用户的"磐石"，用专业与温度，为每一次出行保驾护航。`,
        },
      ],
      tags: ["磐石系列", "新品发布", "磐石Max"],
      pinned: true,
    },
    {
      slug: "raydiene-tuv-certification",
      title: "雷迪恩全系通过 TÜV 莱茵安全认证",
      summary:
        "雷迪恩旗下坚石、磐石、星辰、星耀四大系列充电桩全部通过德国 TÜV 莱茵安全认证，成为国内首批全系达标的家用充电桩品牌。",
      cover: "images/media/news/tuv-certification.jpg",
      source: "品牌新闻",
      date: "2026-03-18",
      body: [
        {
          type: "p",
          text: "近日，国际权威第三方检测认证机构德国 TÜV 莱茵正式向雷迪恩颁发全系产品安全认证证书。",
        },
        { type: "h2", text: "全系达标，行业领先" },
        {
          type: "p",
          text: "此次认证覆盖雷迪恩旗下坚石 Pro、磐石 Pro/Max、星辰、星耀全部在售型号，涵盖 7kW、11kW、21kW 三个功率段。雷迪恩成为国内首批实现全系产品 TÜV 莱茵认证的家用充电桩品牌。",
        },
        { type: "h2", text: "严苛测试，品质保证" },
        {
          type: "p",
          text: "TÜV 莱茵的认证流程涵盖电气安全、温升测试、防水防尘、电磁兼容等数十项严苛指标，确保产品在各种使用场景下的安全可靠性。",
        },
        {
          type: "p",
          text: "雷迪恩将持续以国际一线标准要求自身，为用户提供真正值得信赖的充电解决方案。",
        },
      ],
      tags: ["品质认证", "TÜV莱茵", "安全"],
    },
  ];

  const pinnedArticles = articles.filter((a) => a.pinned);
  const regularArticles = articles.filter((a) => !a.pinned);

  // 全部文章按日期降序（新 → 旧）
  const allSortedByDate = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // 置顶精选：取第一篇 pinned 文章（若无则取最新一篇）
  const featuredArticle = pinnedArticles[0] ?? allSortedByDate[0];

  const findBySlug = (slug: string) =>
    articles.find((a) => a.slug === slug) || null;

  const getRelated = (current: NewsArticle, limit = 3) =>
    articles
      .filter(
        (a) =>
          a.slug !== current.slug &&
          (a.source === current.source ||
            a.tags.some((t) => current.tags.includes(t))),
      )
      .slice(0, limit);

  return {
    articles,
    pinnedArticles,
    regularArticles,
    allSortedByDate,
    featuredArticle,
    findBySlug,
    getRelated,
  };
};
