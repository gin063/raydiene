// composables/useBreadcrumbs.ts
// 根据当前路由自动生成面包屑导航数据

const ROUTE_NAME_MAP: Record<string, string> = {
  '/': '首页',
  '/about': '关于我们',
  '/about/intro': '企业简介',
  '/about/culture': '企业文化',
  '/products': '产品介绍',
  '/products/jianshi': '坚石系列',
  '/products/panshi': '磐石系列',
  '/products/xingchen': '星辰系列',
  '/products/xingyao': '星耀系列',
  '/products/purchase': '选购指南',
  '/service': '产品服务',
  '/service/install': '安装服务',
  '/service/aftersales': '售后服务',
  '/download': '下载中心',
  '/download/apps': 'App下载',
  '/download/manual': '用户手册',
  '/contact': '联系我们',
  '/contact/info': '联系方式',
  '/contact/official': '官方渠道',
  '/faq': '常见问题',
}

export interface BreadcrumbItem {
  name: string
  url: string
  isLast: boolean
}

export const useBreadcrumbs = () => {
  const route = useRoute()

  const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const segments = route.path.replace(/\/$/, '').split('/').filter(Boolean)

    const items: BreadcrumbItem[] = [
      { name: '首页', url: 'https://www.raydiene.cn/', isLast: false },
    ]

    let cumPath = ''
    segments.forEach((seg, index) => {
      cumPath += `/${seg}`
      const name = ROUTE_NAME_MAP[cumPath] ?? seg
      const isLast = index === segments.length - 1
      items.push({
        name,
        url: `https://www.raydiene.cn${cumPath}`,
        isLast,
      })
    })

    if (items.length > 1) {
      items[items.length - 1].isLast = true
    }

    return items
  })

  // 首页不显示面包屑
  const showBreadcrumbs = computed(() => route.path !== '/')

  return { breadcrumbs, showBreadcrumbs }
}
