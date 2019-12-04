/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'
import { financialManagement } from '@/utils/permission'

const financialManagementRouter = {
  path: '/financial-management',
  component: Layout,
  name: 'FinancialManagement',
  redirect: '/financial-management/report-detail',
  meta: {
    title: '财务管理',
    icon: 'finance',
    roles: [financialManagement.v, financialManagement.v]
  },
  children: [
    {
      path: '/financial-management/report-detail',
      component: () => import('@/views/financial-management/report-detail'),
      //   redirect: '/financial-management/report-detail',
      name: 'FinancialReportDetail',
      meta: { title: '财务报表', roles: [financialManagement.v] }
    },
    {
      path: '/financial-management/outbound-return-verify',
      component: () => import('@/views/financial-management/outbound-return-verify'),
      name: 'FinancialOutboundReturnVerify',
      meta: { title: '退料审核', roles: [financialManagement.v] }
    }
  ]
}

export default financialManagementRouter
