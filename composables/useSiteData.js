// composables/useSiteData.js

export const useSiteData = () => {
  // 1. 顶部菜单数据 (原 Header 数据)
  const menuItems = [
    {
      name: "关于我们",
      type: "mega",
      image: "/images/about/about-bg.jpg",
      children: [
        {
          name: "企业简介",
          link: "/about/intro",
          image: "/images/about/intro-bg.jpg",
          desc: "始于创新，忠于品质，致力成为全球信赖的能源伙伴。",
        },
        {
          name: "企业文化",
          link: "/about/culture",
          image: "/images/about/culture-bg.jpg",
          desc: "不仅是制造者，更是绿色出行生活方式的倡导者。",
        },
        {
          name: "企业资讯",
          link: "/",
          image: "/images/about/news-bg.jpg",
          desc: "探索RAYDIENE最新动态与行业前沿。",
        },
      ],
    },
    {
      name: "产品介绍",
      type: "mega",
      image: "/images/products/mobile-menu-header.jpg",
      children: [
        {
          name: "在售产品",
          type: "grid",
          series: [
            {
              name: "坚石系列",
              image: "/images/products/jianshi.png",
              products: [
                {
                  name: "坚石",
                  link: "/products/jianshi",
                  image: "/images/products/jianshi.png",
                },
              ],
            },
            {
              name: "磐石系列",
              image: "/images/products/panshi-pro.png",
              products: [
                {
                  name: "磐石Pro",
                  link: "/products/panshi?model=pro",
                  image: "/images/products/panshi-pro.png",
                },
                {
                  name: "磐石Max",
                  link: "/products/panshi?model=max",
                  image: "/images/products/panshi-max.png",
                },
              ],
            },
            {
              name: "星辰系列",
              image: "/images/products/xingchen.png",
              products: [
                {
                  name: "星辰",
                  link: "/products/xingchen",
                  image: "/images/products/xingchen.png",
                },
              ],
            },
            {
              name: "星耀系列",
              image: "/images/products/xingyao.png",
              products: [
                {
                  name: "星耀",
                  link: "/products/xingyao",
                  image: "/images/products/xingyao.png",
                },
              ],
            },
          ],
        },
        {
          name: "产品路线图",
          link: "/products/roadmap",
          image: "/images/products/roadmap-bg.jpg",
        },
      ],
    },
    {
      name: "产品服务",
      type: "mega",
      image: "/images/service/service-bg.jpg",
      children: [
        {
          name: "安装服务",
          link: "/service/install",
          image: "/images/service/install-bg.jpg",
        },
        {
          name: "售后服务",
          link: "/service/aftersales",
          image: "/images/service/aftersales-bg.jpg",
        },
      ],
    },
    {
      name: "下载中心",
      image: "/images/download/mobile-menu-header.jpg",
      type: "mega",
      children: [
        {
          name: "App下载",
          link: "/download/apps",
          image: "/images/download/app-bg.jpg",
          desc: "雷迪恩智能 App，掌控您的充电生活。",
        },
        {
          name: "说明书下载",
          link: "/download/manual",
          image: "/images/download/manual-bg.jpg", // 记得在 public 放这张图，用于 Header 右侧预览
          desc: "获取雷迪恩全系产品使用指南与技术文档。",
        },
      ],
    },
    {
      name: "联系我们",
      type: "mega",
      image: "/images/contact/contact-bg.jpg",
      children: [
        {
          name: "联系方式",
          link: "/contact/info",
          image: "/images/contact/info-bg.jpg",
        },
        {
          name: "官方渠道",
          link: "/contact/official",
          image: "/images/contact/official-bg.jpg",
        },
        { name: "加入我们", link: "/", image: "/images/contact/join-bg.jpg" },
      ],
    },
  ];

  // 2. 底部社交数据 (原 Footer 数据 - 已回退到 img 版本)
  const socialLinks = [
    {
      name: "京东旗舰店",
      icon: "/images/social/jd.svg",
      url: "https://mall.jd.com/index-13360593.html",
      mobileUrl: "https://shop.m.jd.com/?shopId=13360593",
      qr: "/images/qrcode/qr-jd.png",
      filterClass: "filter brightness-0 invert opacity-40",
      padding: "p-0",
      offset: "translate-y-[1px]",
    },
    {
      name: "天猫旗舰店",
      icon: "/images/social/tmall.svg",
      url: "https://leidienqcyp.tmall.com/",
      mobileUrl: "https://leidienqcyp.m.tmall.com/",
      qr: "/images/qrcode/qr-tmall.png",
      filterClass: "filter brightness-0 invert opacity-40",
      padding: "p-1",
    },
    {
      name: "抖音旗舰店",
      icon: "/images/social/douyin.svg",
      url: "https://www.douyin.com/user/MS4wLjABAAAAs_dJCXRyzllTiEdFGrZZ1_e_gOzM9LgcsdIFD0kzZZdlr05ibuu4KQgd7Fviz7Wm",
      mobileUrl:
        "https://m.douyin.com/share/user/MS4wLjABAAAAs_dJCXRyzllTiEdFGrZZ1_e_gOzM9LgcsdIFD0kzZZdlr05ibuu4KQgd7Fviz7Wm",
      qr: "/images/qrcode/qr-douyin.png",
      filterClass: "filter brightness-0 invert opacity-40",
      padding: "p-1",
      offset: "translate-x-[4px] translate-y-[2px]",
    },
    {
      name: "拼多多旗舰店",
      icon: "/images/social/pdd.svg",
      url: "https://mobile.pinduoduo.com/mall_page.html?mall_id=141717566",
      mobileUrl:
        "https://mobile.pinduoduo.com/mall_page.html?mall_id=141717566",
      qr: "/images/qrcode/qr-pdd.png",
      filterClass: "filter brightness-0 invert opacity-40",
      padding: "p-1",
      offset: "translate-y-[2px]",
    },
    {
      name: "小红书",
      icon: "/images/social/xhs.svg",
      url: "https://www.xiaohongshu.com/user/profile/65a87c94000000000803da00",
      mobileUrl:
        "https://www.xiaohongshu.com/user/profile/65a87c94000000000803da00",
      qr: "/images/qrcode/qr-xhs.png",
      filterClass: "filter brightness-0 invert opacity-40",
      padding: "p-0",
      offset: "translate-y-[1px]",
    },
    {
      name: "微信服务号",
      icon: "/images/social/wechat.svg",
      url: "#",
      mobileUrl: "#",
      qr: "/images/qrcode/qr-weixin.png",
      filterClass: "filter brightness-0 invert opacity-40",
      padding: "p-1",
      offset: "translate-y-[2px]",
    },
  ];

  // 3. 通用联系方式 (可选，方便复用)
  const contactInfo = {
    phone: "400-699-2659",
    email: "service@raydiene.cn",
    address: "上海市自由贸易试验区临港新片区环湖西二路888号C楼",
  };

  return {
    menuItems,
    socialLinks,
    contactInfo,
  };
};
