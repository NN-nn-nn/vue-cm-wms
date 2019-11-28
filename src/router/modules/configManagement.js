/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'
import { wasteDefinition, configPriceControl } from '@/utils/permission'

const configManagementRouter = {
  path: '/config-management',
  component: Layout,
  name: 'ConfigManagement',
  redirect: '/config-management/residual-material',
  meta: {
    title: '配置管理',
    icon: 'config',
    roles: [wasteDefinition.v, configPriceControl.v]
  },
  children: [
    {
      path: '/config-management/residual-material',
      component: () => import('@/views/config-management/residual-material'),
      //   redirect: '/config-management/residual-material',
      name: 'ConfigResidualMaterial',
      meta: { title: '废料定义', roles: [wasteDefinition.v] }
    },
    {
      path: '/config-management/price-control',
      component: () => import('@/views/config-management/price-control'),
      name: 'ConfigPriceControl',
      meta: { title: '价格控制', roles: [configPriceControl.v] }
    }
  ]
}

export default configManagementRouter
