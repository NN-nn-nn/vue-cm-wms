/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const purchasingManagementRouter = {
  path: '/purchasing-management',
  component: Layout,
  name: 'PurchasingManagement',
  redirect: '/purchasing-management/material-handling',
  meta: {
    title: '采购管理',
    icon: 'purchasing',
    roles: ['admin']
  },
  children: [
    {
      path: '/purchasing-management/material-handling',
      component: () => import('@/views/purchasing-management/material-handling/in-warehouse-handing'),
      redirect: '/purchasing-management/material-handling/in-warehouse-handing',
      name: 'MaterialHandling',
      meta: { title: '物料办理', roles: ['admin'] },
      children: [
        {
          path: '/purchasing-management/material-handling/in-warehouse-handing',
          component: () => import('@/views/purchasing-management/material-handling/in-warehouse-handing'),
          name: 'MatInWarehouseHanding',
          meta: { title: '入库办理', roles: ['admin'] }
        },
        {
          path: '/purchasing-management/material-handling/in-warehouse-record',
          component: () => import('@/views/purchasing-management/material-handling/in-warehouse-record'),
          name: 'MatInWarehouseRecord',
          meta: { title: '入库记录', roles: ['admin'] }
        },
        {
          path: '/purchasing-management/material-handling/quit-warehouse-handing',
          component: () => import('@/views/purchasing-management/material-handling/quit-warehouse-handing'),
          name: 'MatQuitWarehouseHanding',
          meta: { title: '退库办理', roles: ['admin'] }
        },
        {
          path: '/purchasing-management/material-handling/quit-warehouse-record',
          component: () => import('@/views/purchasing-management/material-handling/quit-warehouse-record'),
          name: 'MatQuitWarehouseRecord',
          meta: { title: '退库记录', roles: ['admin'] }
        },
        {
          path: '/purchasing-management/material-handling/quota-tracking',
          component: () => import('@/views/purchasing-management/material-handling/quota-tracking'),
          name: 'MatQuotaTracking',
          meta: { title: '定额跟踪', roles: ['admin'] }
        }
      ]
    },
    {
      path: '/purchasing-management/supplier-management',
      component: () => import('@/views/purchasing-management/supplier-management/list'),
      redirect: '/purchasing-management/supplier-management/list',
      name: 'SupplierManagementList',
      meta: { title: '供应商管理', roles: ['admin'] },
      children: [
        {
          path: '/purchasing-management/supplier-management/list',
          component: () => import('@/views/purchasing-management/supplier-management/list'),
          name: 'SupplierManagementList',
          hidden: true,
          meta: { title: '供应商列表', roles: ['admin'] }
        },
        {
          path: '/purchasing-management/supplier-management/create',
          component: () => import('@/views/purchasing-management/supplier-management/create'),
          name: 'SupplierManagementCreate',
          hidden: true,
          meta: { title: '添加供应商', roles: ['admin'] }
        },
        {
          path: '/purchasing-management/supplier-management/edit',
          component: () => import('@/views/purchasing-management/supplier-management/edit'),
          name: 'SupplierManagementEdit',
          hidden: true,
          meta: { title: '编辑供应商', roles: ['admin'] }
        }
      ]
    }
  ]
}

export default purchasingManagementRouter
