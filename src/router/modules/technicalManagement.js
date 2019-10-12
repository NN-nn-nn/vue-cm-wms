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
          path: '/technical-management/quota-management/list',
          component: () => import('@/views/technical-management/quota-management/list'),
          name: 'TechQuotaManagementList',
          hidden: true,
          meta: { title: '项目列表', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/create',
          component: () => import('@/views/technical-management/quota-management/development'),
          name: 'TechQuotaManagementDevelopment',
          hidden: true,
          meta: { title: '定额制定', roles: ['admin'] }
        },
        {
          path: '/technical-management/quota-management/edit',
          component: () => import('@/views/technical-management/quota-management/tracking'),
          name: 'TechQuotaManagementTracking',
          hidden: true,
          meta: { title: '定额跟踪', roles: ['admin'] }
        }
      ]
    }
  ]
}

export default technicalManagementRouter
