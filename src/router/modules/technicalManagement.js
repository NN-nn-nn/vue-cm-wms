/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const technicalManagementRouter = {
  path: '/technical-management',
  component: Layout,
  name: 'TechnicalManagement',
  redirect: '/technical-management/quota-management',
  meta: {
    title: '技术管理',
    icon: 'technical',
    roles: ['admin']
  },
  children: [
    {
      path: '/technical-management/quota-management',
      component: () => import('@/views/technical-management/quota-management'),
      redirect: '/technical-management/quota-management/list',
      name: 'TechQuotaManagement',
      meta: { title: '定额管理', roles: ['admin'] },
      children: [
        {
          path: '/technical-management/quota-management/formulate',
          component: () => import('@/views/technical-management/quota-management/formulate/index'),
          name: 'TechQuotaFormulate',
          meta: { title: '定额制定', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/formulate/component/generalMaterial',
          component: () => import('@/views/technical-management/quota-management/formulate/component/generalMaterial'),
          name: 'TechQuotaFormuGeneral',
          hidden: true,
          meta: { title: '一般物料定额', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/formulate/component/steelPlate',
          component: () => import('@/views/technical-management/quota-management/formulate/component/steelPlate'),
          name: 'TechQuotaFormuSteelPlate',
          hidden: true,
          meta: { title: '钢板定额', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/formulate/component/steel',
          component: () => import('@/views/technical-management/quota-management/formulate/component/steel'),
          name: 'TechQuotaFormuSteel',
          hidden: true,
          meta: { title: '型钢定额', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/formulate/component/colorStrip',
          component: () => import('@/views/technical-management/quota-management/formulate/component/colorStrip'),
          name: 'TechQuotaFormuColorStrip',
          hidden: true,
          meta: { title: '彩卷/带钢定额', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/formulate/component/finishedProduct',
          component: () => import('@/views/technical-management/quota-management/formulate/component/finishedProduct'),
          name: 'TechQuotaFormuFinishedProduct',
          hidden: true,
          meta: { title: '成品围护定额', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/tracking',
          component: () => import('@/views/technical-management/quota-management/tracking/index'),
          name: 'TechQuotaTracking',
          meta: { title: '定额跟踪', roles: ['admin'] }
        },

        {
          path: '/technical-management/quota-management/tracking/component/generalMaterial',
          component: () => import('@/views/technical-management/quota-management/formulate/component/generalMaterial'),
          name: 'TechQuotaTrackGeneral',
          hidden: true,
          meta: { title: '一般物料定额跟踪', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/tracking/component/steelPlate',
          component: () => import('@/views/technical-management/quota-management/tracking/component/steelPlate'),
          name: 'TechQuotaTrackSteelPlate',
          hidden: true,
          meta: { title: '钢板定额跟踪', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/tracking/component/steel',
          component: () => import('@/views/technical-management/quota-management/tracking/component/steel'),
          name: 'TechQuotaTrackSteel',
          hidden: true,
          meta: { title: '型钢定额跟踪', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/tracking/component/colorStrip',
          component: () => import('@/views/technical-management/quota-management/tracking/component/colorStrip'),
          name: 'TechQuotaTrackColorStrip',
          hidden: true,
          meta: { title: '彩卷/带钢定额跟踪', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/tracking/component/finishedProduct',
          component: () => import('@/views/technical-management/quota-management/tracking/component/finishedProduct'),
          name: 'TechQuotaTrackFinishedProduct',
          hidden: true,
          meta: { title: '成品围护定额跟踪', roles: ['admin'] }
        }
      ]
    }
  ]
}

export default technicalManagementRouter
