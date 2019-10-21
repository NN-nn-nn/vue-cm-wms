// 接口返回码
const apiResultCode = {
  AUTHORITY: 401, // 权限认证失败
  API_VERSION: 50001 // 接口版本更新
}

const dictionaryType = {
  UNIT: 1,
  SUPPLIER: 2,
  EnterPrise: 0
}

const MATERIAL_BASE_TYPE = {
  steelPlate: { index: 0, name: '钢板', value: 'steelPlate', icon: 'steel-plate', unit: 'kg' },
  steel: { index: 1, name: '型钢', value: 'steel', icon: 'steel', unit: 'kg' },
  stripSteel: { index: 2, name: '彩卷/带钢', value: 'stripSteel', icon: 'strip-steel', unit: 'kg' },
  enclosure: { index: 3, name: '成品围护', value: 'enclosure', icon: 'enclosure', unit: 'm' },
  material: { index: 4, name: '一般物料', value: 'material', icon: 'material' }
}

const MATERIAL_BASE_NUM = {
  0: { index: 0, name: '钢板', value: 'steelPlate', icon: 'steel-plate', unit: 'kg' },
  1: { index: 1, name: '型钢', value: 'steel', icon: 'steel', unit: 'kg' },
  2: { index: 2, name: '彩卷/带钢', value: 'stripSteel', icon: 'strip-steel', unit: 'kg' },
  3: { index: 3, name: '成品围护', value: 'enclosure', icon: 'enclosure', unit: 'm' },
  4: { index: 4, name: '一般物料', value: 'material', icon: 'material' }
}

// 物料密度
const MATERIAL_DENSITY = {
  STEEL: 7.85,
  STAINLESS_STEEL: 7.93
}

// 入库状态验证
const INBOUND_VERIFY_STATUS = {
  0: '未审核',
  1: '已通过',
  2: '已退回'
}

const INBOUND_VERIFY = {
  unfinished: 0,
  success: 1,
  return: 2
}

// 日期选择配置
const DATE_PICKER_OPTION = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}

export { apiResultCode, dictionaryType, MATERIAL_BASE_TYPE, MATERIAL_BASE_NUM, MATERIAL_DENSITY, INBOUND_VERIFY_STATUS, INBOUND_VERIFY, DATE_PICKER_OPTION }
