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

// 标题中作者手动插入的换行（以 \n 表达）在 <h1> 渲染为 <br>，
// 但 alt / SEO meta / JSON-LD 这些纯文本场景需要用空格替换，避免 \n 污染属性值
export const plainTitle = (title: string) => title.replace(/\n/g, " ");

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
      title: "雷迪恩新品磐石Max上线：\n专业家用充电桩的“天花板”又高了",
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
      slug: "raydiene-reward-2025",
      title: "增幅300%！\n雷迪恩，重新定义黑马速度",
      summary:
        "雷迪恩仅用一年时间便从籍籍无名跃居行业前十，并在2025双十一大促中，以300%的同比增速成为行业中最亮眼的一匹黑马。",
      cover: "images/media/news/raydiene-reward-2025.jpg",
      source: "品牌新闻",
      date: "2026-03-02",
      externalUrl:
        "https://tech.china.com/articles/20260302/202603021817463.html",
      body: [
        {
          type: "p",
          text: "新能源汽车保有量的飙升为充电桩市场带来了千亿级需求，同时也引爆了一场残酷的“淘汰赛”。2025年，车企纷纷入局引发价格战、行业加速洗牌，充电桩市场格局生变。然而新势力品牌雷迪恩却在极度内卷的充电桩赛道，跑出了令人咋舌的“加速度”——仅用一年时间便从籍籍无名跃居行业前十，并在2025双十一大促中，以300%的同比增速成为行业中最亮眼的一匹黑马。",
        },
        {
          type: "img",
          src: "images/media/news/raydiene-jd-reward.png",
          alt: "雷迪恩2025年双十一京东充电桩品类销售同比增长300%战报",
        },
        {
          type: "p",
          text: "国家能源局最新数据显示，2025年我国充电设施规模已突破2000万台大关，车桩比逼近2:1，持续向2030年目标1:1全速推进。但在这一数字背后，是极度内卷的存量博弈。雷迪恩的突围绝非偶然，而是源于对市场痛点的精准打击。通过拆解其增长路径，可以清晰地看到五大核心驱动力。",
        },
        { type: "h2", text: "1. 切口精准：做“专业家用充电桩品牌”" },
        {
          type: "p",
          text: "不同于传统大厂的“全场景覆盖”，雷迪恩旗帜鲜明地切入家用充电桩赛道，避开了与巨头在B端公共桩的正面博弈，专注于解决家庭用户的“最后一米”补能焦虑，迅速在用户心智中建立了“家用充电桩就选雷迪恩”的强关联。让其在巨头环伺的缝隙中，获得了宝贵的生长空间。",
        },
        {
          type: "img",
          src: "images/media/news/raydiene-family-scene.png",
          alt: "雷迪恩家用充电桩入驻家庭车库的生活化场景",
        },
        { type: "h2", text: "2.	科技破局：顶配硬件解锁充电新体验" },
        {
          type: "p",
          text: "雷迪恩以科技创新为核心驱动力，凭借硬核硬件与前瞻性科技打造了行业首款7寸触控大屏充电桩——星耀系列。此系列充电桩具备语音播报、实时充电状态监测、远程控制一键触达等智能功能；融汇中德顶尖配件：德国百年品牌赛特乐继电器提供稳定可靠保障，兆易创新 MCU 确保高效运算处理，金升阳模块电源实现稳定电力供应，菲尼克斯枪头保障充电安全……通过“顶级硬件+场景化智能”，星耀系列充电桩不仅满足了用户对基础充电的需求，更以科技赋能，为用户带来了更加便捷、安全的充电体验。",
        },
        {
          type: "img",
          src: "images/media/news/raydiene-charging-scene.png",
          alt: "雷迪恩星耀系列7寸触控大屏充电桩为新能源汽车补能",
        },
        { type: "h2", text: "3.	产品逻辑：拒绝“机海战术”，以一敌十" },
        {
          type: "p",
          text: "竞品疯狂铺设SKU试图以量取胜，结果导致供应链分散、品控参差不齐。雷迪恩反其道而行之，坚持“少即是多”的爆品逻辑。“与其做十款普通的产品，不如把一款产品做到极致。”雷迪恩产品负责人表示。通过将研发资源高度集中，打穿一款核心产品，雷迪恩在安全性、兼容性和智能化上建立了极高的壁垒，让这款单品成为了真正的“六边形战士”",
        },
        {
          type: "img",
          src: "images/media/news/raydiene-618-reward.png",
          alt: "雷迪恩磐石充电桩2025年618大促千元价位段销量登顶",
        },
        {
          type: "p",
          text: "雷迪恩爆款磐石充电桩便是这一逻辑的最好验证：上线不到半年便冲至主流电商平台充电桩热销榜首，并在2025年内完成两次“自我迭代”：先是基于人体工学优化插枪角度与加长枪线推出磐石Pro，再是叠加智能屏显完成“磐石Max的研发。这种“以质破量”的打法，不仅规避了粗放铺货的资源内耗，更让雷迪恩凭借极致单品突围存量博弈。",
        },
        { type: "h2", text: "4.	服务升维：构建从产品到服务的商业闭环" },
        {
          type: "p",
          text: "“安装难、售后难、维修慢”是困扰车主的行业顽疾。雷迪恩提出的“八大感恩服务”并非营销噱头，而是对商业模式的重构。雷迪恩认为，充电桩交付给用户时只是一个半成品，只有完成专业的勘测、合规安装、甚至后期的运维，才算交付了一个完整的商品。",
        },
        {
          type: "img",
          src: "images/media/news/raydiene-install-scene.png",
          alt: "雷迪恩专业工程师上门勘测并为用户安装家用充电桩",
        },
        {
          type: "p",
          text: "这种“重服务”模式虽然前期成本高，但构建了极高的竞争壁垒——硬件参数易被像素级复制，但标准化的服务体系与交付能力却难以速成。",
        },
        { type: "h2", text: "5.	颜值革命：让充电桩成为“车库软装”" },
        {
          type: "p",
          text: "如果说前几点是内功，那么“颜值”就是雷迪恩最锋利的外功。雷迪恩敏锐捕捉到2025年家装美学趋势，将极简主义与工业美学注入充电桩设计。这一举措直接击中了新中产的痛点——充电桩不再是工具，而是车库里的“软装艺术品”，在小红书等社交平台引发了自发种草狂潮。",
        },
        {
          type: "img",
          src: "images/media/news/raydiene-xiaohongshu-share.png",
          alt: "小红书用户自发分享雷迪恩充电桩车库美学安装实拍",
        },
        {
          type: "p",
          text: "雷迪恩的异军突起，并非偶然——它是新能源基础设施告别粗放扩张、步入精耕细作的一声清晰回响。当千万家庭选择将车库的第一台桩交给雷迪恩，他们买的不仅是一个充电设备，更是对“品牌信任、工业美学、服务闭环”的综合投票。在2025年这个分水岭，雷迪恩用一年时间证明：竞争的终点不是把价格打下来，而是把价值做上去，从“价格战”的泥潭，迈向“价值战”的高地。",
        },
        {
          type: "p",
          text: "站在2026年的新起点上，雷迪恩的目光投向了更浩瀚的星辰大海：一是横向延展，围绕“车生活”生态圈挖掘存量价值；二是纵向出海，在全球市场寻找增量空间。雷迪恩的故事，序章刚过，正文开篇。",
        },
      ],
      tags: ["双十一战报", "品牌成长", "行业洞察", "磐石系列"],
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
