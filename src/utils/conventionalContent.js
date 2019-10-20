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
  STEEL_PLATE: { index: 0, name: '钢板', value: 'steelPlate', icon: 'steel-plate' },
  STEEL: { index: 1, name: '型钢', value: 'steel', icon: 'steel' },
  STRIP_STEEL: { index: 2, name: '彩卷/带钢', value: 'stripSteel', icon: 'strip-steel' },
  ENCLOSURE: { index: 3, name: '成品围护', value: 'enclosure', icon: 'enclosure' },
  MATERIAL: { index: 4, name: '一般物料', value: 'material', icon: 'material' }
}

// 物料密度
const MATERIAL_DENSITY = {
  STEEL: 7.85,
  STAINLESS_STEEL: 7.93
}

export { apiResultCode, dictionaryType, MATERIAL_BASE_TYPE, MATERIAL_DENSITY }
