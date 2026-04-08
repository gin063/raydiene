// composables/useJsonLd.ts
// JSON-LD 结构化数据注入工具 — 供各页面调用以实现 GEO 优化

import type { MaybeRefOrGetter } from "vue";
import { toValue } from "vue";

// 全局实体 ID — 供 schema 之间通过 @id 互相引用，构建实体图谱
const ORG_ID = "https://www.raydiene.cn/#organization";
const SITE_ID = "https://www.raydiene.cn/#website";

/**
 * 全局组织 + 网站 Schema（在 app.vue 调用一次即可）
 * 解决"雷迪恩官网"搜索不到的问题：WebSite Schema 明确声明域名与品牌名的关联
 */
export const useOrganizationSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "雷迪恩 RAYDIENE",
    alternateName: ["雷迪恩", "Raydiene"],
    url: "https://www.raydiene.cn/",
    logo: "https://assets.raydiene.cn/images/logo-square.png",
    image: "https://assets.raydiene.cn/images/og-share.png",
    slogan: "专注家庭用户，更专业，更放心",
    foundingDate: "2023",
    address: {
      "@type": "PostalAddress",
      addressLocality: "上海市",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "400-699-2659",
      email: "service@raydiene.cn",
      contactType: "customer service",
      availableLanguage: "Chinese",
      hoursAvailable: "Mo-Su 09:00-24:00",
    },
    sameAs: [
      "https://mall.jd.com/index-13360593.html",
      "https://leidienqcyp.tmall.com/",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: "雷迪恩RAYDIENE官方网站",
    alternateName: "雷迪恩官网",
    url: "https://www.raydiene.cn/",
    inLanguage: "zh-CN",
    publisher: { "@id": ORG_ID },
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(organizationSchema),
        key: "schema-organization",
      },
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(webSiteSchema),
        key: "schema-website",
      },
    ],
  });
};

/**
 * 产品 Schema — 在各产品页调用
 * data 参数结构：
 * {
 *   name: string,          // 产品名称
 *   description: string,   // 产品描述
 *   price: number,         // 价格（人民币）
 *   url: string,           // 产品页 URL（相对路径）
 *   image: string,         // 产品图片 URL
 *   sku?: string,          // 产品型号
 *   warranty?: string,     // 质保描述（可选）
 *   brand?: string,        // 品牌（默认雷迪恩）
 *   hasCertification?: boolean,  // 是否有3C认证（默认不写入）
 * }
 */
type ProductSchemaInput = {
  name: string;
  description: string;
  price: number;
  url: string;
  image: string;
  sku?: string;
  warranty?: string;
  brand?: string;
  hasCertification?: boolean;
};

export const useProductSchema = (
  source: MaybeRefOrGetter<ProductSchemaInput>,
) => {
  const buildSchema = () => {
    const data = toValue(source);
    const offer: Record<string, unknown> = {
      "@type": "Offer",
      priceCurrency: "CNY",
      price: data.price,
      availability: "https://schema.org/InStock",
      url: `https://www.raydiene.cn${data.url}`,
      seller: { "@id": ORG_ID },
    };

    if (data.warranty) {
      offer.warranty = {
        "@type": "WarrantyPromise",
        durationOfWarranty: data.warranty,
      };
    }

    const schema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: data.name,
      description: data.description,
      image: data.image.startsWith("http")
        ? data.image
        : `https://assets.raydiene.cn${data.image}`,
      brand: { "@id": ORG_ID },
      offers: offer,
    };

    if (data.sku) schema.sku = data.sku;
    if (data.hasCertification) {
      schema.hasCertification = {
        "@type": "Certification",
        name: "中国强制性产品认证（3C认证）",
        certificationIdentification: "CCC",
        issuedBy: {
          "@type": "Organization",
          name: "国家认证认可监督管理委员会",
        },
      };
    }

    return JSON.stringify(schema);
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: () => buildSchema(),
        key: "schema-product",
      },
    ],
  });
};

/**
 * FAQ 页面 Schema — 在 pages/faq.vue 调用
 * items: { question: string, answer: string }[]
 */
export const useFaqPageSchema = (
  items: { question: string; answer: string }[],
) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(schema),
        key: "schema-faq",
      },
    ],
  });
};

/**
 * 面包屑导航 Schema — 在 BreadcrumbBar 组件中调用
 * items: { name: string, url: string }[]
 * url 为完整绝对路径
 */
export const useBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(schema),
        key: "schema-breadcrumb",
      },
    ],
  });
};

/**
 * HowTo Schema — 在安装服务页调用
 * steps: { name: string, text: string, image?: string }[]
 */
export const useHowToSchema = (
  steps: { name: string; text: string; image?: string }[],
) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "家用充电桩专业安装流程 | 雷迪恩",
    description:
      "雷迪恩提供端到端专业安装服务，包含现场勘测、方案制定、设备安装、调试验收全流程，1天完工。",
    totalTime: "PT8H",
    tool: [
      { "@type": "HowToTool", name: "专业安装工具套装" },
      { "@type": "HowToTool", name: "雷迪恩充电桩设备" },
    ],
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image ? { image: step.image } : {}),
    })),
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(schema),
        key: "schema-howto",
      },
    ],
  });
};
