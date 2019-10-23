/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const reportManagementRouter = {
  path: '/report-management',
  component: Layout,
  redirect: '/report-management',
  children: [
    {
      path: '/report-management/residual-material',
      component: () => import('@/views/report-management/'),
      //   redirect: '/report-management/residual-material',
      name: 'ReportManagement',
      meta: { title: '统计报表', icon: 'chart', roles: ['admin'] }
    },
    {
      path: '/report-management/residual-material/stock-status/component/inventory',
      component: () => import('@/views/report-management/stock-status/component/inventory'),
      name: 'ReportManagementInventory',
      hidden: true,
      meta: { title: '库存动态', icon: 'chart', roles: ['admin'] }
    },
    {
      path: '/report-management/residual-material/stock-status/component/purchase',
      component: () => import('@/views/report-management/stock-status/component/purchase'),
      name: 'ReportManagementPurchase',
      hidden: true,
      meta: { title: '采购入库分析', icon: 'chart', roles: ['admin'] }
    },
    {
      path: '/report-management/residual-material/stock-status/component/materials',
      component: () => import('@/views/report-management/stock-status/component/materials'),
      name: 'ReportManagementMaterials',
      hidden: true,
      meta: { title: '物料使用分析', icon: 'chart', roles: ['admin'] }
    },
    {
      path: '/report-management/residual-material/stock-status/component/project',
      component: () => import('@/views/report-management/stock-status/component/project-cost'),
      name: 'ReportManagementProject',
      hidden: true,
      meta: { title: '项目成本分析', icon: 'chart', roles: ['admin'] }
    },
    {
      path: '/report-management/residual-material/stock-status/component/product',
      component: () => import('@/views/report-management/stock-status/component/product-cost'),
      name: 'ReportManagementProduct',
      hidden: true,
      meta: { title: '生产成本分析', icon: 'chart', roles: ['admin'] }
    },
    {
      path: '/report-management/residual-material/stock-status/component/utility',
      component: () => import('@/views/report-management/stock-status/component/utility-fee'),
      name: 'ReportManagementUtility',
      hidden: true,
      meta: { title: '水电费填报', icon: 'chart', roles: ['admin'] }
    }
  ]
}

export default reportManagementRouter
